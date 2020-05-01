import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyPost from "../../components/MyPost/MyPost";
import Post from "../../components/Post/Post";
import CommUnityContext from "../../contexts/context";
import styles from "./HomePage.module.css";

export default class HomePage extends Component {
    static contextType = CommUnityContext;

    makeUserPosts() {
        const userPosts = this.context.posts.filter(post => post.user_id === this.context.currentUser.user_id);
        return userPosts.map(post => <MyPost post_id={post.post_id} type={post.type} timestamp={post.timestamp} />)
    }

    makeAllPosts() {
        const notUserPosts = this.context.posts.filter(post => post.user_id !== this.context.currentUser.user_id);
        return notUserPosts.map(post => <Post post_id={post.post_id} type={post.type} first_name={post.first_name} help_items={post.help_items} description={post.description} urgency={post.urgency} timestamp={post.timestamp} location={post.location} />)
    }
    
    render() {
        return (   
            <main>
                <header className={styles.header}>
                    <div className={styles.userInfo}>
                        <h2>Welcome, {this.context.currentUser.first_name}!</h2>
                        <div>
                            <h3>Your Posts</h3>
                            {this.makeUserPosts()}
                        </div>
                    </div>
                    <div className={styles.mapSection}>
                        <div className={styles.map}>
                            <p>Placeholder for Google map showing current location</p>
                        </div>
                        <span>Results are being shown for this area. <Link to="/location">Change location?</Link></span>
                    </div>
                </header>
                <section className={styles.feed}>
                    <h2>Posts in your area</h2>
                    {this.makeAllPosts()}
                </section>
            </main>
        )
    }
}