'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Input, Textarea, Button } from '@nextui-org/react';
import { sendMail } from '@/app/server-actions/functions';
import { counterContext } from '@/app/context/context';
import { getmsgInfo } from '@/app/server-actions/functions';
import Loading from './loading';

const SendIcon = () => (
    <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 122.56 122.88">
        <title>send</title>
        <path className="cls-1" d="M2.33,44.58,117.33.37a3.63,3.63,0,0,1,5,4.56l-44,115.61h0a3.63,3.63,0,0,1-6.67.28L53.93,84.14,89.12,33.77,38.85,68.86,2.06,51.24a3.63,3.63,0,0,1,.27-6.66Z" />
    </svg>
)

const CreateMail = (props: any) => {
    const counter: any = useContext(counterContext);

    const [mail, updateMail]: any = useState({ from: counter["senderId"] });
    const [isLoading, setLoading] = useState(false);

    const updatedraft = props.updatedraft;

    useEffect(() => {

        if (counter.inheritedDraft) {
            setLoading(true);
            (async () => {
                const params = { from: counter.senderId, msgId: counter.inheritedDraft.msgId };
                if (params.msgId.length < 8) {
                    updateMail((prevVal: any) => ({ ...prevVal, ...counter.inheritedDraft, msg: counter.inheritedDraft.msg }));
                } else {
                    const data = await getmsgInfo(params);
                    if (data.data.length) {
                        updateMail((prevVal: any) => ({ ...prevVal, ...counter.inheritedDraft, msg: (data.data)[0].msg }));
                    }
                }
                setLoading(false);
            })();
        }
        
    }, [counter.inheritedDraft]);

    const submit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        const data = await sendMail({ ...mail, draft: false });

        updatedraft((prev_val: any) => ({
            ...prev_val,
            draftinfo: { draft: false },
            mails: [...prev_val.mails, data.mail_info],
            cnt: { ...prev_val.cnt, sent: prev_val.cnt.sent + 1 }
        }));
        setLoading(false);
    }

    const handle = (e: any) => {
        updateMail((prevInfo: any) => ({ ...prevInfo, [e.target.id]: e.target.value }));
        const msgID = Math.random().toString(36).slice(2);
        updatedraft((prev_val: any) => (
            {
                ...prev_val,
                draftinfo: {
                    ...prev_val.draftinfo,
                    from: counter.senderId,
                    msgId: msgID,
                    draft: true,
                    starred: false,
                    trash: false,
                    [e.target.id]: e.target.value
                }
            }));
    }

    if (isLoading)
        return <div className='w-full h-full'> <Loading /> </div>
    return (
        <form className='flex flex-col gap-4 p-0 h-full' action="#" onSubmit={submit} method='post'>
            <div className="flex flex-col gap-4 border-gray-700 hover:border-gray-400 p-4 border rounded-lg">
                <div className="flex">
                    <label htmlFor="to" className='flex items-center w-[100px]'>To : </label>
                    <Input id="to" type="text" onChange={handle} value={mail.to} />
                </div>

                <div className="flex">
                    <label htmlFor="sub" className='flex items-center w-[100px]'>Subject : </label>
                    <Input id="sub" type="text" onChange={handle} value={mail.sub} />
                </div>
            </div>
            <div className="relative flex flex-1">
                <Textarea
                    id='msg'
                    isClearable
                    classNames={{ inputWrapper: 'flex flex-1 h-full tracking-wider' }}
                    label="Mail"
                    variant="bordered"
                    onClear={() => console.log("textarea cleared")}
                    onChange={handle}
                />
            </div>
            <div className="flex justify-end"> <Button type='submit' color='success' endContent={<SendIcon />} />  </div>
        </form>
    )
}

export default CreateMail;