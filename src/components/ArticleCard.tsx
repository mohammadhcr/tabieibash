import Link from 'next/link';
import styles from '../styles/Card3.module.scss'
import { FaHashtag } from "react-icons/fa6";

const ArticleCard = (
    {
        title,
        body,
        tags,
        slug,
    }:    
    {
        title: string
        body: string
        tags: string[]
        slug: string
    }    
) => {

    const desc = body.slice(0, 236) + '...'

    const {card, cardTitle, cardSubtitle, cardP, hashtag, readSection, datas, cardContent} = styles;

    return (
        <Link href={`/blog/${slug}`}>
            <div className={card}>
                <div className={cardContent}>
                    <h2 className={cardTitle}>{title}</h2>
                    <p className={cardSubtitle}>{desc}</p>
                </div>
                <div className={datas}>
                    <span className={cardP}>
                        <FaHashtag className={hashtag} />
                        {tags}
                    </span>
                    <span className={readSection}>
                        ادامه مطلب...
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ArticleCard;
