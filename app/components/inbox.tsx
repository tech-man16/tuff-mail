'use client';
import React, { useContext, useEffect, useState, useMemo } from "react";
import { Button } from '@nextui-org/react';
import Mail from "./recieved";
import Loading from "./loading";

export const DeleteIcon = () => {
  return (
    <svg viewBox="-4 0 32 24"
      className="w-[300px] h-[300px] fill-slate-400"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z"
        className="fill-red-800"
      />
      <path d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z"
        className="fill-red-800" />
    </svg>
  )
}

export const StartIcon = ({ color }: any) => {
  return (
    <svg width="800px" height="800px" viewBox="-3 0 30 24" xmlns="http://www.w3.org/2000/svg" className={`${color}`}>
      <path
        d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
        stroke="#f5f5f0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

import { Listbox, ListboxItem, cn } from "@nextui-org/react";
import { counterContext } from "../context/context";

export const ListboxWrapper = ({ children }: any) => (
  <div className="px-1 py-2 rounded-small w-full h-full cursor-auto overflow-auto">
    {children}
  </div>
);

export const checkState = (type: any, emails: any, counter: any) => {
  let filteredMails;
  if (type == "starred") {
    filteredMails = Array.isArray(emails) &&
      emails.filter((elem: any) => elem.to == counter.senderId ? elem.starred[0] : elem.starred[1])
  }
  else if (type == "sent") {
    filteredMails = Array.isArray(emails) &&
      emails.filter((elem: any) =>
        elem.from == counter.senderId && elem.to != counter.senderId && !elem.draft && !elem.trash[1] && elem.trash[1] != "remove")
  }
  else if (type == "trash") {
    filteredMails = Array.isArray(emails) &&
      emails.filter((elem: any) => counter.senderId == elem.from ? elem.trash[1] && elem.trash[1] != "remove" : counter.senderId == elem.to && elem.trash[0] && elem.trash[0] != "remove")
  }
  else if (type == "draft") {
    filteredMails = Array.isArray(emails) &&
      emails.filter((elem: any) => elem.from == counter.senderId && elem.draft && !elem.trash[1] && elem.trash[1] != "remove")
  }
  else {
    filteredMails = Array.isArray(emails) &&
      emails.filter((elem: any) => elem.to == counter.senderId && !elem.trash[0])
  }
  return filteredMails;
}

export default function Inbox({ updateStar, type }: any) {
  const counter: any = useContext(counterContext);

  const [emails, updateMails] = useState(counter.mails);
  const [fmails, updateFilteredmails]: any = useState(null);

  const [color, setColor]: any = useState({});
  const [selectedKeys, setSelectedKeys]: any = useState(new Set(["Inbox"]));

  useEffect(() => {
    updateMails(counter.mails);
    counter.mails &&
      updateFilteredmails(counter.mails.filter((elem: any) => elem.to == counter.senderId && !elem.trash[0]))
  }, [counter.mails]);

  useEffect(() => {
    const filtered_mails: any = checkState(type, counter.mails, counter);
    updateFilteredmails(filtered_mails);
  }, [type, counter.change]);

  useEffect(() => {
    Array.isArray(fmails) &&
      fmails.forEach((elem: any) => {
        if ((elem.from == counter.senderId && elem.starred[1]) || (elem.to == counter.senderId && elem.starred[0]))
          setColor((prev: any) => ({ ...prev, [elem.msgId]: "fill-yellow-400" }))
      })
  }, [fmails]);

  const select = (key: any) => {
    updateStar((prevVal: any) => ({ ...prevVal, "mailIndex": key - 1 }));
  }

  const toggleColor = (e: any) => {

    color[e.target.id] == "fill-none" || color[e.target.id] == undefined ?
      (
        setColor((prevVal: any) => ({ ...prevVal, [e.target.id]: "fill-yellow-400" })),
        updateStar((prev: any) => ({ ...prev, cnt: { ...prev.cnt, star: prev.cnt.star + 1 } }))
      ) : (
        setColor((prevVal: any) => ({ ...prevVal, [e.target.id]: "fill-none" })),
        updateStar((prev: any) => ({ ...prev, cnt: { ...prev.cnt, star: prev.cnt.star - 1 } }))
      );
  }

  const markmail = (id: any, type: any, value: boolean) => {

    let st = counter.st;
    let MAILS = counter.mails;
    const index = MAILS.findIndex((elem: any) => elem.msgId == id);
    const expandType = type.split("_");
    let changes = [];

    if (expandType[0] == "a-inbox") {
      MAILS[index][expandType[1]] = [!value, MAILS[index][expandType[1]][1]];
      changes = MAILS[index][expandType[1]];
    } else if (expandType[0] == "a-sent") {
      MAILS[index][expandType[1]] = [MAILS[index][expandType[1]][0], !value];
      changes = MAILS[index][expandType[1]];
    } else if (expandType[0] == "a-trash" || expandType[0] == "a-draft") {

      if (expandType[1] == "trash")
        if (MAILS[index].to == counter.senderId) {
          MAILS[index][expandType[1]] = ["remove", MAILS[index][expandType[1]][1]];
        } else {
          MAILS[index][expandType[1]] = [MAILS[index][expandType[1]][0], "remove"];
        }

      changes = MAILS[index][expandType[1]];

    } else {  // if (expandType[0] == "a-starred")

      if (MAILS[index].to == counter.senderId) { // inbox
        MAILS[index][expandType[1]] = [!MAILS[index][expandType[1]][0], MAILS[index][expandType[1]][1]];
      }
      else { // sent
        MAILS[index][expandType[1]] = [MAILS[index][expandType[1]][0], !MAILS[index][expandType[1]][1]];

      }
      changes = MAILS[index][expandType[1]];
    }
    const sendingInfo = {
      msgId: id,
      from: MAILS[index].from,
      type: expandType[0],
      change: { [expandType[1]]: changes }
    }
    const ind = st.findIndex((elem: any) => elem.msgId == id);
    if (ind == -1)
      st = [...st, sendingInfo]
    else
      st[ind] = { ...sendingInfo, change: { ...st[ind].change, ...sendingInfo.change } }
    updateStar((prevVal: any) => ({ ...prevVal, mails: MAILS, st: st, change: !prevVal.change }));

  }

  if (!emails)
    return <div className="w-full h-full"> <Loading /> </div>
  else if (counter.mailIndex != null) {
    if (counter.s != "a-draft")
      return <Mail mail={fmails[counter.mailIndex]} updateContext={updateStar} starred={color} setColor={setColor} />
    else
      updateStar((prevVal: any) => ({ ...prevVal, s: "cmail", inheritedDraft: emails[counter.mailIndex] }));
  }
  return (
    <>
      <p className="text-default-400 text-xl cursor-default">{counter.s.split("-")[1].slice(0, 1).toUpperCase() + counter.s.split("-")[1].slice(1)}:</p>
      <ListboxWrapper>
        <Listbox
          aria-label="Listbox menu with descriptions"
          variant="flat"
          onAction={select}
          title={counter.s}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}

        >
          {fmails != undefined ? fmails.map((elem: any, ind: number) => (

            <ListboxItem
              key={`${ind + 1}`}
              id={`${ind}`}
              classNames={{ base: "border-b-2" }}
            >
              <div className="flex min-h-5">
                <div className="flex flex-col flex-1 gap-2 p-3 font-semibold">

                  <span className="flex text-base">
                    {counter.s == "a-inbox" && elem.from}
                    {counter.s == "a-sent" && elem.to}
                    {counter.s == "a-draft" && elem.to}
                    {counter.s == "a-starred" && elem.from == counter.senderId && elem.to}
                    {counter.s == "a-starred" && elem.to == counter.senderId && elem.from}
                    {counter.s == "a-trash" && elem.from == counter.senderId && elem.to}
                    {counter.s == "a-trash" && elem.to == counter.senderId && elem.from}
                  </span>

                  <span className="flex flex-1 items-center text-sm">  {elem.msg}...  </span>
                </div>

                <span className="flex justify-center items-center gap-4">
                  <Button
                    className="bg-inherit text-black" startContent={<DeleteIcon />}
                    isIconOnly
                    onPress={() => {
                      let value;
                      if (counter.s == "a-inbox")
                        value = elem.trash[0];
                      else
                        value = elem.trash[1];
                      markmail(elem.msgId, `${counter.s}_trash`, value);
                    }}
                  />
                  <Button id={`${elem.msgId}`} startContent={<StartIcon color={color[`${elem.msgId}`]} />}
                    className="bg-inherit"
                    isIconOnly
                    onPress={(e) => {
                      toggleColor(e);
                      let value;
                      if (counter.s == "a-inbox")
                        value = elem.starred[0];
                      else if (counter.s == "a-draft")
                        value = elem.starred;
                      else
                        value = elem.starred[1];
                      markmail(elem.msgId, `${counter.s}_starred`, value);
                    }} />
                </span>
              </div>
            </ListboxItem>
          )) :
            <ListboxItem > </ListboxItem>
          }

        </Listbox>
      </ListboxWrapper>
    </> 
  );
}