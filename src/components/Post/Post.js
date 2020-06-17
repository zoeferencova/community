import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import { ButtonLight, ProfilePicture } from "../Utils/Utils";
import Task from "../Task/Task";
import UserDataService from "../../services/user-data-service";
import styles from "./Post.module.css";

class Post extends Component {
    static contextType = CommUnityContext;

    render() {
        return (   
            <div className={styles.post}>
                <div className={styles.details}>
                    <div>
                        <div className={styles.postHeader}>
                            <ProfilePicture first_name={this.props.first_name} user_name={this.context.user.first_name} />
                            <h4>{this.props.first_name} {this.props.post_type === "offer" ? "offered to help" : "requested help"}</h4>
                            {this.props.post_type === "request" && <span className={styles.urgency}>{this.props.urgency} urgency</span>}
                        </div>
                        <ul className={styles.helpItems}>
                            {this.props.categories.map(task => <Task key={task} task={task} />)}
                        </ul>
                        <p>{this.props.description}</p>
                    </div>
                    <div>
                        <span>{this.props.post_type === "offer" ? <i className={`fas fa-heart ${styles.heart}`}></i> : <i className={`fas fa-hand-paper ${styles.hand}`}></i>}</span>
                        <span className={styles.distance}>{UserDataService.metersToMiles(this.props.distance_from_user) + " mi"}</span>
                    </div>
                </div>
                <ButtonLight type="button" onClick={() => this.props.history.push(`/post/${this.props.id}`)} className={styles.buttonLink}>{this.props.post_type === "offer" ? "Accept offer" : "Offer to help"}</ButtonLight>
            </div>        
        )
    }
}

export default withRouter(Post);




