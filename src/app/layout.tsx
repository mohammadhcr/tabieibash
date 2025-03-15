import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider, ClerkLoading } from "@clerk/nextjs";
import Loading from "./loading";

const myFont = localFont({
    src: [
        {
            path: "../../public/Anjoman-Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/Anjoman-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/Anjoman-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/Anjoman-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/DoranFaNum-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/DoranFaNum-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
    ],
});

export const metadata: Metadata = {
    title: "طبیعی باش",
    description: "طبیعی باش | یه شعار جذاب یک‌خطی که برند رو توصیف می‌کنه!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang='fa'>
                <head>
                    <link rel='manifest' href='/manifest.json' />
                </head>
                <body className={`${myFont.className}`}>
                    <Navbar />
                    <ClerkLoading>
                        <Loading />
                    </ClerkLoading>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
