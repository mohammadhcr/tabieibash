/* eslint-disable @next/next/no-img-element */
import supabase from '@/supabase';
import styles from '../../../styles/Album.module.scss';
import { FaSpotify, FaSoundcloud, FaYoutube } from "react-icons/fa6";
import type { Metadata } from "next";
import { SiApplemusic } from "react-icons/si";
import { Suspense } from 'react';
import Loading from '@/app/loading';

export const metadata: Metadata = {
  title: "دریافت اثر | طبیعی باش",
};

const Podcast = async ({params}: {params: Promise<{slug: string}>}) => {

    const { slug } = await params;

    const { data: rap } = await supabase.from('albums').select('*').eq('slug', slug).single()

    const {wrapper, info, album, artist, description, links, artwork, section, listen, avai, statick, youtube, episodeDesc, podcastInfo, spotify, applePod, soundCloud, platformIcon} = styles;
    
    return (
        <Suspense fallback={<Loading />}>
            <div className={wrapper}>
                <div className={artwork}>
                    <img src={rap.artwork} alt="artwork" />
                </div>
                <div className={section}>
                    <div className={info}>
                        <div className={podcastInfo}>
                            <h2 className={album}>{rap.title}</h2>
                            <h3 className={artist}>{rap.artist}</h3>
                            <p className={episodeDesc}>{rap.description}</p>
                        </div>
                        <div className={description}>
                            <span className={statick}>تاریخ انتشار:</span>
                                {rap.releaseday} {rap.releasemonth} {rap.releaseyear}
                        </div>
                    </div>
                    <div className={listen}>
                        <h2 className={avai}>پلتفرم‌های دریافت اثر:</h2>
                        <div className={links}>
                            <a className={soundCloud} href={rap.soundcloud} target="_blank" rel="noopener noreferrer"><FaSoundcloud className={platformIcon} />ساندکلاد</a>
                            <a className={youtube} href={rap.youtube} target="_blank" rel="noopener noreferrer"><FaYoutube className={platformIcon} />یوتیوب</a>
                            <a className={spotify} href={rap.spotify} target="_blank" rel="noopener noreferrer"><FaSpotify className={platformIcon} />اسپاتیفای</a>
                            <a className={applePod} href={rap.apple} target="_blank" rel="noopener noreferrer"><SiApplemusic className={platformIcon} />اپل موزیک</a>
                        </div>
                    </div>
                </div>
            </div>
            </Suspense>
    );
};

export default Podcast;