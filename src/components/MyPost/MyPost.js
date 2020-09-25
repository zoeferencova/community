import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types';
import moment from "moment";
import styles from "./MyPost.module.css";

export default class MyPost extends Component {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        return (   
            <Link className={styles.link} to={`/my-post/${this.props.id}`}><p className={styles.userPost}>{this.props.post_type === "offer" ? <i className={`fas fa-heart ${styles.heart}`}></i> : <i className={`fas fa-hand-paper ${styles.hand}`}></i>} {this.capitalizeFirstLetter(this.props.post_type)} created {moment(this.props.date_created).fromNow()}</p></Link>
        )
    }
}

MyPost.propTypes = {
    id: PropTypes.number,
    post_type: PropTypes.string,
    date_created: PropTypes.string
}