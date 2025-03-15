import Link from "next/link";
import Footer from "../components/Footer";
import styles from "../styles/RapWVise.module.scss";
import { GrArticle } from "react-icons/gr";
import { FaStore, FaPodcast } from "react-icons/fa";
import { Workbox } from "workbox-window";

const Home = () => {
    if ("serviceWorker" in navigator) {
        const wb = new Workbox("/sw.js");
        wb.register();
    }

    const {
        landingBox,
        title,
        icon,
        link,
        landingFirstBox,
        landingBoxodd,
        link1,
        links,
    } = styles;

    return (
        <>
            <div className={landingFirstBox}>
                <div className={title}>
                    <h1>به این تایتل نگاه کن!</h1>
                    <p>
                        یه شعار جذاب یکم طولانی که برند رو توصیف می‌کنه و فضا رو
                        پر کرده؛ دوپس دوپس!
                    </p>
                    <div className={links}>
                        <Link className={link} href='/login'>
                            وارد حسابت شو...
                        </Link>
                        <Link className={link1} href='/shop'>
                            بزن بریم!
                        </Link>
                    </div>
                </div>
            </div>
            <div className={landingBox}>
                <div className={title}>
                    <h2>فروشگاه</h2>
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است{" "}
                    </p>
                    <Link className={link} href='/shop'>
                        بیشتر بدانید
                    </Link>
                </div>
                <div className={icon}>
                    <span>
                        <FaStore />
                    </span>
                </div>
            </div>
            <div className={landingBoxodd}>
                <div className={icon}>
                    <span>
                        <GrArticle />
                    </span>
                </div>
                <div className={title}>
                    <h2>بـلاگ</h2>
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است{" "}
                    </p>
                    <Link className={link} href='/blog'>
                        بیشتر بدانید
                    </Link>
                </div>
            </div>
            <div className={landingBox}>
                <div className={title}>
                    <h2>آلبوم‌ها</h2>
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است{" "}
                    </p>
                    <Link className={link} href='/albums'>
                        بیشتر بدانید
                    </Link>
                </div>
                <div className={icon}>
                    <span>
                        <FaPodcast />
                    </span>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
