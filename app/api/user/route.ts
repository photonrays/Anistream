import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'
import * as z from 'zod'

const userSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    username: z.string().min(1, 'Username is required').max(20, 'Username must be less than 20 characters'),
    password: z.string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters')
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        // check if email already exists
        const emailExists = await db.user.findUnique({
            where: { email: email }
        })
        if (emailExists) {
            return NextResponse.json({
                user: null,
                message: "Email already exists"
            }, { status: 409 })
        }

        // check if username already exists
        const usenameExists = await db.user.findUnique({
            where: { username: username }
        })
        if (usenameExists) {
            return NextResponse.json({
                user: null,
                message: "Username already exists"
            }, { status: 409 })
        }
        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        })
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Something when wrong" }, { status: 500 })
    }
}