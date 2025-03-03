import Link from 'next/link';
import styles from '../styles/Card.module.scss'
import Image from 'next/image';
import { FaBoxOpen } from "react-icons/fa6";

const ShopCard = (
    {
        title,
        slug,
        price,
        imageurl
    }:
    {
        title: string
        slug: string
        price: number
        imageurl: string
    }
) => {

    const {card, cardPhoto, cardContent, cardTitle, cardPrice, goToProduct, icon} = styles;

    return (
        <Link href={`/shop/${slug}`} className={card}>
            <div className={cardPhoto}>
                <Image src={imageurl} alt="Product Image" width={240} height={240} />
            </div>
            <div className={cardContent}>
                <h2 className={cardTitle}>{title}</h2>
                <span className={goToProduct}>
                    <FaBoxOpen className={icon} /> مشاهده محصول
                </span>
                <span className={cardPrice}>
                    {price.toLocaleString('fa-IR')} تومان
                </span>
            </div>
        </Link>
    );
};

export default ShopCard;
