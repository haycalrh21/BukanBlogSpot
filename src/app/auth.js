//auth.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongo from "@/app/libs/mongodb";
import User from "@/app/model/user";
import jwt from "jsonwebtoken";
export const authOptions = {
	session: {
		strategy: "jwt",
		maxAge: 30 * 60, // 30 minutes
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if (user?._id) token._id = user._id;
			if (user?.name) token.name = user.name;
			if (user?.email) token.email = user.email;
			return token;
		},
		async session({ session, token }) {
			session.user = {
				_id: token._id,
				name: token.name,
				email: token.email,
			};
			return session;
		},
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				await connectMongo();
				const user = await User.findOne({ email: credentials.email });
				if (!user) throw new Error("User not found");
				const passwordMatch = await bcrypt.compare(
					credentials.password,
					user.password
				);
				if (!passwordMatch) throw new Error("Invalid email or password");
				return {
					_id: user._id,
					name: user.name,
					email: user.email,
				};
			},
		}),
	],
};

export default NextAuth(authOptions);
