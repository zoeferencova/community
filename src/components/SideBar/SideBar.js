import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import MyPost from "../../components/MyPost/MyPost";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import MapErrorBoundary from "../../components/MapErrorBoundary/MapErrorBoundary";
import { ButtonDark, editIcon, plusIcon } from "../../components/Utils/Utils";
import styles from "./SideBar.module.css";

const SideBar = ({ loading }) => {
    const communityContext = useContext(CommUnityContext);

    const navigate = useNavigate();

    // Creates user posts by looping through user_posts array in context
    const makeUserPosts = () => communityContext.user_posts.map(post => <MyPost key={post.id} id={post.id} post_type={post.post_type} date_created={post.date_created} />)

    // Redirects user to request or offer form based on type argument
    const goToNewPost = type => navigate(`/new-post/${type}`);

    return (
        <div className={styles.sideBar}>
            {!loading && communityContext.user.location.lat && <>
                <div className={styles.topSection}>
                    <h2>Hey, {communityContext.user.first_name}!</h2>
                    <ButtonDark className={styles.mobilePostButton} onClick={() => goToNewPost("request")}>{plusIcon}</ButtonDark>
                </div>
                <MobileMenu />
                <div className={styles.newPostButtons}>
                    <ButtonDark className={styles.requestButton} onClick={() => goToNewPost("request")}>New request</ButtonDark>
                    <ButtonDark className={styles.newPostButton} onClick={() => goToNewPost("offer")}>New offer</ButtonDark>
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.yourPosts}>
                        <div className={styles.infoTitle}>
                            <h3>My Posts</h3>
                        </div>
                        <div className={`${styles.infoBody}`}>
                            {communityContext.user_posts.length ? makeUserPosts() : <span className={styles.noPosts}>No posts created</span>}
                        </div>
                    </div>
                    <div className={`${styles.mapSection}`}>
                        <div className={styles.infoTitle}>
                            <h3 className={styles.mapTitle}>My Location</h3>
                            <Link to="/location" className={styles.mapSubLink}>{editIcon}Edit</Link>
                        </div>
                        <div className={`${styles.infoBody} ${styles.infoBodyMap}`}>
                            <MapErrorBoundary>
                                <GoogleMap sideBar className={styles.map} radius={+communityContext.user.radius} userLocation={communityContext.user.location} displayMarker={true} />
                            </MapErrorBoundary>
                            <p className={styles.mapSubtitle}>Results are being shown for this area</p>
                        </div>
                    </div>
                </div>
            </>}
            {!loading && !communityContext.user.location.lat && <>
                <div className={styles.introSection}>
                    <h2>Hey, {communityContext.user.first_name}!</h2>
                    <p>Welcome to CommUnity. To get started, please set your location and radius. You will be able to receive offers from and see posts created by other users inside your radius.</p>
                    <p className={styles.note}>Note: Other users will see your radius but we will never share your exact location.</p>
                </div>
            </>}
        </div>
    )
}

export default SideBar;