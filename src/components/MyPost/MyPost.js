import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { DateTime } from "luxon";
import styles from "./MyPost.module.css";
import { offerIcon, requestIcon } from "../Utils/Utils";



const MyPost = ({ id, post_type, date_created }) => {
    // Capitalizes first letter of a string
    const capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Link className={styles.link} to={`/my-post/${id}`}>
            <p className={styles.userPost}>
                {post_type === "offer" ? offerIcon : requestIcon}
                {capitalizeFirstLetter(post_type)} created {DateTime.fromISO(date_created).toRelative()}
            </p>
        </Link>
    )
}

MyPost.propTypes = {
    id: PropTypes.number,
    post_type: PropTypes.string,
    date_created: PropTypes.string
}

export default MyPost;