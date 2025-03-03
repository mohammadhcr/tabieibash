import styles from '../../../styles/Article.module.scss';
import { IoIosSend } from "react-icons/io";
import supabase from '@/supabase';
import { currentUser } from '@clerk/nextjs/server';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ایجاد پست جدید | طبیعی باش",
};

const PostAdmin = async () => {

    const adminObj = await currentUser()

    const addPost = async (formData: FormData) => {
        'use server'

        const newPost = {
            title: formData.get('postTitle'),
            body: formData.get('postBody'),
            slug: formData.get('postSlug'),
            tags: formData.get('postTags'),
            author: adminObj?.username,
        }

        await supabase.from('posts').insert([newPost]).single()
    }

    const {commentInput, input, submit, cBezar, sendIcon, wrapper, textInput, slugInput} = styles;

  return (
    <div className={wrapper}>
        <form action={addPost} className={commentInput}>
            <h2 className={cBezar}>ایجاد پست جدید</h2>
            <label>عنوان</label>
            <input className={input} placeholder='سلام دنیا!' type="text" name="postTitle" />
            <label>لینک</label>
            <input className={`${input} ${slugInput}`} placeholder='hello-world' type="text" name="postSlug" />
            <label>تگ‌ها</label>
            <input className={input} placeholder='زن، زندگی، آزادی' type="text" name="postTags" />
            <label>متن اصلی پست</label>
            <textarea className={textInput} name="postBody" placeholder="لورم ایپسوم"></textarea>
            <button className={submit} type='submit'><IoIosSend className={sendIcon} />انتشار</button>
        </form>
    </div>
  )
}

export default PostAdmin