import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


connect();


export async function POST(request: NextRequest) {
    try {
        const { token, user } = await request.json()

        const userexist = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        })

        if (!userexist) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 })
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(user.password, salt)

        userexist.password = hashedPassword
        userexist.forgotPasswordToken = undefined;
        userexist.forgotPasswordTokenExpiry = undefined;
        await userexist.save();
        
        return NextResponse.json({
            message: "Password changed successfully",
            success: true
        })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}