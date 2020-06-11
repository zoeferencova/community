import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyPost from "../../components/MyPost/MyPost";
import Post from "../../components/Post/Post";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import CommUnityContext from "../../contexts/context";
import styles from "./HomePage.module.css";

export default class HomePage extends Component {
    static contextType = CommUnityContext;

    makeUserPosts() {
        return this.context.user_posts.map(post => <MyPost key={post.id} id={post.id} post_type={post.post_type} date_created={post.date_created} />)
    }

    makeAllPosts() {
        return this.context.neighborhood_posts.map(post => <Post key={post.id} id={post.id} post_type={post.post_type} first_name={post.first_name} categories={post.categories} description={post.description} urgency={post.urgency} date_created={post.date_created} location={post.location} distance_from_user={post.distance_from_user} />)
    }
    
    render() {
        return (   
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.userInfo}>
                        <h2>Welcome, {this.context.user.first_name}!</h2>
                        <div>
                            <Link className={styles.newPostLink} to="/new-post/offer">Offer Help</Link>
                            <Link className={styles.newPostLink} to="/new-post/request">Request Help</Link>
                        </div>
                        <div className={styles.yourPosts}>
                            <h3>Your Posts</h3>
                            {this.context.user_posts.length ? this.makeUserPosts() : "You do not have any posts"}
                        </div>
                    </div>
                    <div className={styles.mapSection}>
                        <GoogleMap className={styles.map} radius={this.context.user.radius} location={this.context.user.location} displayMarker={true} />
                        <p className={styles.mapSubtitle}>Results are being shown for this area. <Link to="/location">Change location?</Link></p>
                    </div>
                </header>
                <section className={styles.feed}>
                    <h2>Posts in your area</h2>
                    {this.context.user.location ? this.makeAllPosts() : "Please save your current location to view posts in your area"}
                </section>
            </main>
        )
    }
}