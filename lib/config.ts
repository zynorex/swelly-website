export function baseUrl() {
  return process.env.NEXTAUTH_URL || "http://localhost:3000";
}
