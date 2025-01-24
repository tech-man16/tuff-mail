import path from "path";
import { cache } from "react";

const signup = async (params: any) => {
    const res = await fetch(path.join(process.cwd(), "/signup"), {
        method: "POST",
        body: JSON.stringify(params)
    })

    const data = await res.json();
    return data;
}

const login = async (params: any) => {
    const res = await fetch(path.join(process.cwd(), "/validate"), {
        method: "POST",
        body: JSON.stringify(params)
    })

    const data = await res.json();
    return data;
}

const sendMail = async (params: any) => {

    const res = await fetch(path.join(process.cwd(), "/sendMail"), {
        method: "POST",
        body: JSON.stringify(params)
    });
    const data = await res.json();
    return data;
}

const getMail = cache(async (params: any) => {
    const res = await fetch(path.join(process.cwd(), "/inbox"), {
        method: "POST",
        body: JSON.stringify(params)
    });
    const data = await res.json();
    return data;
})

const markMail = async (params: any) => {
    const res = await fetch(path.join(process.cwd(), "/markMail"), {
        method: "POST",
        body: JSON.stringify(params)
    });
    const data = await res.json();
    return data;
}

const getmsgInfo = async (params: any) => {
    const res = await fetch(path.join(process.cwd(), "/getmsgInfo"), {
        method: "POST",
        body: JSON.stringify(params)
    });
    const data = await res.json();
    return data;
}
export { signup, login, sendMail, getMail, markMail, getmsgInfo }