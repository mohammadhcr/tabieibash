import supabase from '@/supabase';
import HamsedaCard from '../../components/HamsedaCard';
import styles from '../../styles/Items.module.scss';
import Footer from '../../components/Footer';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "آلبوم‌ها | طبیعی باش",
};

interface Album {
    id: number
    title: string
    artist: string
    description: string
    releaseyear: number
    releasemonth: number
    releaseday: number
    slug: string
    artwork: string
    soundcloud: string
    spotify: string
    apple: string
    youtube: string
}

const Hamseda = async () => {

    const { data } = await supabase.from('albums').select('*')

    const {itemContainer, itemText, itemTitle, cards} = styles;

    return (
        <>
            <div className={itemContainer}>
                <div>
                    <h2 className={itemTitle}>آلبوم‌ها</h2>
                    <p className={itemText}>آلبوم‌ها و آثاری که تحت تشکل ملتفت منتشر شده‌اند</p>
                </div>
                <div className={cards}>
                    {data?.map((album: Album) => <HamsedaCard {...album} key={album.id} />)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Hamseda;