import path from "path";
import { cache } from "react";

const signup = async (params: any) => { // login/page.tsx
    const res = await fetch(path.join(process.cwd(), "/signup"), {
        method: "POST",
        body: JSON.stringify(params)
    })

    const data = await res.json();
    return data;
}

const login = async (params: any) => { // login/page.tsx
    const res = await fetch(path.join(process.cwd(), "/validate"), {
        method: "POST",
        body: JSON.stringify(params)
    })

    const data = await res.json();
    return data;
}

const sendMail = async (params: any) => { // components/sendmail.tsx, components/sideBar.tsx

    const res = await fetch(path.join(process.cwd(), "/sendMail"), {
        method: "POST",
        body: JSON.stringify(params)
    });
    const data = await res.json();
    return data;
}

const getMail = cache(async (params: any) => { // admin/page.tsx , components/dashboard.tsx
    const res = await fetch(path.join(process.cwd(), "/inbox"), {
        method: "POST",
        body: JSON.stringify(params)
    });
    const data = await res.json();
    return data;
})

const markMail = async (params: any) => { // components/sidebar.tsx
    const res = await fetch(path.join(process.cwd(), "/markMail"), {
        method: "POST",
        body: JSON.stringify(params)
    });
    const data = await res.json();
    return data;
}

const getmsgInfo = async (params: any) => { // components/recieved.tsx, components/sendMail.tsx
    const res = await fetch(path.join(process.cwd(), "/getmsgInfo"), {
        method: "POST",
        body: JSON.stringify(params)
    });
    const data = await res.json();
    return data;
}
export { signup, login, sendMail, getMail, markMail, getmsgInfo }