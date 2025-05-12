// pages/api/auth/[...nextauth].ts or [...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Optional: Basic validation
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing credentials");
            return null;
          }

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          if (!res.ok) {
            console.error("Login failed with status:", res.status);
            return null;
          }

          const user = await res.json();

          if (user && user.token) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              token: user.token,
            };
          }

          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.token = token.token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
//we ndio ulicreate user, details uliweka gani?
//if I shut down the Xampp, process ya kucopy itaacha? 
//morning boss
//Ebu try saving something through postman sytaight to the hosted site? which one
//https://api.falconeyephilmz.com/api

//what was the question
//like c unaona ukiupload through postman it works just file. the movie you just uploaded is also visible in the hosted page, the only problem is with the login and register.
//I realised if you try to register an admin through postman, it also works even though t retuns an error but the admin is actually saved to the db
//ok, show me this
//its okay, then c you push that we link and test then atatumia hiyo kuhost hiyo movie anarelease?
// hii haina api intergration at now
//so meaning nafaa kuintergrate ama? eeh.
//c that gonna take sometime, ntamanage kweli by the time anarelease apana ndio maana nimesema later
//okay
//so for now tufanye aje? what is not working?
//eregistration na login

//admin signup should not be public. but I restricted admins to only 2. so if a thrd person tries to register ndio itakataa // that link should be removed from the website
//"Maximum number of admins reached". Then try loggin in and see, an error still occurs
//how can I view the hosted database/

//you can design to use that UI later on 
