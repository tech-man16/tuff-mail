'use client';
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { login, signup } from "../server-actions/functions";
import { useRouter } from "next/navigation";
import background from "@/app/logo/bg2.jpg";
import Loading from "../components/loading";
import { div } from "framer-motion/client";

const LoginPage = ({ update }: any) => {
    const router = useRouter();
    const [info, setInfo] = useState({});
    const handle = (e: any) => {
        setInfo((prevval) => ({ ...prevval, [e.target.id]: e.target.value }))
    };
    const [isLoading, setLoading] = useState(false);
    const submit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const res = await login(info);
        if (res.status == 200)
            router.push(`/admin/${res.slug}`);
        setLoading(false);
    };
    return (
        <div className="flex justify-center items-center bg-cover bg-no-repeat h-screen form" style={{ backgroundImage: `url(${background.src})` }}>

            <form
                className="flex flex-col justify-between gap-2 border-2 bg-cover bg-no-repeat p-4 md:w-96 md:h-[368px]"
                style={{ backgroundImage: `url(${background.src})` }}
                onSubmit={submit}>
                <span className="flex justify-center items-center font-extrabold text-2xl"> Login </span>
                <div className="flex flex-col gap-4 tracking-widest">
                    <label htmlFor="uname"> Username </label>
                    <Input id="uname" onChange={handle} />
                </div>
                <div className="flex flex-col gap-4 tracking-widest r1">
                    <label htmlFor="pwd"> Password </label>
                    <Input id="pwd" type="Password" className="tracking-wide" onChange={handle} />
                </div>
                <span className="flex justify-end mx-2 submit"> <Button isDisabled={isLoading} color="success" type="submit"> {!isLoading ? "Submit" : <Loading />} </Button> </span>
                <Button color="primary" variant="light" onPress={() => update(0)} className="text-base" >  Signup ?  </Button>
            </form>

        </div>
    )
}

const SignUpPage = ({ update }: any) => {
    const [info, updateInfo] = useState({});
    const [isLoading, setLoading] = useState(false);
    const handle = (e: any) => {
        updateInfo((prevVal) => ({ ...prevVal, [e.target.id]: e.target.value }));
    }
    const submit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        const res = await signup(info);
        if (res.status == 200)
            alert("Signup Successfull !!");
        setLoading(false);
    }
    return (
        <div className="flex justify-center items-center md:bg-cover md:bg-no-repeat h-screen form" style={{ backgroundImage: `url(${background.src})` }}>
            <form className="flex flex-col justify-between gap-2 bg-black bg-cover bg-no-repeat mx-auto p-4 border md:w-96 overflow-auto"
                style={{ backgroundImage: `url(${background.src})` }}
                onSubmit={submit}>
                <span className="flex justify-center items-center my-2 font-extrabold text-2xl"> Signup </span>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-4 tracking-widest">
                        <label htmlFor="fname"> Firstname </label>
                        <Input id="fname" onChange={handle} required />
                    </div>

                    <div className="flex flex-col gap-4 tracking-widest">
                        <label htmlFor="mname"> Middlename </label>
                        <Input id="mname" onChange={handle} />
                    </div>
                </div>

                <div className="flex flex-col gap-4 tracking-widest">
                    <label htmlFor="lname"> Lastname </label>
                    <Input id="lname" onChange={handle} required />
                </div>

                <div className="flex flex-col gap-4 tracking-widest">
                    <label htmlFor="uname"> Username </label>
                    <Input id="uname" onChange={handle} required />
                </div>
                <div className="flex flex-col gap-4 tracking-widest r1">
                    <label htmlFor="pwd"> Password </label>
                    <Input id="pwd" type="Password" className="tracking-wide" onChange={handle} required />
                </div>

                <div className="flex flex-col gap-4 tracking-widest r1">
                    <label htmlFor="cpwd"> Confirm Password </label>
                    <Input id="cpwd" type="Password" className="tracking-wide" onChange={handle} required />
                </div>
                <span className="flex justify-end mx-2 submit"> <Button color="success" type="submit"> {!isLoading ? 'Signup' : <Loading />} </Button> </span>
                <Button color="primary" variant="light" onPress={() => update(1)} className="text-base">  Login ? </Button>
            </form>

        </div>

    )
}

const Login = () => {
    const [state, updateState] = React.useState(1);
    return (
        <>
            {state ? <LoginPage update={updateState} /> : <SignUpPage update={updateState} />}
        </>
    )
}

export default Login;