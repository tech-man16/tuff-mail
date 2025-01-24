// import path from "path";
import { connect, disconnect } from "@/app/db/connection";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: any, res: any) {
    return NextResponse.json({ mesage: "GET successfull!!" });
}

export async function POST(req: NextRequest, res: any) {

    try {
        const { uname, pwd, fname, mname, lname } = await req.json();

        const db = await connect();
        const collection = db.collection('user');
        const data = await collection.findOne({ uname: uname });

        if (data != null)
            return NextResponse.json({ msg: "Username already exists", status: 201 }, { status: 201 });

        const slug = Math.random().toString(36).slice(2);

        await collection.insertOne({
            slug: slug,
            uname: uname,
            pwd: pwd,
            fname: fname,
            mname: mname,
            lnmae: lname
        });

        await disconnect();

        return NextResponse.json({ msg: "Signup Successfull", status: 200 }, { status: 200 });
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({ message: "Internal server error", status: 505, error: e }, { status: 505 });
    }

}