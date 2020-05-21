import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Task from "../Task/Task";
import UserDataService from "../../services/user-data-service";
import styles from "./Post.module.css";

class Post extends Component {
    render() {
        return (   
            <div className={styles.post}>
                <div className={styles.details}>
                    <div>
                        <h4>{this.props.first_name} {this.props.post_type === "offer" ? "offered to help" : "requested help"}</h4>
                        {this.props.post_type === "request" && <span className={styles.urgency}>{this.props.urgency} urgency</span>}
                        <ul className={styles.helpItems}>
                            {this.props.categories.map(task => <Task key={task} task={task} />)}
                        </ul>
                        <p>{this.props.description}</p>
                    </div>
                    <div>
                        <span>{UserDataService.metersToMiles(this.props.distance_from_user) + " mi"}</span>
                    </div>
                </div>
                <button type="button" onClick={() => this.props.history.push(`/post/${this.props.id}`)} className={styles.buttonLink}>{this.props.type === "offer" ? "Accept offer" : "Offer to help"}</button>
            </div>        
        )
    }
}

export default withRouter(Post);




