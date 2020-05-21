import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import Task from "../../components/Task/Task";
import GoogleMap from "../../components/GoogleMap/GoogleMap";

import styles from "./PostDetailPage.module.css";


class PostDetailPage extends Component {
    static contextType = CommUnityContext;
    
    findPost() {
        const postId = parseFloat(this.props.match.params.id);
        return this.context.neighborhood_posts.find(post => post.id === postId)
    }

    render() {
        const post = this.findPost();
        return (   
            <main className={styles.main}>
                {post && <>
                <h3>Respond to {post.first_name}'s {post.post_type}.</h3>
                <h4>{post.first_name} {post.post_type === "request" ? "needs help with:" : "can help with:"}</h4>
                <ul className={styles.tasks}>
                    {post.categories.map(task => <Task key={task} task={task} />)}
                </ul>
                {post.post_type === "request" && <p>Urgency: {post.urgency}</p>}
                {post.description && <p>Description: {post.description}</p>}
                <div className={styles.map}>
                    <GoogleMap location={post.location} radius={post.radius} displayMarker={false} />
                </div>
                <label htmlFor="message">Write a message</label>
                <textarea className={styles.textarea} placeholder={`Hi ${post.first_name}...`}></textarea>
                <div>
                    <button type="button" onClick={() => this.props.history.goBack()}>Cancel</button>
                    <button type="submit">Send Message</button>
                </div>
                </>}
            </main>
        )
    }
}

export default withRouter(PostDetailPage);