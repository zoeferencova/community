import React, { Component } from "react";
import { PropTypes } from 'prop-types';

import styles from "./Task.module.css";

const classNames = {
    "Running errands": "errands",
    "Picking up supplies": "supplies",
    "Phone call": "call",
    "Online chat": "chat",
    "Dog walking": "dog",
    "Other": "other"
}

export default class Task extends Component {
    render() {
        return (   
            <li className={`${styles.task} ${styles[classNames[this.props.task]]}`}>{this.props.task}</li>        
        )
    }
}

Task.propTypes = {
    task: PropTypes.string
}