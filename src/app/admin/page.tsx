import styles from "../../styles/Admin.module.scss";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
    title: "پنل مدیریت | طبیعی باش",
};

const Admin = async () => {
    const userObj = await currentUser();

    const { adminHeader } = styles;

    return (
        <div className='userWrapper'>
            <h1 className={adminHeader}>
                سلام {userObj?.username}
                <br /> به پنل ادمین خوش اومدی.
            </h1>
        </div>
    );
};

export default Admin;
