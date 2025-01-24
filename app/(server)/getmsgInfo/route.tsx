// import path from "path";
import { connect, disconnect } from "@/app/db/connection";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: any) {
    try {

        const { msgId } = await req.json() ;

        const db = await connect();
        const collection1 = db.collection('mailInfo');
        const messageId = new ObjectId(msgId);
        
        const data = await collection1.aggregate([
            { $match: { msgId: messageId } },
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
                    msg: "$msginfos.msg"
                }
            },
            {
                $project: { "msginfos": 0 }
            }
        ]).toArray();

        await disconnect();

        let result= [];

        if (data.length)
            result = data;

        return NextResponse.json({ msg: "Get mail Successfull !!", status: 200, "data": result }, { status: 200 });
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({ msg: "Internal server error", status: 505, error: e }, { status: 505 });
    }
}