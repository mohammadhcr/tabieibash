import HamsedaCard from '../../components/HamsedaCard';
import styles from '../../styles/Items.module.scss';
import Footer from '../../components/Footer';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پادکست همصدا | طبیعی باش",
};

interface Podcast {
    id: number
    episodeNumber: string
    episodeName: string
    episodeDescription: string
    releaseDate: number
    slug: string
    artwork: string
    soundcloud: string
    spotify: string
    apple: string
}

const Hamseda = async () => {

    const response = await fetch("https://tabieibash.vercel.app/api/podcast")
    const data = await response.json()

    const {itemContainer, itemText, itemTitle, cards} = styles;

    return (
        <>
            <div className={itemContainer}>
                <div>
                    <h2 className={itemTitle}>پادکست همصدا</h2>
                    <p className={itemText}>همصدا يه پادكست موضوع محوره كه از ديد مخاطب‌ها، مسائل مختلف در حوزه‌ی رپ فارسى رو بررسى می‌كنه.</p>
                </div>
                <div className={cards}>
                    {data.map((podcast: Podcast) => <HamsedaCard {...podcast} key={podcast.id} />)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Hamseda;