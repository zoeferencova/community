import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { ButtonLight } from "../../components/Utils/Utils";
import MyPost from "../../components/MyPost/MyPost";
import Post from "../../components/Post/Post";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import MapErrorBoundary from "../../components/MapErrorBoundary/MapErrorBoundary";
import CommUnityContext from "../../contexts/context";
import styles from "./HomePage.module.css";

const HomePage = ({ loading }) => {
    const communityContext = useContext(CommUnityContext);

    const [showPosts, setShowPosts] = useState(false);
    const [showLocation, setShowLocation] = useState(false);

    const navigate = useNavigate();

    // Creates user posts by looping through user_posts array in context
    const makeUserPosts = () => communityContext.user_posts.map(post => <MyPost key={post.id} id={post.id} post_type={post.post_type} date_created={post.date_created} />)

    // Creates neighborhood posts by looping through neighborhood_posts array in context
    const makeAllPosts = () => communityContext.neighborhood_posts.map(post => <Post key={post.id} id={post.id} post_type={post.post_type} first_name={post.first_name} categories={post.categories} description={post.description} urgency={post.urgency} date_created={post.date_created} location={post.location} distance_from_user={post.distance_from_user} />)

    // Redirects user to request or offer form based on type argument
    const goToNewPost = type => navigate(`/new-post/${type}`);

    return (
        <main className={styles.main}>
            {!loading && <>
                <header className={styles.header}>
                    <div className={styles.userInfo}>
                        <h2>Welcome, {communityContext.user.first_name}!</h2>
                        <div className={styles.newPostButtons}>
                            <ButtonLight className={styles.requestButton} onClick={() => goToNewPost("request")}><i className={`fas fa-hand-paper ${styles.hand}`}></i> Request</ButtonLight>
                            <ButtonLight className={styles.newPostButton} onClick={() => goToNewPost("offer")}><i className={`fas fa-heart ${styles.heart}`}></i> Offer</ButtonLight>
                        </div>
                        <div className={styles.yourPosts}>
                            <div className={styles.infoTitle} onClick={() => setShowPosts(!showPosts)}>
                                <h3>Your Posts</h3>
                                <p className={`${styles.plus} ${!showPosts && styles.unrotate} ${showPosts && styles.rotate}`}>+</p>
                            </div>
                            <div className={`${styles.infoBody} ${!showPosts && styles.hide}`}>
                                {communityContext.user_posts.length ? makeUserPosts() : "You do not have any posts"}
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.mapSection}`}>
                        <div className={styles.infoTitle} onClick={() => setShowLocation(!showLocation)}>
                            <h3 className={styles.mapTitle}>Your Location</h3>
                            <p className={`${styles.plus} ${!showLocation && styles.unrotate} ${showLocation && styles.rotate}`}>+</p>
                        </div>
                        <div className={`${styles.infoBody} ${styles.infoBodyMap} ${!showLocation && styles.hide}`}>
                            <MapErrorBoundary>
                                <GoogleMap className={styles.map} radius={+communityContext.user.radius} userLocation={communityContext.user.location} displayMarker={true} />
                            </MapErrorBoundary>
                            <p className={styles.mapSubtitle}>Results are being shown for this area. <Link to="/location" className={styles.mapSubLink}>Change location?</Link></p>
                        </div>
                    </div>
                </header>
                <section className={styles.feed}>
                    {communityContext.neighborhood_posts.length ? <div className={styles.feedHeader}>
                        <h3>There are {communityContext.neighborhood_posts.length} posts in your area</h3>
                    </div> : ""}
                    {makeAllPosts()}
                    {!communityContext.neighborhood_posts.length &&
                        <div className={styles.noPosts}>
                            <img src={require("../../images/neighborhood.png")} alt="neighborhood" className={styles.noPostImage}></img>
                            <p>There are no posts in your area.<br></br><span className={styles.noPostTip}>Try <Link to="/location">increasing your radius</Link> to see more posts.</span></p>
                        </div>
                    }
                </section>
            </>}
        </main>
    )
}

export default HomePage;

HomePage.propTypes = {
    loading: PropTypes.bool
}