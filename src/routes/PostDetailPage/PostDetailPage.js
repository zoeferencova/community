import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import Task from "../../components/Task/Task";

import styles from "./PostDetailPage.module.css";


class PostDetailPage extends Component {
    static contextType = CommUnityContext;
    
    findPost() {
        const postId = parseFloat(this.props.match.params.id);
        return this.context.posts.find(post => post.post_id === postId)
    }

    render() {
        const post = this.findPost();
        return (   
            <main className={styles.main}>
                <h3>Respond to {post.first_name}'s' {post.type}.</h3>
                <h4>{post.first_name} needs help with:</h4>
                <ul className={styles.tasks}>
                    {post.help_items.map(task => <Task task={task} />)}
                </ul>
                <div className={styles.map}>
                    <p>Placeholder for Google map showing user's location radius</p>
                </div>
                <label htmlFor="message">Write a message</label>
                <textarea className={styles.textarea} placeholder="Hi James..."></textarea>
                <div>
                    <Link to="/home"><button>Cancel</button></Link>
                    <button type="submit">Send Message</button>
                </div>
            </main>
        )
    }
}

export default withRouter(PostDetailPage);