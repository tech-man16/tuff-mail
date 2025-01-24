'use client';
import React, { useContext, useEffect, useState } from "react";
import { Textarea, Button, Breadcrumbs, BreadcrumbItem, Image } from "@nextui-org/react";
import { counterContext } from "@/app/context/context";
import { getmsgInfo } from "../server-actions/functions";
import profile from "@/app/logo/profile.gif";
import { StartIcon } from "./inbox";
import Loading from "./loading";

const Mail = ({ mail, updateContext, starred, setColor }: any) => { //{ params: Promise<{ mail: string }> }
    const counter: any = useContext(counterContext);

    const [msg, updatemsg] = useState("");
    useEffect(() => {
        (async () => {
            const params = { from: counter.senderId, msgId: mail.msgId };
            const { status, data } = await getmsgInfo(params);
            if (status == 200) {
                if (data.length) {
                    updatemsg(data[0].msg);
                } else {
                    updatemsg(mail.msg);
                }
            }
        })();
    }, []);

    const toggleColor = (e: any) => {

        starred[mail.msgId] == "fill-none" ?
            (
                setColor((prevVal: any) => ({ ...prevVal, [mail.msgId]: "fill-yellow-400" })),
                updateContext((prev: any) => ({ ...prev, cnt: { ...prev.cnt, star: prev.cnt.star + 1 } }))
            ) : (
                setColor((prevVal: any) => ({ ...prevVal, [mail.msgId]: "fill-none" })),
                updateContext((prev: any) => ({ ...prev, cnt: { ...prev.cnt, star: prev.cnt.star - 1 } }))
            );
    }

    const current = counter.mailIndex + 1;

    return (
        <div className="flex flex-col gap-2 border h-full cursor-auto">
            <div className="flex items-center border-2 border-green-400 p-4">
                <Breadcrumbs onAction={(key) => updateContext((prev: any) => ({ ...prev, s: `a-${key}` }))}>
                    <BreadcrumbItem key={counter.s.split("-")[1]} isCurrent={current == counter.s.split("-")[1]}>
                        <span className="text-default-400 text-lg italic">  {counter.s.split("-")[1]} </span>
                    </BreadcrumbItem>
                    <BreadcrumbItem key={counter.mailIndex + 1} isCurrent={current == counter.mailIndex + 1}>
                        <span className="text-base">  <span className="text-default-400/85 text-sm italic"> (subject) </span> {mail.sub} </span>
                    </BreadcrumbItem>
                </Breadcrumbs>
                {/* {counter.s.split("-")[1] == "inbox" ? mail.to : counter.s.split("-")[1] == "sent" ? mail.from : counter.s.split("-")[1] == "starred" ? mail.from == counter.senderId ? mail.to : mail.from : ""} */}
            </div>
            <div className="flex items-center gap-2 md:gap-4 border-2 border-green-300">
                <div className="flex p-2 profile"> <Image alt="profile" src={profile.src} /> </div>
                <div className="flex flex-col flex-1 gap-2 p-4 md:tracking-widest">
                    <span className="flex gap-2 md:gap-4 text-base md:text-lg"> <span className="text-default-400 text-sm md:text-base italic"> from:   </span> {mail.from} </span>
                    <span className="flex gap-2 md:gap-4 text-base md:text-lg"> <span className="text-default-400 text-sm md:text-base italic"> to:    </span> {mail.to} </span>
                </div>

                <Button
                    isIconOnly
                    className="bg-inherit"
                    startContent={<StartIcon color={starred[mail.msgId]} />}
                    onPress={toggleColor} />
                <span className="date">{mail.date}</span>
            </div>
            {msg == "" ? <div className="flex flex-1 border-2 border-green-400"> <Loading /> </div> : <Textarea
                disabled
                // className="min-h-[400px]"
                classNames={{
                    innerWrapper: "",
                    inputWrapper: "h-full min-h-[400px] bg-gray-600/60 data-[hover=true]:bg-gray-600/60"
                }}
                defaultValue={msg}
            />}
        </div>
    )
}

export default Mail;