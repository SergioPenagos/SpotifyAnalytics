import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export const NextAuthOptions = {
  providers: [
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-private,user-top-read,user-read-recently-played,user-follow-read,user-follow-modify',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
  pages: {
    signIn: '/signIn',
    signOut: '/signOut',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(NextAuthOptions);

