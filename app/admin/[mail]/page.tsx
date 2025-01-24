<<<<<<< HEAD
export async function generateStaticParams() {
    return [{ mail: 'example@example.com' }];
}
=======
'use client';
import React, { useEffect, useState } from "react";
import SideBar from "@/app/components/sideBar";

import CreateMail from "@/app/components/sendMail";
import Inbox from "@/app/components/inbox";
import Navbar from "@/app/components/navbar";

import { counterContext } from "@/app/context/context";
import { getMail } from "@/app/server-actions/functions";
import Loading from "@/app/components/loading";

export function generateStaticParams() { // Only for deployment it is used..Rather than no use of this
    return [{ mail: '0' }];
}

const Dashboard = ({ params }: {params: {mail:string} }) => {

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
>>>>>>> e03cf24c2c2687a17614689a8425ee3f461c9d41

import Dashboard from "@/app/components/dashboard";

const DashBoard = ({ params }: { params: { mail: string } }) => {
    const { mail } = params;

<<<<<<< HEAD
    return <Dashboard mail={mail} />
}
=======
export default Dashboard;
>>>>>>> e03cf24c2c2687a17614689a8425ee3f461c9d41
