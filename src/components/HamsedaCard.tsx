import Link from 'next/link';
import styles from '../styles/Card2.module.scss'
import { FaPlay } from "react-icons/fa6";

const HamsedaCard = ({ slug, artwork, artist, title }: {slug: string, artwork: string, artist: string, title: string}) => {

    const {card, cardContent, cardTitle, cardSubtitle, cardP, playIcon} = styles;

    return (
        <Link href={`/albums/${slug}`}>
            <div className={card} style={{backgroundImage: `url(${artwork})`}}>
                <div className={cardContent}>
                    <h2 className={cardTitle}>{title}</h2>
                    <p className={cardSubtitle}>{artist}</p>
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