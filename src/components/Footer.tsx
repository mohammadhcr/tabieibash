import Image from "next/image";
import styles from "../styles/Footer.module.scss";
import logo from "../../public/logo.png";
import { FcLike } from "react-icons/fc";
import { SiGithub, SiGenius } from "react-icons/si";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
    const {
        footer,
        linksContainer,
        websiteBio,
        logoAndTitle,
        biography,
        usefulLinks,
        linksList,
        copyrightContainer,
        copyright,
        socialProfiles,
        usefulTitle,
        underline,
    } = styles;

    return (
        <footer className={footer}>
            <div className={linksContainer}>
                <div className={websiteBio}>
                    <div className={logoAndTitle}>
                        <Image src={logo} alt='Logo' />
                        <h2>طبیعی باش</h2>
                    </div>
                    <p className={biography}>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                        برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
                        هدف بهبود ابزارهای کاربردی می باشد.
                    </p>
                </div>
                <div className={usefulLinks}>
                    <div>
                        <h3 className={usefulTitle}>
                            <span className={underline}>لینک‌های</span> کاربردی
                        </h3>
                        <ul className={linksList}>
                            <li>لینک ۱</li>
                            <li>لینک ۲</li>
                            <li>لینک ۳</li>
                            <li>لینک ۴</li>
                            <li>لینک ۵</li>
                            <li>لینک ۶</li>
                            <li>لینک ۷</li>
                            <li>لینک ۸</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={usefulTitle}>
                            <span className={underline}>عناوین</span> غیرمفید
                        </h3>
                        <ul className={linksList}>
                            <li>لینک ۱</li>
                            <li>لینک ۲</li>
                            <li>لینک ۳</li>
                            <li>لینک ۴</li>
                            <li>لینک ۵</li>
                            <li>لینک ۶</li>
                            <li>لینک ۷</li>
                            <li>لینک ۸</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={copyrightContainer}>
                <span className={copyright}>
                    <span>کپی‌رایت ۱۴۰۴، تمامی حقوق محفوظ است</span>
                    <hr />
                    <span>
                        ساخته‌شده با <FcLike /> توسط «محمد بخشی»
                    </span>
                </span>
                <span className={socialProfiles}>
                    <a
                        href='https://github.com/mohammadhcr'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <SiGithub />
                    </a>
                    <a
                        href='https://genius.com/mohammadhcr'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <SiGenius />
                    </a>
                    <a
                        href='https://instagram.com/mohammadhcr'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaInstagram />
                    </a>
                </span>
            </div>
        </footer>
    );
};

export default Footer;
