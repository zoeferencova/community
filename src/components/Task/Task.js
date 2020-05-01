import React, { Component } from "react";
import styles from "./Task.module.css";

export default class Task extends Component {
    render() {
        return (   
            <li className={styles.task}>{this.props.task}</li>        
        )
    }
}




