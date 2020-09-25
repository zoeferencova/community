import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
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
                            <div className={styles.nameSection}>
                                <ProfilePicture first_name={this.props.first_name} user_name={this.context.user.first_name} />
                                <h4>{this.props.first_name} {this.props.post_type === "offer" ? "offered to help" : "requested help"}</h4>
                            </div>
                            <div>
                                <span>{this.props.post_type === "offer" ? <i className={`fas fa-heart ${styles.heart}`}></i> : <i className={`fas fa-hand-paper ${styles.hand}`}></i>}</span>
                                <span className={styles.distance}>{UserDataService.metersToMiles(this.props.distance_from_user) + " mi"}</span>
                            </div>
                        </div>
                        <ul className={styles.helpItems}>
                            {this.props.categories.map(task => <Task key={task} task={task} />)}
                        </ul>
                        <p className={styles.description}>{this.props.description}</p>
                    </div>
                </div>
                <ButtonLight type="button" onClick={() => this.props.history.push(`/post/${this.props.id}`)} className={styles.buttonLink}>{this.props.post_type === "offer" ? "Accept offer" : "Offer to help"}</ButtonLight>
            </div>        
        )
    }
}

export default withRouter(Post);

Post.propTypes = {
    first_name: PropTypes.string,
    post_type: PropTypes.string,
    distance_from_user: PropTypes.string,
    categories: PropTypes.array,
    description: PropTypes.string,
    id: PropTypes.number
}