import supabase from '@/supabase';
import ArticleCard from '../../components/ArticleCard';
import Footer from '../../components/Footer';
import styles from '../../styles/BlogItems.module.scss';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "بـلاگ | طبیعی باش",
};

interface Article {
    id: number
    title: string
    author: string
    body: string
    tags: string[]
    slug: string
    likes: number
    comments: number
}

const Articles = async () => {

    const { data } = await supabase.from('posts').select('*')

    const {itemContainer, itemText, itemTitle, cards} = styles;

    return (
        <>
            <div className={itemContainer}>
                <div>
                    <h2 className={itemTitle}>بلاگ</h2>
                    <p className={itemText}>مقالات، نقد و بررسی و خواندنی‌ها</p>
                </div>
                <div className={cards}>
                    {data!.map((article: Article) => <ArticleCard {...article} key={article.id} />)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Articles;