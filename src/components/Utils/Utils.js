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