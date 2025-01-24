import { NextRequest, NextResponse } from "next/server"
import { connect, disconnect } from "@/app/db/connection";

const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { uname, pwd } = await req.json();
        const db = await connect();
        const collection = db.collection('user');
        const data = await collection.findOne({ uname: uname, pwd: pwd });

        await disconnect();

        if (data != null)
            return NextResponse.json({ msg: "Validation Successfull", status: 200, slug: data.slug }, { status: 200 });
        return NextResponse.json({ message: "Invalid Credentials", status: 500 }, { status: 500 });
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({ message: "Internal server error", status: 505, error: e }, { status: 505 });
    }
}

export { POST }