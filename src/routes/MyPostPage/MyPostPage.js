import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import tz from "moment-timezone";
import CommUnityContext from "../../contexts/context";
import UserDataService from "../../services/user-data-service";
import Task from "../../components/Task/Task"
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import { ButtonLight, ButtonDark } from "../../components/Utils/Utils";
import styles from "./MyPostPage.module.css";

class MyPostPage extends Component {
    static contextType = CommUnityContext;

    state = {
        loading: false,
    }
    
    findPost() {
        const postId = parseFloat(this.props.match.params.id);
        const post = this.context.user_posts.find(post => post.id === postId)
        return post;
    }

    handleDelete(postId) {
        if (window.confirm("Are you sure you want to delete this post?")) {
            this.setState({ loading: true })
            UserDataService.deletePost(postId)
                .then(res => {
                    this.setState({ loading: false })
                    this.props.history.push("/home")
                    this.context.removePost(postId)
                })
        }
    }
    
    render() {
        const post = this.findPost()
        return (   
            <main className={styles.main}>
                {post && <>
                <div className={styles.map}>
                    <GoogleMap location={post.location} radius={parseFloat(post.radius)} displayMarker={true} />                
                </div>
                <div className={styles.postHeader}>
                    <div>
                        <h3>Your {post.post_type}</h3>
                        <p className={styles.date}>{moment(post.date_created).tz(this.context.timeZone).format('LLLL z')}</p>
                    </div>
                    {post.post_type === "request" && <span className={`${styles[post.urgency]} ${styles.urgency}`}><i className="fas fa-circle"></i> {post.urgency} urgency</span>}
                </div>
                <ul className={styles.tasks}>
                    {post.categories.map(task => <Task key={task} task={task} />)}
                </ul>
                {post.description && <p className={styles.description}>{post.description}</p>}
                <div className={styles.buttonSection}>
                    <ButtonLight type="button" onClick={() => this.props.history.push("/home")}>Back</ButtonLight>
                    <div className={styles.rightButtons}>
                        <ButtonLight className={styles.delete} onClick={() => this.handleDelete(post.id)} loading={this.state.loading.toString()}>Delete</ButtonLight>
                        <ButtonDark type="button" onClick={() => this.props.history.push(`/edit-post/${post.id}`)}>Edit</ButtonDark>
                    </div>
                </div>
                </>}
            </main>
        )
    }
}

export default withRouter(MyPostPage)