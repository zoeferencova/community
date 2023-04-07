import React, { useContext } from "react";
import CommUnityContext from "../../contexts/context";
import MyPost from "../../components/MyPost/MyPost";

import styles from "./MyPostListPage.module.css";

const MyPostListPage = () => {
    const communityContext = useContext(CommUnityContext);

    return (
        <div className={styles.container}>
            {communityContext.user_posts.map(post => <div key={post.id} className={styles.wrapper}><MyPost id={post.id} post_type={post.post_type} date_created={post.date_created} /></div>)}
            {!communityContext.user_posts.length && <p className={styles.noPosts}>No posts created</p>}
        </div>

    )

}

export default MyPostListPage;