'use client'

import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.scss';
import { FaHome, FaPlus, FaShoppingCart, FaStore } from "react-icons/fa";
import Image from 'next/image';
import logo from "../../public/logo.png"
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { GrArticle } from "react-icons/gr";
import { FaUser } from 'react-icons/fa6';

const Navbar = () => {

    const auth = useUser()

    const [menu, setMenu] = useState(false);

    const clickHandler = () => {
        setMenu(!menu);
    }

    const menuCloser = () => {
        setMenu(false)
    }
    
    const {iosMenu, iosIcon, leftSide, header, nav, ul, li, logoTitle, rightSide, cartBtn, sup, menuClose, profileImage, rapWViseLogo, profileBtn, userAccount, hamburgerMenu, menuList, menuListActive, hamburgerMenuActive, menuItems, menuUser, loginBtn, signupBtn} = styles;

    return (
        <>
                <div className={iosMenu}>
                    <Link href="/" onClick={menuCloser}><FaHome className={iosIcon} /> صفحه اصلی</Link>
                    <Link href="/shop" onClick={menuCloser}><FaStore className={iosIcon} /> فروشگاه</Link>
                    <Link href="/blog" onClick={menuCloser}><GrArticle className={iosIcon} /> بـلاگ</Link>
                    <SignedIn>
                        <Link href="/cart" onClick={menuCloser}><FaShoppingCart className={iosIcon} /> سبد خرید</Link>
                    </SignedIn>
                </div>
            <div className={`${menuList} ${menu ? `${menuListActive}` : ""}`}>
                <ul className={menuItems}>
                    <Link href="/shop" onClick={menuCloser}><li>فروشگاه</li></Link>
                    <Link href="/blog" onClick={menuCloser}><li>بـلاگ</li></Link>
                    <Link href="/podcast" onClick={menuCloser}><li>پادکست</li></Link>
                    <Link href="/review" onClick={menuCloser}><li>صفحه ۴۰۴</li></Link>
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
                        <Link href="/" className={rapWViseLogo}>
                            <Image src={logo} alt='' />
                        </Link>
                    </div>
                    <nav className={nav}>
                        <ul className={ul}>
                            <li className={li}><Link href="/shop"><hr /> فروشگاه</Link></li>
                            <li className={li}><Link href="/blog"><hr /> بـلاگ</Link></li>
                            <li className={li}><Link href="/podcast"><hr /> پادکست</Link></li>
                            <li className={li}><Link href="/review"><hr /> صفحه ۴۰۴</Link></li>
                            <li className={li}><Link href="/about"><hr /> درباره ما</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className={rightSide}>
                    <div className={userAccount}>
                        <SignedOut>
                            <Link href='/login' className={loginBtn}>ورود</Link>
                            <Link href='/signup' className={signupBtn}>عضویت</Link>
                        </SignedOut>
                        <SignedIn>
                            <Link href='/cart'>
                                <FaShoppingCart className={cartBtn} />
                            </Link>
                            <Link href='/profile'>
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