export async function generateStaticParams() {
    return [{ mail: 'example@example.com' }];
}

import Dashboard from "@/app/components/dashboard";

const DashBoard = ({ params }: { params: { mail: string } }) => {
    const { mail } = params;

    return <Dashboard mail={mail} />
}