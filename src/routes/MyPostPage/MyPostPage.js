import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import Task from "../../components/Task/Task"
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import styles from "./MyPostPage.module.css";

export default class MyPostPage extends Component {
    static contextType = CommUnityContext;
    
    findPost() {
        const postId = parseFloat(this.props.match.params.id);
        return this.context.posts.find(post => post.post_id === postId)
    }
    
    render() {
        const post = this.findPost();

        return (   
            <main className={styles.main}>
                <h3>Your {post.type}</h3>
                <span>You posted on {post.timestamp}</span>
                <h4>{post.type === "offer" ? "Offering to" : "Requesting"} help with:</h4>
                <ul className={styles.tasks}>
                    {post.help_items.map(task => <Task key={task} task={task} />)}
                </ul>
                {post.type === "request" && <p>Urgency: {post.urgency}</p>}
                <h4>Location</h4>
                <div className={styles.map}>
                    <GoogleMap location={post.location} radius={post.radius} displayMarker={true} />                </div>
                <div>
                    <Link to="/home"><button>Back</button></Link>
                    <button>Delete</button>
                    <Link to={`/edit-post/${post.post_id}`}><button>Edit</button></Link>
                </div>
            </main>
        )
    }
}