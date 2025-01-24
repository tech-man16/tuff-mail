'use client';
import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";

import CreateMail from "../components/sendMail";
import Inbox from "../components/inbox";
import Navbar from "../components/navbar";

import { counterContext } from "@/app/context/context";
import { getMail } from "../server-actions/functions";

const Dashboard = ({ slug }: any) => {
    const [keyVal, updatekeyVal]: any = useState({
        senderId: "kiatech152@tuff.com",
        s: "a-inbox",
        draftinfo: { draft: false },
        st: [],
        cnt: { in: 0, sent: 0, trash: 0, draft: 0, star: 0 },
        change: false
    });
    let params = { from: "kiatech152@tuff.com" }
    useEffect(() => {
        if (keyVal.mails == undefined) {
            (async () => {
                const data = await getMail(params);
                const actual_data = data.data;
                console.log(actual_data);
                updatekeyVal((prevVal: any) => ({ ...prevVal, mails: actual_data }));
            })()
        }
    }, []);

    useEffect(() => { // To update draft ui ; update not happened at backend database
        if (keyVal.draftinfo.draft) {
            updatekeyVal((prevVal: any) => ({ ...prevVal, mails: [...prevVal.mails, keyVal.draftinfo], draftinfo: { draft: false } }));
        }
    }, [keyVal.s]);

    return (
        <counterContext.Provider value={keyVal}>
            <div className="flex flex-col h-screen">
                <Navbar />
                <main className="flex flex-1">
                    <div className="flex w-1/3 max-w-[300px] sidebar"> <SideBar updateState={updatekeyVal} /> </div>
                    <div className="flex flex-col flex-1 p-4 h-full cursor-pointer overflow-auto">
                        {keyVal["s"] == "cmail" && <CreateMail updatedraft={updatekeyVal} />}
                        {keyVal["s"].startsWith("a") && <Inbox updateStar={updatekeyVal} type={keyVal["s"].split("-")[1]} />}

                    </div>
                </main>
            </div>
        </counterContext.Provider>
    )
}

export default Dashboard;