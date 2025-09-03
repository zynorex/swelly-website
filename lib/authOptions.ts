import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify email guilds" } },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        (token as any).accessToken = account.access_token;
        (token as any).tokenType = account.token_type;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = { ...session.user, id: token.sub } as typeof session.user & { id?: string };
      }
      (session as any).accessToken = (token as any).accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
