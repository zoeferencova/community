import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import UserDataService from "../../services/user-data-service";
import Task from "../../components/Task/Task"
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import { ButtonLight, ButtonDark } from "../../components/Utils/Utils";
import styles from "./MyPostPage.module.css";
import { DateTime } from 'luxon';


const MyPostPage = () => {
    const communityContext = useContext(CommUnityContext);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams()

    // Finds post by post id value in url parameter
    const findPost = () => {
        const postId = parseFloat(id);
        const post = communityContext.user_posts.find(post => post.id === postId)
        return post;
    }

    // Displays alert confirming whether or not a user wants to delete the post
    // If confirmed, sends delete request to server to delete post and removes post in context, pushing user back to home page
    const handleDelete = postId => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            setLoading(true)
            UserDataService.deletePost(postId)
                .then(res => {
                    setLoading(false)
                    navigate("/home")
                    communityContext.removePost(postId)
                })
        }
    }

    const post = findPost()
    return (
        <main className={styles.main}>
            {post && <>
                <div className={styles.map}>
                    <GoogleMap userLocation={post.location} radius={parseFloat(post.radius)} displayMarker={true} />
                </div>
                <div className={styles.postHeader}>
                    <div>
                        <h3>Your {post.post_type}</h3>
                        <p className={styles.date}>{DateTime.fromISO(post.date_created, { zone: communityContext.timeZone }).toFormat('ffff')}</p>
                    </div>
                    {post.post_type === "request" && <span className={`${styles[post.urgency]} ${styles.urgency}`}><i className="fas fa-circle"></i> {post.urgency} urgency</span>}
                </div>
                <ul className={styles.tasks}>
                    {post.categories.map(task => <Task key={task} task={task} />)}
                </ul>
                {post.description && <p className={styles.description}>{post.description}</p>}
                <div className={styles.buttonSection}>
                    <ButtonLight type="button" onClick={() => navigate("/home")}>Back</ButtonLight>
                    <div className={styles.rightButtons}>
                        <ButtonLight className={styles.delete} onClick={() => handleDelete(post.id)} loading={loading.toString()}>Delete</ButtonLight>
                        <ButtonDark type="button" onClick={() => navigate(`/edit-post/${post.id}`)}>Edit</ButtonDark>
                    </div>
                </div>
            </>}
        </main>
    )
}

export default MyPostPage;