import React from 'react';
import styles from './Utils.module.css';

export function ButtonLight({ className, ...props }) {
    return <button className={`${styles.button} ${className !== undefined ? className : ""}`} {...props}>{props.loading === "true" ? <i className={`fa fa-spinner fa-spin ${styles.spinner}`}></i> : props.children}</button>
}

export function ButtonDark({ className, ...props }) {
    return <button className={`${styles.buttonDark} ${className !== undefined ? className : ""}`} {...props}>{props.loading === "true" ? <i className={`fa fa-spinner fa-spin ${styles.spinner}`}></i> : props.children}</button>
}

export function Input({ className, ...props }) {
    return <input className={`${styles.input} ${className !== undefined ? className : ""}`} {...props} />
}

export function Label({ className, ...props }) {
    return <label className={`${styles.label} ${className !== undefined ? className : ""}`} {...props} />
}

export function Textarea({ className, ...props }) {
    return <textarea className={`${styles.input} ${className !== undefined ? className : ""}`} {...props} />
}

export function Select({ className, ...props }) {
    return <select className={`${styles.input} ${className !== undefined ? className : ""}`} {...props} />
}

export function ProfilePicture({ className, ...props }) {
    let color;
    const colorOptions = ["red", "indigo", "green", "teal", "blue", "purple"]
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const firstLetter = props.first_name.slice(0, 1);
    const letterIndex = letters.indexOf(firstLetter.toLowerCase());
    color = colorOptions[Math.floor(letterIndex/colorOptions.length)]
    return <div className={`${styles.circle} ${color} ${className !== undefined ? className : ""}`} {...props}>{firstLetter.toUpperCase()}</div>
}

export function Error ({ className, ...props }) {
    return <div role="alert" className={`${styles.error} ${className !== undefined ? className : ""}`} {...props}><i className="fas fa-exclamation-circle"></i>{props.message}</div>
}

export function Success ({ className, ...props }) {
    return <div role="alert" className={`${styles.success} ${className !== undefined ? className : ""}`} {...props}><i className="fas fa-check-circle"></i>{props.message}</div>
}