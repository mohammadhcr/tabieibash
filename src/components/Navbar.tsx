'use client'

import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.scss';
import { FaPlus, FaShoppingCart, FaStore } from "react-icons/fa";
import Image from 'next/image';
import logo from "../../public/logo.png"
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { GrArticle } from "react-icons/gr";
import { FaUser } from 'react-icons/fa6';
import { SiApplemusic } from 'react-icons/si';

const Navbar = () => {

    const auth = useUser()

    const [menu, setMenu] = useState(false);

    const clickHandler = () => {
        setMenu(!menu);
    }

    const menuCloser = () => {
        setMenu(false)
    }
    
    const {iosMenu, iosIcon, leftSide, header, nav, ul, li, logoTitle, rightSide, cartBtn, sup, iosImage, menuClose, profileImage, rapWViseLogo, profileBtn, userAccount, hamburgerMenu, menuList, menuListActive, hamburgerMenuActive, menuItems, menuUser, loginBtn, signupBtn} = styles;

    return (
        <>
                <div className={iosMenu}>
                    <SignedIn>
                        <Link href="/profile" onClick={menuCloser}>
                            {auth.user?.imageUrl ? <Image className={iosImage} src={auth.user.imageUrl} alt='' width={32} height={32} /> : <FaUser className={iosIcon} />}
                            {auth.user?.username}
                        </Link>
                    </SignedIn>
                    <SignedOut>
                        <Link href="/login" onClick={menuCloser}><FaUser className={iosIcon} />ورود</Link>
                    </SignedOut>
                    <Link href="/shop" onClick={menuCloser}><FaStore className={iosIcon} /> فروشگاه</Link>
                    <Link href="/blog" onClick={menuCloser}><GrArticle className={iosIcon} /> بـلاگ</Link>
                    <Link href="/albums" onClick={menuCloser}><SiApplemusic className={iosIcon} /> آلبوم‌ها</Link>
                </div>
            <div className={`${menuList} ${menu ? `${menuListActive}` : ""}`}>
                <ul className={menuItems}>
                    <Link href="/shop" onClick={menuCloser}><li>فروشگاه</li></Link>
                    <Link href="/blog" onClick={menuCloser}><li>بـلاگ</li></Link>
                    <Link href="/albums" onClick={menuCloser}><li>آلبوم‌ها</li></Link>
                    <Link href="/about" onClick={menuCloser}><li>درباره ما</li></Link>
                </ul>
                <SignedOut>
                    <ul className={menuUser}>
                        <Link href='/signup' className={sup} onClick={menuCloser}><FaPlus /> عضویت</Link>
                    </ul>
                </SignedOut>
            </div>
            <div onClick={menuCloser} className={`${menu ? `${menuClose}` : ""}`}>
            </div>
            <header className={header}>
                <div className={leftSide}>
                    <div className={`${hamburgerMenu} ${menu ? `${hamburgerMenuActive}` : ""}`} onClick={clickHandler}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={logoTitle}>
                        <Link onClick={menuCloser} href="/" className={rapWViseLogo}>
                            <Image src={logo} alt='' />
                        </Link>
                    </div>
                    <nav className={nav}>
                        <ul className={ul}>
                            <li className={li}><Link href="/shop"><hr /> فروشگاه</Link></li>
                            <li className={li}><Link href="/blog"><hr /> بـلاگ</Link></li>
                            <li className={li}><Link href="/albums"><hr /> آلبوم‌ها</Link></li>
                            <li className={li}><Link href="/about"><hr /> درباره ما</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className={rightSide}>
                    <div className={userAccount}>
                        <SignedOut>
                            <Link onClick={menuCloser} href='/login' className={loginBtn}>ورود</Link>
                            <Link href='/signup' className={signupBtn}>عضویت</Link>
                        </SignedOut>
                        <SignedIn>
                            <Link onClick={menuCloser} href='/cart'>
                                <FaShoppingCart className={cartBtn} />
                            </Link>
                            <Link onClick={menuCloser} href='/profile'>
                                {auth.user?.imageUrl ? <Image className={profileImage} src={auth.user.imageUrl} alt='' width={44} height={44} /> : <FaUser className={profileBtn} />}
                            </Link>
                        </SignedIn>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;