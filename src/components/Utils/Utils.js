import React from 'react';
import styles from './Utils.module.css';

export function ButtonLight({ className, ...props }) {
    return <button className={`${styles.button} ${className}`} {...props} />
}

export function ButtonDark({ className, ...props }) {
    return <button className={`${styles.buttonDark} ${className}`} {...props} />
}

export function Input({ className, ...props }) {
    return <input className={`${styles.input} ${className}`} {...props} />
}

export function Textarea({ className, ...props }) {
    return <textarea className={`${styles.textarea} ${className}`} {...props} />
}

export function Select({ className, ...props }) {
    return <select className={`${styles.select} ${className}`} {...props} />
}

export function ProfilePicture({ className, ...props }) {
    let color;
    const colorOptions = ["red", "indigo", "purple", "green", "teal"]
    const index = Math.floor(Math.random() * 5);
    props.first_name === props.user_name ? color = "blue" : color = colorOptions[index]
    return <div className={`${styles.circle} ${color} ${className}`} {...props}>{props.first_name.slice(0, 1)}</div>
}