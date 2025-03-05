import styles from '../../styles/Cart.module.scss';
import { auth } from '@clerk/nextjs/server';
import supabase from '@/supabase';
import { BsCartX } from "react-icons/bs";
import type { Metadata } from "next";
import Image from 'next/image';
import { GoDotFill } from "react-icons/go";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { revalidateTag } from 'next/cache';
import { Suspense } from 'react';
import Loading from '../loading';
import SubmitButton from '@/components/SubmitButton';

export const metadata: Metadata = {
  title: "سبد خرید | طبیعی باش",
};

interface Item {
    id: number
    productimage: string
    producttitle: string
    productprice: number
    quantity: number
}

const Cart = async () => {

    const user = await auth()

    const { data: cartItems } = await supabase.from('cart').select('*').eq('user', user.userId)

    const plusQuantity = async (formData: FormData) => {
        'use server'

        const id = formData.get('plusid')
        const quantity = Number(formData.get("plusquantity"))
        await supabase.from('cart').update({ quantity: quantity + 1 }).eq('id', id).select()

        revalidateTag('cart')
    }

    const minusQuantity = async (formData: FormData) => {
        'use server'

        const id = formData.get('minusid')
        const quantity = Number(formData.get("minusquantity"))
        await supabase.from('cart').update({ quantity: quantity - 1 }).eq('id', id).select()

        revalidateTag('cart')
    }

    const deleteItem = async (formData: FormData) => {
        'use server'

        const id = formData.get('clearid')
        await supabase.from('cart').delete().eq('id', id)

        revalidateTag('cart')
    }

    const clearCart = async () => {
        'use server'

        const theUser = user.userId
        await supabase.from('cart').delete().eq('user', theUser)

        revalidateTag('cart')
    }
    
    const {cart, cartTitle, cartPrice, checkout, emptyCart, checkoutBTN, fPrice, quantityControl, dot, info, BTNs, emptyIcon, cartPhoto} = styles;

    return (
        <Suspense fallback={<Loading />}>
        <div className='userWrapper'>
            {cartItems?.length ? cartItems.map((item: Item) =>
                <div className={cart} key={item.id}>
                    <div className={cartPhoto}>
                        <Image src={item.productimage} fill style={{ objectFit: "cover" }} alt='Product Photo'></Image>
                    </div>
                    <div className={info}>
                        <h2 className={cartTitle}>{item.producttitle}</h2>
                        <h3 className={cartPrice}>{item.productprice.toLocaleString('fa-IR')} تومان <GoDotFill className={dot} /> {item.quantity?.toLocaleString('fa-IR')} عدد</h3>
                        <div className={quantityControl}>
                            <form action={plusQuantity}>
                                <input value={item.id} name='plusid' type="hidden" />
                                <input value={item.quantity} name='plusquantity' type="hidden" />
                                <SubmitButton classname='plusBtn'><FaPlus /></SubmitButton>
                            </form>
                            {item.quantity === 1
                            ?
                            <form action={deleteItem}>
                                <input value={item.id} name='clearid' type="hidden" />
                                <SubmitButton classname='clearBtn'><FaTrash /></SubmitButton>
                            </form>
                            :
                            <form action={minusQuantity}>
                                <input value={item.id} name='minusid' type="hidden" />
                                <input value={item.quantity} name='minusquantity' type="hidden" />
                                <SubmitButton classname='minusBtn'><FaMinus /></SubmitButton>
                            </form>
                            }
                        </div>
                    </div>
                    <span className={fPrice}>{(item.productprice * item.quantity).toLocaleString('fa-IR')} تومان</span>
                </div>
            )
                : <div className={emptyCart}><BsCartX className={emptyIcon} /><h2>سبد خریدت خالیه!</h2></div>
            }
                {cartItems?.length ?
                    <div className={checkout}>
                        <div className={BTNs}>
                            <button type='submit' className={checkoutBTN}>تسویه حساب</button>
                            <form action={clearCart}>
                                <SubmitButton classname='clearAll'>پاک کردن</SubmitButton>
                            </form>
                        </div>
                    </div>
                    : ""
                }
                
        </div>
        </Suspense>
    );
};

export default Cart;