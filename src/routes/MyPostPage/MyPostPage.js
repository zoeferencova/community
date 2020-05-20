import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import CommUnityContext from "../../contexts/context";
import UserDataService from "../../services/user-data-service";
import Task from "../../components/Task/Task"
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import styles from "./MyPostPage.module.css";

class MyPostPage extends Component {
    static contextType = CommUnityContext;

    // state = {

    // }

    // componentDidMount() {
    //     this.findPost()
    // }
    
    findPost() {
        const postId = parseFloat(this.props.match.params.id);
        const post = this.context.user_posts.find(post => post.id === postId)
        return post;
        // this.setState({ post })
    }

    handleDelete(postId) {
        if (window.confirm("Are you sure you want to delete this post?")) {
            UserDataService.deletePost(postId)
                .then(res => {
                    this.props.history.push("/home")
                    this.context.removePost(postId)
                })
        }
    }
    
    render() {
        const post = this.findPost()
        return (   
            <main className={styles.main}>
                {/* {this.state.post && 
                <> */}
                <h3>Your {post.post_type}</h3>
                <span>You posted on {moment(post.date_created).format('LLLL')}</span>
                <h4>{post.post_type === "offer" ? "Offering to" : "Requesting"} help with:</h4>
                <ul className={styles.tasks}>
                    {post.categories.map(task => <Task key={task} task={task} />)}
                </ul>
                {post.post_type === "request" && <p>Urgency: {post.urgency}</p>}
                <h4>Location</h4>
                <div className={styles.map}>
                    <GoogleMap location={post.location} radius={post.radius} displayMarker={true} />                
                </div>
                <div>
                    <Link to="/home"><button>Back</button></Link>
                    <button onClick={() => this.handleDelete(post.id)}>Delete</button>
                    <Link to={`/edit-post/${post.id}`}><button>Edit</button></Link>
                </div>
                {/* </>} */}
            </main>
        )
    }
}

export default withRouter(MyPostPage)