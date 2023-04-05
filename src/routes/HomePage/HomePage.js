import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types';
import Post from "../../components/Post/Post";
import CommUnityContext from "../../contexts/context";
import styles from "./HomePage.module.css";

const HomePage = ({ loading }) => {
    const communityContext = useContext(CommUnityContext);

    // Creates neighborhood posts by looping through neighborhood_posts array in context
    const makeAllPosts = () => communityContext.neighborhood_posts.map(post => <Post key={post.id} id={post.id} user_id={post.user_id} post_type={post.post_type} first_name={post.first_name} categories={post.categories} description={post.description} urgency={post.urgency} date_created={post.date_created} location={post.location} distance_from_user={post.distance_from_user} />)

    return (
        <main className={styles.main}>
            {!loading && <>
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