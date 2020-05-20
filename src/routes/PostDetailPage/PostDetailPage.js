import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
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
                <h3>Respond to {post.first_name}'s {post.type}.</h3>
                <h4>{post.first_name} needs help with:</h4>
                <ul className={styles.tasks}>
                    {post.categories.map(task => <Task key={task} task={task} />)}
                </ul>
                {post.type === "request" && <p>Urgency: {post.urgency}</p>}
                <div className={styles.map}>
                    <GoogleMap location={post.location} radius={post.radius} displayMarker={false} />
                </div>
                <label htmlFor="message">Write a message</label>
                <textarea className={styles.textarea} placeholder={`Hi ${post.first_name}...`}></textarea>
                <div>
                    <Link to="/home"><button>Cancel</button></Link>
                    <button type="submit">Send Message</button>
                </div>
            </main>
        )
    }
}

export default withRouter(PostDetailPage);