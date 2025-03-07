import styles from '../../../styles/Article.module.scss';
import { FaMoon } from "react-icons/fa6";
import supabase from '@/supabase';
import { FaArrowCircleUp } from "react-icons/fa";
import { revalidateTag } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
import { FaRegTrashAlt } from "react-icons/fa";
import type { Metadata } from "next";
import { Suspense } from 'react';
import Loading from '@/app/loading';
import SubmitButton from '@/components/SubmitButton';
import { GoDotFill } from 'react-icons/go';

export const metadata: Metadata = {
  title: "سینگل پست | طبیعی باش",
};

interface Comment{
    id: number
    postslug: string
    userAvatar: string
    username: string
    body: string
    time: string
    date: string
    created_at: string
}

const Article = async ({params}: {params: Promise<{slug: string}>}) => {

    const { slug } = await params;

    const { data: blogpost } = await supabase.from('posts').select('*').eq('slug', slug).single()
    
    const { data: blogcomments } = await supabase.from('comments').select('*').eq('postslug', slug)

    const d = new Date(blogpost.created_at)

    const formattedDate = d.toLocaleString('fa-IR', {year: 'numeric', month: 'short', day: 'numeric'});

    const GetDate = (data: string) => {
        const date = new Date(data)
        const finalDate = date.toLocaleString('fa-IR', {year: 'numeric', month: 'long', day: 'numeric'});
        return finalDate
    }

    const GetTime = (data: string) => {
        const time = new Date(data)
        const finalTime = time.toLocaleString('fa-IR', {hour: '2-digit', minute: '2-digit'});
        return finalTime
    }

    const userObj = await currentUser()

    const addComment = async (formData: FormData) => {
        'use server'

        const newComment = {
            postslug: slug,
            username: userObj?.username,
            userAvatar: userObj?.imageUrl,
            body: formData.get('cBody'),
        }

        if(newComment.body) {
            
            await supabase.from('comments').insert([newComment]).single()

            revalidateTag('comments')
        }
    }

    const deleteComment = async (formData: FormData) => {
        'use server'

        const id = formData.get('id')
        
        await supabase.from('comments').delete().eq('id', id)

        revalidateTag('comments')
    }

    const {wrapper, info, album, description, statick, post, postParagraph, textInput, commentContainer, commentTime, mycommentTime, mycommentUserName, commentWrapper, mycommentWrapper, commentParagraph, moon, commentInput, cBezar, cBezarOut, commentSection, mycommentContainer, mycommentParagraph, mycommentSection, mymoon} = styles;
    
    return (
        <Suspense fallback={<Loading />}>
            <div className={wrapper}>
                <div className={info}>
                    <h2 className={album}>{blogpost.title}</h2>
                    <div className={description}>
                        <span>
                            <span className={statick}>دسته‌بندی:</span>
                            {blogpost.tags}
                        </span>
                        <span>
                            <span className={statick}>تاریخ انتشار:</span>
                            {formattedDate}
                        </span>
                        <span>
                            <span className={statick}>نویسنده:</span>
                            {blogpost.author}
                        </span>
                        <span>
                            <span className={statick}>کامنت‌ها:</span>
                            {blogcomments?.length.toLocaleString('fa-IR')}
                        </span>
                    </div>
                    <div className={post}>
                        <p className={postParagraph}>{blogpost.body}</p>
                    </div>
                </div>
                
                {blogcomments!.map((comment: Comment) => comment ? (userObj?.username === comment.username) ?
                    <div className={mycommentWrapper} key={comment.id}>
                        <div className={mycommentContainer}>
                            {userObj?.imageUrl ? <Image src={userObj?.imageUrl} alt='Avatar' width={32} height={32} />
                            : <Image src='https://static-00.iconduck.com/assets.00/user-avatar-happy-icon-1023x1024-bve9uom6.png' alt='Avatar' width={32} height={32} />
                            }
                            <div className={mycommentSection}>
                                <div className={mycommentUserName}>
                                    <h2>{comment.username}</h2>
                                    <form action={deleteComment}>
                                        <input name='id' type="hidden" value={comment.id} />
                                        <SubmitButton classname='trash'><FaRegTrashAlt /></SubmitButton>
                                    </form>
                                </div>
                                <p className={mycommentParagraph}>{comment.body}</p>
                                <div className={mycommentTime}>
                                    <span>{GetDate(comment.created_at)}</span>
                                        <GoDotFill />
                                    <span>{GetTime(comment.created_at)}</span>
                                </div>
                                <FaMoon className={mymoon} />
                            </div>
                        </div>
                    </div> :
                        <div className={commentWrapper} key={comment.id}>
                            <div className={commentContainer}>
                                {comment.userAvatar ? <Image src={comment.userAvatar} alt='Avatar' width={32} height={32} />
                                : <Image src='https://static-00.iconduck.com/assets.00/user-avatar-happy-icon-1023x1024-bve9uom6.png' alt='Avatar' width={32} height={32} />
                                }
                                <div className={commentSection}>
                                    <h2>{comment.username}</h2>
                                    <p className={commentParagraph}>{comment.body}</p>
                                    <div className={commentTime}>
                                        <span>{GetTime(comment.created_at)}</span>
                                            <GoDotFill />
                                        <span>{GetDate(comment.created_at)}</span>
                                    </div>
                                    <FaMoon className={moon} />
                                </div>
                            </div>
                        </div> : ""
                    )}

                    <SignedIn>
                        <form action={addComment} className={commentInput}>
                            <h2 className={cBezar}>نظرت چیه؟ کامنت بذار</h2>
                            <textarea className={textInput} name="cBody" placeholder="به‌نظر من..."></textarea>
                            <SubmitButton classname='submit'><FaArrowCircleUp /> ارسال</SubmitButton>
                        </form>
                    </SignedIn>
                    <SignedOut>
                        <h2 className={cBezarOut}>برای ثبت «نظر» وارد حساب کاربری‌تون بشین</h2>
                    </SignedOut>
            </div>
            </Suspense>
    );
};

export default Article;