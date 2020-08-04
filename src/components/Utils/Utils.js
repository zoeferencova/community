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

export function Label({ className, ...props }) {
    return <label className={`${styles.label} ${className}`} {...props} />
}

export function Textarea({ className, ...props }) {
    return <textarea className={`${styles.input} ${className}`} {...props} />
}

export function Select({ className, ...props }) {
    return <select className={`${styles.input} ${className}`} {...props} />
}

export function ProfilePicture({ className, ...props }) {
    let color;
    const colorOptions = ["red", "indigo", "purple", "green", "teal", "blue"]
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const firstLetter = props.first_name.slice(0, 1);
    const letterIndex = letters.indexOf(firstLetter.toLowerCase());
    color = colorOptions[Math.floor(letterIndex/colorOptions.length)]
    return <div className={`${styles.circle} ${color} ${className}`} {...props}>{firstLetter}</div>
}