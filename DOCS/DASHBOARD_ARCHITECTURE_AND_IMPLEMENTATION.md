# Swelly Dashboard — Architecture & Implementation Guide

Status: Draft — enterprise-grade guide for building the management dashboard that controls the Swelly Discord bots. This document assumes the bot codebase (Bot Service) and the website codebase (Web App) live in separate repositories/codespaces and describes how to construct an integrated, secure, reliable dashboard.

---

Table of Contents
- Purpose & goals
- High-level architecture
- Data model and APIs
- Authentication & authorization
- Integration patterns (bot ↔ dashboard)
- Deployments, CI/CD & infrastructure
- Scalability & performance
- Reliability & resiliency (edge cases)
- Security & compliance
- Observability & monitoring
- Migration & deployment strategies
- Testing & QA
- Operational runbook
- Example folder layout & minimal commands

---

Purpose & goals
- Provide an administrative dashboard for server owners and operators to configure bots, view analytics, manage subscriptions, and access support.
- Enterprise goals: security, auditability, multi-tenant isolation, high availability, rate-limiting, and clear operational runbooks.
- Support separation of concerns: bots handle real-time Discord interactions; dashboard handles configuration, billing, analytics, and feature flags.

High-level architecture
- Components:
  - Dashboard Web App (Next.js/React) — served from a secure CDN (Vercel, Netlify, or custom infra on Cloud).
  - Dashboard API (REST/GraphQL) — backend-for-frontend (BFF) that mediates between UI and microservices.
  - Bot Service(s) — separate repository; these run the Discord clients and subscribe to configuration via API or message bus.
  - Data stores: Primary DB (Postgres), Cache (Redis), Search (optional Elastic/Opensearch), Blob store (S3), Analytics store (Timescale, ClickHouse, or BigQuery).
  - Message Bus / Queue (Kafka, RabbitMQ or AWS SQS + SNS) — for eventing and decoupled updates.
  - Identity Provider (OIDC/SAML) — for SSO for enterprise customers and admin users.
  - Payment Provider (Stripe/Chargebee) — for subscriptions.
  - Observability: Prometheus/Grafana, Sentry, and centralized logs (ELK/Datadog).

- Deployment topologies (options):
  - Option A (managed): Dashboard front-end on Vercel; API as serverless functions; Postgres managed DB; bots on Kubernetes; Redis managed.
  - Option B (self-hosted): Infra in a VPC with EKS/ECS, ALB ingress, autoscaling groups, and managed services.

Data model and APIs
- Principal entities (core): `User`, `Organization` (GuildOwner), `Guild` (Discord server), `Bot`, `BotConfig`, `Subscription`, `AuditLog`, `PermissionGrant`, `CommandLog`, `Webhook`, `FeatureFlag`.

- Example simplified Postgres schema (abstract):
  - users (id, email, name, role, created_at, updated_at)
  - organizations (id, name, owner_user_id, created_at)
  - guilds (id, discord_id, org_id, name, region, config_id, joined_at)
  - bots (id, name, client_id, public_key, created_at)
  - bot_configs (id, guild_id, bot_id, settings_json, version, updated_at)
  - subscriptions (id, org_id, tier, status, stripe_subscription_id, next_billing)
  - audit_logs (id, actor_id, action, target, changes_json, ip, user_agent, created_at)

- API Patterns
  - Use BFF pattern: the dashboard calls a BFF which aggregates microservices and protects secrets.
  - Use REST or GraphQL (GraphQL + persisted queries recommended to reduce overfetching).
  - All APIs must support:
    - Pagination (cursor-based)
    - Filtering & sorting
    - Idempotency keys for update operations
    - ETag / If-None-Match for caching

- Contracts for bot-sync: BotConfig should include a `version` and `signature` used to verify payloads.

Authentication & authorization
- Authn: Use OIDC (Auth0, Azure AD, or self-hosted Keycloak). Support:
  - Social login for end-users (Discord OAuth2) — used for guild linking and identifying server admins.
  - SSO for enterprise customers (SAML/SCIM support for provisioning users).
- Authz model:
  - RBAC + attribute-based checks: roles (owner, admin, editor, viewer), plus per-guild permission checks.
  - Fine-grained permission grants (e.g., `manage_queue`, `configure_eq`, `webhook_manage`).
- Secure token handling:
  - Use short-lived access tokens (JWT) with refresh tokens.
  - Store refresh tokens encrypted and rotate on compromise.
- Admin panel: limit to internal SSO or admin role with 2FA.

Integration patterns (bot ↔ dashboard)
- Two integration styles:
  1. Polling/Sync API: Bots periodically poll the Dashboard API for config changes (simple, robust when message bus not available).
  2. Push/Event-based: Dashboard publishes events to a message bus; bots consume and apply changes.

- Recommended: Event-driven with message bus + reconciliation. Publish events for `bot_config.updated`, `bot_config.deleted`, `feature_flag.toggled`, `subscription.updated`.

- Trust and verification:
  - All messages should be signed (HMAC) or carried over mTLS/secure VPN.
  - Bots should validate `version` and `signature`; if mismatch, request full object via API.

- Webhooks for external integrations: validate and sign payloads, rate-limit delivery, exponential backoff.

- Example flow for a config update:
  1. Admin updates config in dashboard UI -> BFF validates -> writes to primary DB & audit log.
  2. BFF publishes `bot_config.updated` with minimal payload + version + signature to message bus.
  3. Bots subscribe, receive event, fetch full config if needed, validate signature, apply changes atomically.
  4. Bot acknowledges; BFF marks delivery status. If no ack, BFF retries with backoff and notifies admins on persistent failure.

Security & compliance
- Network:
  - Use private subnets and no public DB endpoints.
  - Use IP allowlists (e.g., for webhooks and admin access).
- Secrets management:
  - Use a secrets manager (AWS Secrets Manager, HashiCorp Vault). Never store secrets in repo.
  - Implement key rotation policy for API keys, webhooks, and integrations.
- Data protection & privacy:
  - Encrypt sensitive PII at rest and in transit (TLS 1.2+/TLS 1.3).
  - Implement data residency and retention policies (GDPR, CCPA): include delete/erase processes and data export endpoints.
- Rate limiting & abuse prevention:
  - Global API throttles + per-resource limits.
  - Circuit breaker patterns for downstream dependency failures.
- Penetration testing and third-party audits annually.

Scalability & performance
- Caching:
  - Use Redis for hot config cache and leaderboards.
  - Use CDN for static assets and edge caching for SSR pages.
- DB scaling:
  - Vertical up to a point, then read-replicas and partitioning. Use connection pooling (PgBouncer).
- Bots scaling:
  - Run bot workers across multiple hosts; partition guilds by shard ID.
  - Use the Discord recommended sharding strategy.
- Message bus:
  - Use partitioned topics to scale consumers; ensure ordering where necessary.
- Performance testing:
  - Load test the BFF with representative API patterns (k6, Artillery). Measure p95/p99 latency.

Reliability & resiliency (edge cases)
- Event delivery failures:
  - Guarantee at-least-once delivery; make processing idempotent using `idempotencyKey` and `version` fields.
- Partial failures:
  - Use transactional outbox: write DB update + outbox message in same DB transaction, then a background worker publishes outbox messages.
- Bot offline/lagging:
  - Bots should apply last-known-good config and poll a `config/since=<version>` endpoint on startup.
  - If a bot is unreachable during deploy, alert and provide a retry mechanism.
- DB failure:
  - Have automated failover for primary DB; application must handle read-only mode gracefully.
- Data corruption:
  - Keep immutable audit logs and periodically snapshot important configs. Implement point-in-time recovery (PITR).
- Race conditions & concurrency:
  - Use optimistic concurrency (version numbers); validate before apply.
- Billing edge cases:
  - Handle delayed invoice payments by setting feature flags to limited mode; provide a grace period and retry schedule.
- Security incidents:
  - Predefined rotation steps for compromised keys; revoke sessions and tokens; enforced password reset and MFA.

Observability & monitoring
- Logs:
  - Structured JSON logs with correlating trace IDs. Centralize logs (ELK/Datadog).
- Tracing:
  - Use open telemetry (OTel) across services and bots to trace requests end-to-end.
- Metrics:
  - Track request rates, latencies, error rates, delivery success, average processing time, queue length.
- Alerts:
  - Define SLOs and SLIs. Alert on SLO breaches (error budget burn), delivery failure spikes, queue backlog, and DB replication lag.
- Dashboards:
  - Grafana dashboards for system health, bot counts, subscriptions, and revenue metrics.
- Incident response:
  - PagerDuty/opsgenie for critical alerts. Runbooks for common incidents (DB failover, key compromise, message bus outage).

Migration & deployment strategies
- Blue/Green or Canary for web & API services.
- Use feature flags to rollout risky features gradually.
- Database migrations:
  - Versioned migrations (Flyway/Prisma/Migrations). Use non-destructive deploys where possible. For destructive changes, prefer backward-compatible steps.

Testing & QA
- Unit tests (Jest, Vitest).
- Integration tests (run locally with test containers for Postgres/Redis).
- Contract tests between the dashboard API and bots (Pact or schema validator).
- E2E tests for critical flows (invite flow, subscription change, config update) with Playwright/Cypress.
- Security tests: dependency scanning, SCA, SAST, and DAST.

Operational runbook (short)
- On degraded disk/DB:
  1. Promote read-replica if primary is unhealthy.
  2. Scale down write load; enable maintenance mode.
- On message bus backlog:
  1. Scale consumers horizontally.
  2. If consumers fail, check poison messages, move to dead-letter queue, and alert devs.
- On token/key compromise:
  1. Immediately revoke compromised keys in secrets manager.
  2. Rotate keys and notify affected integrations.
- On deployment failure:
  1. Rollback to previous release using CI/CD.
  2. Run smoke tests and validate key flows.

Example folder layout (dashboard repo)
```
/dashboard
  /src
    /pages (Next.js)
    /components
    /lib
      api.ts (BFF callers)
      auth.ts (OIDC helpers)
    /services
      analytics.ts
      billing.ts
    /hooks
    /styles
  /scripts
  /tests
  next.config.js
  package.json
  Dockerfile
  README.md
```

Example folder layout (bot repo)
```
/bot-service
  /src
    /shards
    /workers
    /commands
    /events
    /integrations
    /lib
      config-sync.ts
      auth.ts (mTLS/HMAC helper)
  /scripts
  Dockerfile
  package.json
  README.md
```

Minimal local dev commands

Dashboard (Next.js):
```bash
# set .env.local from env.example
pnpm install
pnpm dev
```

Bot service:
```bash
# set .env from env.example
pnpm install
pnpm start:dev
```

CI/CD examples (high level)
- Build and test: run unit tests, lint, then run contract tests.
- Publish images to registry (with semantic tagging, e.g., `app:v1.2.3`).
- Deploy to staging via GitHub Actions; run smoke tests; then promote to production.

Edge-case checklist (exhaustive highlights)
- Config drift between dashboard and bot: implement periodic reconciliation and integrity checks.
- Message duplication: make handlers idempotent using idempotency keys.
- Persistent failure to apply config: record in DB, alert, escalate to ops after N retries.
- Partial rollout inconsistency: use feature flags and incremental rollout.
- Billing disputes: keep audit logs and transaction metadata; support manual overrides.
- Large guild migrations: run in background jobs, monitor rate limits (Discord), and schedule during low-traffic windows.
- Discord rate limits: implement token bucket per-shard and global exponential backoff on 429s; include retry-after header respect.
- Stale caches after config change: publish invalidation events and use short TTLs for critical configs.
- DB migration failure mid-run: pause deployment, rollback schema if possible, and restore from snapshot.

Enterprise checklist (must-have items)
- Single Sign-On + SCIM provisioning for enterprise orgs.
- Audit logs immutable storage (WORM if required).
- Data residency support and data export tools.
- SLA agreement and runbook for failover.
- Pen-testing & compliance audit reports.
- Contract tests and CI gates for changes affecting bots.

Appendix: Specific implementation suggestions
- Use transactional outbox (Debezium + Kafka or manual outbox worker) to avoid lost events.
- Use OpenTelemetry and sample traces forwarded to vendor (Jaeger/Tempo/Datadog).
- Use Postgres + Timescale extension for timeseries analytics for response times and usage metrics.
- For near-realtime dashboards, use Redis streams or WebSocket gateway (with auth via JWT).
- Use Stripe webhooks with signature verification and secure endpoints behind auth.

---

If you'd like, I can:
- Generate a versioned checklist file (`DOCS/DEPLOY_CHECKLIST.md`) and CI job examples (GitHub Actions YAML) next.
- Scaffold API contract schemas (OpenAPI/GraphQL SDL) for `bot_config` and `audit_log` so you can implement contract tests.

Would you like me to create the `DEPLOY_CHECKLIST.md` and a `/.github/workflows/ci.yaml` sample now? (I can scaffold them.)
