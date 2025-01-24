// import path from "path";
import { connect, disconnect } from "@/app/db/connection";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: any) {
    try {
        console.log("processing...");
        const { msg, from, to, sub, draft } = await req.json();

        const db = await connect();
        const collection = db.collection('msgInfo');
        const result = await collection.insertOne({ msg: msg });
        const msg_id = result.insertedId;

        const collection2 = db.collection('mailInfo');

        const date = new Date();
        const options: any = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
            timeZone: 'Asia/Kolkata',
        };
        const data = {
            msgId: msg_id,
            sub: sub,
            from: from || "kiatech152@tuff.com",
            to: to,
            trash: [false, false],
            starred: [false, false],
            draft: draft,
            date:new Intl.DateTimeFormat('en-IN', options).format(date)
        }
        await collection2.insertOne(data);
        await disconnect();

        return NextResponse.json({ msg: "Mail Sent Successfully !!", status: 200, mail_info: data }, { status: 200 });
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({ msg: "Internal server error", status: 505, error: e }, { status: 505 });
    }
}