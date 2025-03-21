import styles from "../../../styles/Article.module.scss";
import { FaMoon } from "react-icons/fa6";
import supabase from "@/supabase";
import {
    FaArrowCircleUp,
    FaRegTrashAlt,
    FaRegComment,
    FaRegHeart,
} from "react-icons/fa";
import { revalidateTag } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import type { Metadata } from "next";
import SubmitButton from "@/components/SubmitButton";
import { GoDotFill } from "react-icons/go";
import { FcLike } from "react-icons/fc";

export const metadata: Metadata = {
    title: "سینگل پست | طبیعی باش",
};

interface Comment {
    id: number;
    user_id: string;
    user_avatar: string;
    username: string;
    body: string;
    time: string;
    date: string;
    created_at: string;
}

const Article = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const userObj = await currentUser();

    const { data: blogpost } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

    const { data: blogcomments } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", blogpost.id);

    const { data: bloglikes } = await supabase
        .from("likes")
        .select("*")
        .eq("pid", blogpost.id);

    const { data: userlike } = await supabase
        .from("likes")
        .select("*")
        .eq("pid", blogpost.id)
        .eq("uid", userObj?.id);

    const d = new Date(blogpost.created_at);

    const formattedDate = d.toLocaleString("fa-IR", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const GetDate = (data: string) => {
        const date = new Date(data);
        const finalDate = date.toLocaleString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return finalDate;
    };

    const GetTime = (data: string) => {
        const time = new Date(data);
        const finalTime = time.toLocaleString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
        });
        return finalTime;
    };

    const Like = async () => {
        "use server";

        const newLike = {
            uid: userObj?.id,
            pid: blogpost.id,
        };

        await supabase.from("likes").insert([newLike]).single();

        revalidateTag("likes");
    };

    const UnLike = async () => {
        "use server";

        await supabase
            .from("likes")
            .delete()
            .eq("pid", blogpost.id)
            .eq("uid", userObj?.id);

        revalidateTag("likes");
    };

    const addComment = async (formData: FormData) => {
        "use server";

        const newComment = {
            user_id: userObj?.id,
            post_id: blogpost.id,
            username: userObj?.username,
            user_avatar: userObj?.imageUrl,
            body: formData.get("cBody"),
        };

        if (newComment.body) {
            await supabase.from("comments").insert([newComment]).single();

            revalidateTag("comments");
        }
    };

    const deleteComment = async (formData: FormData) => {
        "use server";

        const id = formData.get("id");

        await supabase.from("comments").delete().eq("id", id);

        revalidateTag("comments");
    };

    const {
        wrapper,
        info,
        album,
        description,
        statick,
        post,
        postParagraph,
        textInput,
        likeIcon,
        upThere,
        downThere,
        commentIcon,
        commentContainer,
        commentTime,
        mycommentTime,
        mycommentUserName,
        commentWrapper,
        mycommentWrapper,
        commentParagraph,
        moon,
        commentInput,
        cBezar,
        cBezarOut,
        commentSection,
        mycommentContainer,
        mycommentParagraph,
        mycommentSection,
        mymoon,
    } = styles;

    return (
        <div className={wrapper}>
            <div className={info}>
                <h2 className={album}>{blogpost.title}</h2>
                <div className={description}>
                    <div className={upThere}>
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
                    </div>
                    <div className={downThere}>
                        <span className={likeIcon}>
                            {userObj?.id ? (
                                userlike?.length ? (
                                    <form action={UnLike}>
                                        <SubmitButton classname='redlike'>
                                            <FcLike />
                                        </SubmitButton>
                                    </form>
                                ) : (
                                    <form action={Like}>
                                        <SubmitButton classname='outlinelike'>
                                            <FaRegHeart />
                                        </SubmitButton>
                                    </form>
                                )
                            ) : (
                                <FaRegHeart />
                            )}
                            {bloglikes?.length.toLocaleString("fa-IR")}
                        </span>
                        <span className={commentIcon}>
                            <FaRegComment />
                            {blogcomments?.length.toLocaleString("fa-IR")}
                        </span>
                    </div>
                </div>
                <div className={post}>
                    <p className={postParagraph}>{blogpost.body}</p>
                </div>
            </div>

            {blogcomments!.map((comment: Comment) =>
                comment ? (
                    userObj?.id === comment.user_id ? (
                        <div className={mycommentWrapper} key={comment.id}>
                            <div className={mycommentContainer}>
                                {userObj?.imageUrl ? (
                                    <Image
                                        src={userObj?.imageUrl}
                                        alt='Avatar'
                                        width={32}
                                        height={32}
                                    />
                                ) : (
                                    <Image
                                        src='https://static-00.iconduck.com/assets.00/user-avatar-happy-icon-1023x1024-bve9uom6.png'
                                        alt='Avatar'
                                        width={32}
                                        height={32}
                                    />
                                )}
                                <div className={mycommentSection}>
                                    <div className={mycommentUserName}>
                                        <h2>
                                            {userObj.firstName ||
                                            userObj.lastName
                                                ? `${userObj.firstName} ${userObj.lastName}`
                                                : userObj.username}
                                        </h2>
                                        <form action={deleteComment}>
                                            <input
                                                name='id'
                                                type='hidden'
                                                value={comment.id}
                                            />
                                            <SubmitButton classname='trash'>
                                                <FaRegTrashAlt />
                                            </SubmitButton>
                                        </form>
                                    </div>
                                    <p className={mycommentParagraph}>
                                        {comment.body}
                                    </p>
                                    <div className={mycommentTime}>
                                        <span>
                                            {GetDate(comment.created_at)}
                                        </span>
                                        <GoDotFill />
                                        <span>
                                            {GetTime(comment.created_at)}
                                        </span>
                                    </div>
                                    <FaMoon className={mymoon} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={commentWrapper} key={comment.id}>
                            <div className={commentContainer}>
                                {comment.user_avatar ? (
                                    <Image
                                        src={comment.user_avatar}
                                        alt='Avatar'
                                        width={32}
                                        height={32}
                                    />
                                ) : (
                                    <Image
                                        src='https://static-00.iconduck.com/assets.00/user-avatar-happy-icon-1023x1024-bve9uom6.png'
                                        alt='Avatar'
                                        width={32}
                                        height={32}
                                    />
                                )}
                                <div className={commentSection}>
                                    <h2>{comment.username}</h2>
                                    <p className={commentParagraph}>
                                        {comment.body}
                                    </p>
                                    <div className={commentTime}>
                                        <span>
                                            {GetTime(comment.created_at)}
                                        </span>
                                        <GoDotFill />
                                        <span>
                                            {GetDate(comment.created_at)}
                                        </span>
                                    </div>
                                    <FaMoon className={moon} />
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    ""
                )
            )}

            <SignedIn>
                <form action={addComment} className={commentInput}>
                    <h2 className={cBezar}>نظرت چیه؟ کامنت بذار</h2>
                    <textarea
                        className={textInput}
                        name='cBody'
                        placeholder='به‌نظر من...'
                    ></textarea>
                    <SubmitButton classname='submit'>
                        <FaArrowCircleUp /> ارسال
                    </SubmitButton>
                </form>
            </SignedIn>
            <SignedOut>
                <h2 className={cBezarOut}>
                    برای ثبت «نظر» وارد حساب کاربری‌تون بشین
                </h2>
            </SignedOut>
        </div>
    );
};

export default Article;
