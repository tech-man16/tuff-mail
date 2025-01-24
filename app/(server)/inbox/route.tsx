// import path from "path";
import { connect, disconnect } from "@/app/db/connection";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: any) {
    try {

        const { slug } = await req.json();

        const db = await connect();
        const collection1 = db.collection('mailInfo');
        const coll = db.collection("user");
        const { uname, fname, mname, lname } = await coll.findOne({ slug: slug });
        // await collection1.deleteMany({ trash: ["remove", "remove"] });
        const from = uname;
        const data = await collection1.aggregate([
            { $match: { $or: [{ from: from }, { to: from }] } },
            {
                $lookup: {
                    from: "msgInfo",
                    localField: "msgId",
                    foreignField: "_id",
                    as: "msginfos"
                }
            },
            { $unwind: "$msginfos" },
            {
                $addFields: {
                    msg: { $substr: ["$msginfos.msg", 0, 10] }
                }
            },
            {
                $project: { "msginfos": 0 }
            }
        ]).toArray();

        await disconnect();

        return NextResponse.json({ msg: "Get mail Successfull !!", status: 200, data: data, fname: fname + " " + mname + " " + lname, uname:uname }, { status: 200 });
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({ msg: "Internal server error", status: 505, error: e }, { status: 505 });
    }
}