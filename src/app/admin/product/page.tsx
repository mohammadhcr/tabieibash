'use client'

import styles from '../../../styles/Dashboard.module.scss';
import supabase from '@/supabase';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

const ProductAdmin = () => {

    const [productTitle, setProductTitle] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productSlug, setProductSlug] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    const fileExt = imageFile!.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${fileName}`;

    await supabase.storage.from("products").upload(filePath, imageFile!);

    const { data: publicUrlData } = supabase.storage.from("products").getPublicUrl(filePath);
    const imageUrl = publicUrlData.publicUrl;

    const newProduct = {
        title: productTitle,
        category: productCategory,
        price: productPrice,
        slug: productSlug,
        imageurl: imageUrl
    }

    await supabase.from("products").insert([newProduct]);

    setProductTitle("")
    setProductCategory("")
    setProductPrice("")
    setProductSlug("")
    setImageFile(null)

    }

    const {commentInput, input, submit, cBezar, wrapper, fileInput, btnLoader} = styles;

  return (
    <div className={wrapper}>
        <form className={commentInput}>
            <h2 className={cBezar}>ایجاد محصول جدید</h2>

            <label>عنوان</label>
            <input className={input} placeholder='گوشی موبایل iPhone SE 2022' type="text" value={productTitle} onChange={e => setProductTitle(e.target.value)} />

            <label>دسته‌بندی</label>
            <input className={input} placeholder='گوشی موبایل، اپل' type="text" value={productCategory} onChange={e => setProductCategory(e.target.value)} />

            <label>قیمت</label>
            <input className={input} placeholder='۱۶,۵۰۰,۰۰۰' type="text" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
            
            <label>لینک</label>
            <input className={input} placeholder='apple-iphone-se-2022' type="text" value={productSlug} onChange={e => setProductSlug(e.target.value)} />

            <label>عکس محصول</label>
            <input className={fileInput} type='file' onChange={(e) => setImageFile(e.target.files?.[0] || null)} />

            <button className={submit} onClick={addProduct}>
              <FaPlus />
              {loading ? <span className={btnLoader}></span> : "اضافه کردن"}
            </button>
        </form>
    </div>
  )
}

export default ProductAdmin