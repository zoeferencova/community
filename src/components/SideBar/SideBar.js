import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import MyPost from "../../components/MyPost/MyPost";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import MapErrorBoundary from "../../components/MapErrorBoundary/MapErrorBoundary";
import { ButtonDark, editIcon } from "../../components/Utils/Utils";
import styles from "./SideBar.module.css";

const SideBar = () => {
    const communityContext = useContext(CommUnityContext);

    const navigate = useNavigate();

    // Creates user posts by looping through user_posts array in context
    const makeUserPosts = () => communityContext.user_posts.map(post => <MyPost key={post.id} id={post.id} post_type={post.post_type} date_created={post.date_created} />)

    // Redirects user to request or offer form based on type argument
    const goToNewPost = type => navigate(`/new-post/${type}`);

    return (
        <div className={styles.sideBar}>
            <h2>Hey, {communityContext.user.first_name}!</h2>
            <MobileMenu />
            <div className={styles.newPostButtons}>
                <ButtonDark className={styles.requestButton} onClick={() => goToNewPost("request")}>New request</ButtonDark>
                <ButtonDark className={styles.newPostButton} onClick={() => goToNewPost("offer")}>New offer</ButtonDark>
            </div>
            <div className={styles.userInfo}>
                <div className={styles.yourPosts}>
                    <div className={styles.infoTitle}>
                        <h3>Your Posts</h3>
                    </div>
                    <div className={`${styles.infoBody}`}>
                        {communityContext.user_posts.length ? makeUserPosts() : "You do not have any posts"}
                    </div>
                </div>
                <div className={`${styles.mapSection}`}>
                    <div className={styles.infoTitle}>
                        <h3 className={styles.mapTitle}>Your Location</h3>
                        <Link to="/location" className={styles.mapSubLink}>{editIcon}Edit</Link>
                    </div>
                    <div className={`${styles.infoBody} ${styles.infoBodyMap}`}>
                        <MapErrorBoundary>
                            <GoogleMap sideBar className={styles.map} radius={+communityContext.user.radius} userLocation={communityContext.user.location} displayMarker={true} />
                        </MapErrorBoundary>
                        <p className={styles.mapSubtitle}>Results are being shown for this area.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SideBar;