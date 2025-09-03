Discord Login (NextAuth) setup

This project uses NextAuth with the Discord provider. Follow these steps to enable "Login with Discord" locally and in production.

1) Create a Discord application
- Go to https://discord.com/developers/applications and create a new application.
- Under OAuth2 > Redirects, add the callback:
  - For local dev: http://localhost:3000/api/auth/callback/discord
  - For production: https://your-production-domain.com/api/auth/callback/discord
- Note the Client ID and Client Secret.

2) Environment variables
Create a `.env.local` in the project root with:

DISCORD_CLIENT_ID=your_client_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_SECRET=long_random_value_here
NEXTAUTH_URL=http://localhost:3000

- `NEXTAUTH_SECRET`: use a long random string (e.g. `openssl rand -hex 32`).
- `NEXTAUTH_URL`: must be the public URL for callbacks.

3) Scopes
The app requests the following scopes: `identify email guilds` (configured in `lib/authOptions.ts`). Adjust in `lib/authOptions.ts` if needed.

4) Session & token access
- Access tokens from Discord are stored on the session (see `lib/authOptions.ts` callbacks) as `session.accessToken` and can be used to make Discord API calls server-side.

5) Testing
- Start dev server: `npm run dev` and open http://localhost:3000.
- Click "Login with Discord" and accept the OAuth flow.

6) Production
- Ensure `NEXTAUTH_URL` matches your deployed URL and the redirect is added in Discord app settings.
- Use a secure `NEXTAUTH_SECRET` and store client secret in deployment secrets.

7) Troubleshooting
- If you see redirect_uri_mismatch, verify your redirect URI matches exactly including protocol and path.
- If cookies fail, ensure your domain and secure cookie settings are correct in production.

If you want, I can add an example `app/api/discord-profile/route.ts` that fetches the current user's Discord profile with the stored token, and a small server-side helper that exchanges tokens when needed.
