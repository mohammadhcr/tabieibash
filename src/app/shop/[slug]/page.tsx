import styles from "../../../styles/Product.module.scss";
import supabase from "@/supabase";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { Suspense } from "react";
import Loading from "@/app/loading";
import SubmitButton from "@/components/SubmitButton";

const Product = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const user = await auth();

    const { slug } = await params;

    const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

    const { data: existingItem } = await supabase
        .from("cart")
        .select("*")
        .eq("user", user.userId)
        .eq("product_id", product.id)
        .single();

    const addAction = async () => {
        "use server";

        const newCartItem = {
            user: user.userId,
            product_id: product.id,
            productimage: product?.imageurl,
            producttitle: product?.title,
            productprice: product?.price,
            quantity: 1,
        };

        await supabase.from("cart").insert([newCartItem]).single();

        revalidateTag("cart");
    };

    const {
        wrapper,
        info,
        price,
        photo,
        shopOut,
        section,
        title,
        category,
        prePrice,
        productDesc,
        buySection,
        existed,
    } = styles;

    return (
        <Suspense fallback={<Loading />}>
            <div className={wrapper}>
                <div className={photo}>
                    <Image
                        src={product.imageurl}
                        alt='Product Image'
                        width={1080}
                        height={1080}
                    />
                </div>
                <div className={section}>
                    <div className={info}>
                        <h2 className={title}>{product.title}</h2>
                        <h3 className={category}>{product.category}</h3>
                        <p className={productDesc}>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
                            متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                            است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                            متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
                            زیادی در شصت و سه درصد گذشته حال و آینده شناخت
                            فراوان جامعه و متخصصان را می طلبد{" "}
                        </p>
                    </div>
                    <div className={buySection}>
                        <span className={price}>
                            <span className={prePrice}>قیمت:</span>{" "}
                            {product.price.toLocaleString("fa-IR")} تومان
                        </span>
                        <SignedIn>
                            {existingItem ? (
                                <div className={existed}>
                                    <FaCheck /> به سبد خرید اضافه شد!
                                </div>
                            ) : (
                                <form action={addAction}>
                                    <SubmitButton classname='cartSubmit'>
                                        <FaPlus />
                                        افزودن به سبد خرید
                                    </SubmitButton>
                                </form>
                            )}
                        </SignedIn>
                    </div>
                    <SignedOut>
                        <h2 className={shopOut}>
                            برای «خرید» محصول وارد حساب کاربری‌تون بشین
                        </h2>
                    </SignedOut>
                </div>
            </div>
        </Suspense>
    );
};

export default Product;
