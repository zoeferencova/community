import React from "react";
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

const Task = ({ task }) => <li className={`${styles.task} ${styles[classNames[task]]}`}>{task}</li>

Task.propTypes = {
    task: PropTypes.string
}

export default Task;