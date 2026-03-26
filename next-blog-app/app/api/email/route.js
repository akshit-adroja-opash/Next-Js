import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const formData = await request.formData();
        const email = formData.get('email');

        if (!email) {
            return NextResponse.json({ success: false, msg: "Email is required" }, { status: 400 });
        }

        const emailData = {
            email: `${email}`,
        }
        await EmailModel.create(emailData);
        return NextResponse.json({ success: true, msg: "Email Subscribed" });
    } catch (error) {
        console.error("Error subscribing email:", error);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectDB();
        const emails = await EmailModel.find({});
        return NextResponse.json({ success: true, emails });
    } catch (error) {
        console.error("Error fetching emails:", error);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }
}
export async function DELETE(request) {
    try {
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ success: false, msg: "Invalid or missing ID" }, { status: 400 });
        }
        await EmailModel.findByIdAndDelete(id);
        return NextResponse.json({ success: true, msg: "Email Deleted" });
    } catch (error) {
        console.error("Error deleting email:", error);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }
}