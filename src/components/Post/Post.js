import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import { ButtonLight, ProfilePicture } from "../Utils/Utils";
import Task from "../Task/Task";
import UserDataService from "../../services/user-data-service";
import styles from "./Post.module.css";

const Post = ({ first_name, post_type, distance_from_user, categories, description, id }) => {
    const communityContext = useContext(CommUnityContext);

    const navigate = useNavigate();

    return (
        <div className={styles.post}>
            <div className={styles.details}>
                <div>
                    <div className={styles.postHeader}>
                        <div className={styles.nameSection}>
                            <ProfilePicture first_name={first_name} user_name={communityContext.user.first_name} />
                            <h4>{first_name} {post_type === "offer" ? "offered to help" : "requested help"}</h4>
                        </div>
                        <div>
                            <span>{post_type === "offer" ? <i className={`fas fa-heart ${styles.heart}`}></i> : <i className={`fas fa-hand-paper ${styles.hand}`}></i>}</span>
                            <span className={styles.distance}>{UserDataService.metersToMiles(distance_from_user) + " mi"}</span>
                        </div>
                    </div>
                    <ul className={styles.helpItems}>
                        {categories.map(task => <Task key={task} task={task} />)}
                    </ul>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
            <ButtonLight type="button" onClick={() => navigate(`/post/${id}`)} className={styles.buttonLink}>{post_type === "offer" ? "Accept offer" : "Offer to help"}</ButtonLight>
        </div>
    )
}

export default Post;

Post.propTypes = {
    first_name: PropTypes.string,
    post_type: PropTypes.string,
    distance_from_user: PropTypes.string,
    categories: PropTypes.array,
    description: PropTypes.string,
    id: PropTypes.number
}