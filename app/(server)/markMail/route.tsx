import { connect, disconnect } from "@/app/db/connection";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

// export async function POST(req: NextRequest, res: any) {
//     try {
//         const { msgId, type, value } = await req.json();

//         const db = await connect();
//         const collection1 = db.collection('mailInfo');
//         let query;
//         if (type == "inbox_starred") {
//             query = { "starred.1": !value }
//         }

//         else if (type == "sent_starred") {
//             query = { "starred.0": !value }
//         }

//         else if (type == "inbox_trash") {
//             query = { "trash.1": !value }
//         }
//         else {
//             query = { "trash.0": !value }
//         }

//         const data = await collection1.updateOne(
//             { msgId: msgId },
//             { $set: query }
//         );
//         await disconnect();

//         return NextResponse.json({ msg: "Update successfull !!", status: 200, data: data }, { status: 200 });
//     } catch (e: any) {
//         console.log(e)
//         return NextResponse.json({ msg: "Internal server error", status: 505, error: e }, { status: 505 });
//     }
// }

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { change } = await req.json();
        const db = await connect();
        const collection = db.collection("mailInfo");

        for (const elem of change) {
            const trash = elem.change.trash && Array.from(new Set(elem.change.trash));
            const bool = trash && trash.length == 1 && trash[0] == "remove";

            if (bool) {
                await collection.deleteOne({ trash: elem.change.trash });
                delete elem.change.trash;
            } else
                await collection.updateOne(
                    { msgId: new ObjectId(elem.msgId), from: elem.from },
                    {
                        $set: elem.change,
                        $currentDate: { lastUpdated: true }
                    }
                );
        }

        await disconnect();
        return NextResponse.json({ msg: "Updated Successfully !!", status: 200 }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ msg: "Internal Server Error", status: 500 }, { status: 500 });
    }

}