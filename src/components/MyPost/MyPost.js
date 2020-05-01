import React, { Component } from "react";
import styles from "./MyPost.module.css";

export default class MyPost extends Component {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        return (   
            <p className={styles.userPost}>{this.capitalizeFirstLetter(this.props.type)} created {Date.now() - this.props.timestamp} hours ago</p>
        )
    }
}