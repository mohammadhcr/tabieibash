import Link from 'next/link';
import styles from '../styles/Card2.module.scss'
import { FaPlay } from "react-icons/fa6";

const HamsedaCard = ({ slug, artwork, episodeName, episodeNumber }: {slug: string, artwork: string, episodeName: string, episodeNumber: string}) => {

    const {card, cardContent, cardTitle, cardSubtitle, cardP, playIcon} = styles;

    return (
        <Link href={`/podcast/${slug}`}>
            <div className={card} style={{backgroundImage: `url(${artwork})`}}>
                <div className={cardContent}>
                    <h2 className={cardTitle}>{episodeName}</h2>
                    <p className={cardSubtitle}>{episodeNumber}</p>
                </div>
                <div className={cardP}>
                    <span>
                        <FaPlay className={playIcon} />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default HamsedaCard;