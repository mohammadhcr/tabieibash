import Link from 'next/link';
import styles from '../styles/Card3.module.scss'
import { FaHashtag } from "react-icons/fa6";

const ArticleCard = (
    {
        title,
        body,
        tags,
        slug
    }:    
    {
        title: string
        body: string
        tags: string[]
        slug: string
    }    
) => {

    const desc = body.slice(0, 256) + '...'

    const {card, cardTitle, cardSubtitle, cardP, hashtag, readSection, datas} = styles;

    return (
        <Link href={`/blog/${slug}`}>
            <div className={card}>
                <h2 className={cardTitle}>{title}</h2>
                <h2 className={cardSubtitle}>{desc}</h2>
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
