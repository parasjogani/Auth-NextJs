import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (typeof user === "object") {
            return NextResponse.json({
                message: "User Found",
                data: user
            });
        } else {
            // Handle the case when user data is not an object (e.g., if it's a string)
            return NextResponse.json({ error: "Invalid user data" }, { status: 500 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 400 });
    }
}