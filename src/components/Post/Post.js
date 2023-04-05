import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import { offerIcon, requestIcon, ProfilePicture, PostActionButton } from "../Utils/Utils";
import Task from "../Task/Task";
import UserDataService from "../../services/user-data-service";
import styles from "./Post.module.css";

const Post = ({ first_name, post_type, distance_from_user, categories, description, id, user_id }) => {
    const communityContext = useContext(CommUnityContext);

    const navigate = useNavigate();

    return (
        <div className={styles.post}>
            <div className={styles.details}>
                <div>
                    <div className={styles.postHeader}>
                        <div className={styles.nameSection}>
                            <ProfilePicture first_name={first_name} user_name={communityContext.user.first_name} />
                            <h4><span className={styles.name}>{first_name}</span> {post_type === "offer" ? "offered to help" : "requested help"}</h4>
                        </div>
                        <div>
                            <span>{post_type === "offer" ? offerIcon : requestIcon}</span>
                            <span className={styles.distance}>{UserDataService.metersToMiles(distance_from_user) + " mi away"}</span>
                        </div>
                    </div>

                    <p className={styles.description}>{description}</p>
                    <ul className={styles.helpItems}>
                        {categories.map(task => <Task key={task} task={task} />)}
                    </ul>
                </div>
            </div>
            <div className={styles.actions}>
                <PostActionButton action="details" onClick={() => navigate(`/post/${id}`)} />
            </div>
        </div >
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