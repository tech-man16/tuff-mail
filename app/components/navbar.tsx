'use client';
import React, { useContext, useEffect, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
    Tooltip,
    Image
} from "@nextui-org/react";
import { counterContext } from "../context/context";
import title from "@/app/logo/tuff_logo.png";
import SideBar from "./sideBar";

const Navbar = ({ updateContext }: any) => {
    const counter: any = useContext(counterContext);
    const [mails, updateMails]: any = useState(null);
    useEffect(() => {
        updateMails(counter.mails);
        console.log(counter.fname)
    }, [counter.mails])
    return (
        <main className="flex bg-black p-4 border h-[100px]">
            <div className="flex flex-1 items-center">
                <Image alt="logo" src={title.src} className="w-full h-24" />
            </div>

            <div className="flex flex-1 justify-end items-center gap-4 md:gap-2">
                <span className="text-sm md:text-base"> Welcome, {counter.fname} </span>
                <Drawers updateContext={updateContext} />
            </div>
        </main>
    )
}

export default Navbar;

const MenuIcon = () => (
    <svg width="800px" height="800px" viewBox="0 0 24 24" className="fill-red-400" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_429_11066)">
            <path d="M3 6.00092H21M3 12.0009H21M3 18.0009H21" stroke="red" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_429_11066">
                <rect width="24" height="24" fill="white" transform="translate(0 0.000915527)" />
            </clipPath>
        </defs>
    </svg>
)

const Drawers = ({ updateContext }: any) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                isIconOnly
                color="primary"
                variant="flat"
                onPress={onOpen}
                endContent={<MenuIcon />}
                className="sm:hidden"
            />

            <Drawer
                hideCloseButton
                backdrop="blur"
                classNames={{
                    base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
                }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="xs"
            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="top-0 z-50 absolute inset-x-0 flex flex-row justify-between gap-2 border-default-200/50 bg-content1/50 backdrop-blur-lg backdrop-saturate-150 px-2 py-2 border-b">
                                <Tooltip content="Close">
                                    <Button
                                        isIconOnly
                                        className="text-default-400"
                                        size="sm"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        <svg
                                            className="fill-none stroke-current"
                                            height="20"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                                        </svg>
                                    </Button>
                                </Tooltip>

                            </DrawerHeader>
                            <DrawerBody className="pt-16">
                                <div className="md:hidden" >  <SideBar updateState={updateContext} /> </div>
                            </DrawerBody>
                            <DrawerFooter className="flex flex-col gap-1">

                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
export { MenuIcon, Drawers };
