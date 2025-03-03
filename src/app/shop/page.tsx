import { Metadata } from 'next';
import ShopCard from '../../components/ShopCard';
import Footer from '../../components/Footer';
import styles from '../../styles/Items.module.scss';
import supabase from '@/supabase';

export const metadata: Metadata = {
    title: "فروشگاه | طبیعی باش",
};

interface Products {
    id: number
    title: string
    slug: string
    category: string
    price: number
    imageurl: string
}

const Shop = async () => {

    const { data } = await supabase.from('products').select('*')

    const {itemContainer, itemText, itemTitle, cards} = styles;

    return (
        <>
            <div className={itemContainer}>
                <div>
                    <h2 className={itemTitle}>فروشگاه</h2>
                    <p className={itemText}>خرید محصولات و حمایت از ما</p>
                </div>
                <div className={cards}>
                    {data!.map((product: Products) => <ShopCard {...product} key={product.id} />)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Shop;