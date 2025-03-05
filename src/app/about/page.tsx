import styles from '../../styles/About.module.scss';
import { MdAlternateEmail } from "react-icons/md";
import { FaTelegram } from "react-icons/fa";
import { FaInstagram, FaTwitter } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "درباره ما | طبیعی باش",
};

const About = () => {

    const {mainContainer, aboutUsTitle, contactLinks, contactSection, cLink, cIcon, aTitle, aSubTitle} = styles;
    
    return (
        <div className='userWrapper'>
        <div className={mainContainer}>
            <div className={aboutUsTitle}>
                <h2 className={aTitle}>طبیعی باش</h2>
                <p className={aSubTitle}>یه شعار جذاب یک‌خطی که برند رو توصیف می‌کنه!</p>
            </div>
            <div className={contactSection}>
                <div className={contactLinks}>
                    <div><h2>پروفایل من در شبکه‌های اجتماعی</h2></div>
                    <div className={cLink}>
                        <a href="mailto:mohammadhcr@icloud.com" target="_blank" rel="noopener noreferrer"><MdAlternateEmail className={cIcon} />ایمیل</a>
                        <a href="https://github.com/mohammadhcr" target="_blank" rel="noopener noreferrer"><SiGithub className={cIcon} />گیت‌هاب</a>
                        <a href="https://twitter.com/mohammadhcr" target="_blank" rel="noopener noreferrer"><FaTwitter className={cIcon} />توئیتر</a>
                        <a href="https://t.me/mohammadhcr" target="_blank" rel="noopener noreferrer"><FaTelegram className={cIcon} />تلگرام</a>
                        <a href="https://instagram.com/mohammadhcr" target="_blank" rel="noopener noreferrer"><FaInstagram className={cIcon} />اینستاگرام</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default About;