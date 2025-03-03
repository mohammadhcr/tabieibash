import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider, ClerkLoading } from '@clerk/nextjs'
import Loading from "./loading";

const iransansx = localFont({
  src: '../../public/IRANSansXV.woff',
})

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
      <html lang="fa">
        <body className={iransansx.className}>
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
