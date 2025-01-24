'use client';
import React, { useEffect, useState } from "react";
import SideBar from "@/app/components/sideBar";

import CreateMail from "@/app/components/sendMail";
import Inbox from "@/app/components/inbox";
import Navbar from "@/app/components/navbar";

import { counterContext } from "@/app/context/context";
import { getMail } from "@/app/server-actions/functions";
import Loading from "@/app/components/loading";

const Dashboard = ({ params }: any) => {

    const [keyVal, updatekeyVal]: any = useState({
        senderId: "kiatech152@tuff.com",
        s: "a-inbox",
        draftinfo: { draft: false },
        st: [],
        cnt: { in: 0, sent: 0, trash: 0, draft: 0, star: 0 },
        change: false,
        loading: false
    });

    useEffect(() => {

        if (keyVal.mails == undefined) {
            updatekeyVal((prev: any) => ({ ...prev, loading: true }))
            const param = { slug: params.mail };
            (async () => {
                const data = await getMail(param);
                const actual_data = data.data;
                console.log(data);
                updatekeyVal((prevVal: any) => (
                    {
                        ...prevVal,
                        mails: actual_data,
                        loading: false,
                        fname: data.fname
                    }));
            })();
        }
    }, []);

    useEffect(() => { // To update draft ui ; update not happened at backend database
        if (keyVal.draftinfo.draft) {
            updatekeyVal((prevVal: any) => ({ ...prevVal, mails: [...prevVal.mails, keyVal.draftinfo], draftinfo: { draft: false } }));
        }
    }, [keyVal.s]);

    if (keyVal.loading)
        return <div className="w-screen h-screen"> <Loading /> </div>

    return (
        <counterContext.Provider value={keyVal}>
            <div className="flex flex-col border-2 border-green-400 h-screen overflow-auto">
                <Navbar updateContext={updatekeyVal} />
                <main className="flex flex-1 border-4 border-red-500">
                    <div className="md:flex hidden border w-1/3 max-w-[300px]"> <SideBar updateState={updatekeyVal} /> </div>
                    <div className="flex flex-col flex-1 gap-10 border-4 border-pink-400 p-4 cursor-pointer">
                        {keyVal["s"] == "cmail" && <CreateMail updatedraft={updatekeyVal} />}
                        {keyVal["s"].startsWith("a") && <Inbox updateStar={updatekeyVal} type={keyVal["s"].split("-")[1]} />}
                    </div>
                </main>
            </div>
        </counterContext.Provider>
    )
}

export default Dashboard;