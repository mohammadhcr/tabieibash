/* eslint-disable @next/next/no-img-element */
import styles from '../../../styles/Podcast.module.scss';
import { FaSpotify, FaSoundcloud, FaPodcast } from "react-icons/fa6";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پادکست | طبیعی باش",
};

const Podcast = async ({params}: {params: Promise<{slug: string}>}) => {

    const { slug } = await params;

    const response = await fetch(`https://tabieibash.vercel.app/api/podcast/${slug}`)
    const data = await response.json()

    const {wrapper, info, album, artist, description, links, artwork, section, listen, avai, statick, episodeDesc, podcastInfo, spotify, applePod, soundCloud, platformIcon} = styles;
    
    return (
            <div className={wrapper}>
                <div className={artwork}>
                    <img src={data.artwork} alt="artwork" />
                </div>
                <div className={section}>
                    <div className={info}>
                        <div className={podcastInfo}>
                            <h2 className={album}>{data.episodeName}</h2>
                            <h3 className={artist}>{data.episodeNumber}</h3>
                            <p className={episodeDesc}>{data.episodeDescription}</p>
                        </div>
                        <div className={description}>
                            <span className={statick}>تاریخ انتشار:</span>
                                {data.releaseDate.day} {data.releaseDate.month} {data.releaseDate.year}
                        </div>
                    </div>
                    <div className={listen}>
                        <h2 className={avai}>پلتفرم‌های شنیدن پادکست:</h2>
                        <div className={links}>
                            <a className={spotify} href={data.spotify} target="_blank" rel="noopener noreferrer"><FaSpotify className={platformIcon} />اسپاتیفای</a>
                            <a className={applePod} href={data.apple} target="_blank" rel="noopener noreferrer"><FaPodcast className={platformIcon} />اپل</a>
                            <a className={soundCloud} href={data.soundcloud} target="_blank" rel="noopener noreferrer"><FaSoundcloud className={platformIcon} />ساندکلاد</a>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Podcast;