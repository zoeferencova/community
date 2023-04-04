import React from 'react';
import Select from "react-select";
import styles from './Utils.module.css';

export function ButtonLight({ className, ...props }) {
    return <button className={`${styles.button} ${className !== undefined ? className : ""}`} {...props}>{props.loading === "true" ? <i className={`fa fa-spinner fa-spin ${styles.spinner}`}></i> : props.children}</button>
}

export function ButtonDark({ className, ...props }) {
    return <button className={`${styles.buttonDark} ${className !== undefined ? className : ""}`} {...props}>{props.loading === "true" ? <span>loading</span> : props.children}</button>
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

// export function Select({ className, ...props }) {
//     return <select className={`${styles.input} ${className !== undefined ? className : ""}`} {...props} />
// }

// Assigns a color to the profile picture based on the first letter of the user's name
export function ProfilePicture({ className, ...props }) {
    let color;
    const colorOptions = ["red", "indigo", "green", "teal", "blue", "purple"]
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const firstLetter = props.first_name.slice(0, 1);
    const letterIndex = letters.indexOf(firstLetter.toLowerCase());
    color = colorOptions[Math.floor(letterIndex / colorOptions.length)]
    return <div className={`${styles.circle} ${color} ${className !== undefined ? className : ""}`} {...props}>{firstLetter.toUpperCase()}</div>
}

export function Error({ className, ...props }) {
    return <div role="alert" className={`${styles.error} ${className !== undefined ? className : ""}`} {...props}><i className="fas fa-exclamation-circle"></i>{typeof (props.message) === 'string' ? props.message : props.message.name}</div>
}

export function Success({ className, ...props }) {
    return <div role="alert" className={`${styles.success} ${className !== undefined ? className : ""}`} {...props}><i className="fas fa-check-circle"></i>{props.message}</div>
}

export function CategoryMultiSelect({ className, ...props }) {
    const categoryOptions = [
        { value: 1, label: 'Picking up supplies', color: '#004d00', backgroundColor: '#e4f0e4' },
        { value: 2, label: 'Running errands', color: '#164d4d', backgroundColor: '#e4f2f2' },
        { value: 3, label: 'Phone call', color: '#130840', backgroundColor: '#f2f0fa' },
        { value: 4, label: 'Online chat', color: '#5e0202', backgroundColor: '#f5e6e6' },
        { value: 5, label: 'Dog walking', color: '#404040', backgroundColor: '#faf9e6' },
        { value: 6, label: 'Other', color: '#404040', backgroundColor: '#fcf5e8' },
    ]

    const categoryStyles = {
        multiValue: (styles, { data }) => {
            return {
                ...styles,
                backgroundColor: data.backgroundColor,
                color: data.color
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                opacity: 0.4,
                color: 'white',
                cursor: 'pointer',

            },
        }),
    };

    const getDefaultValues = props.defaultValue && categoryOptions.filter(option => props.defaultValue.includes(option.label))

    return <Select name="categories" isMulti options={categoryOptions} styles={categoryStyles} defaultValue={getDefaultValues} className={`basic-multi-select ${props.error && styles.errorCell}`} />
}

export function UrgencySelect({ className, ...props }) {
    const urgencyOptions = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
    ]

    const getDefaultValue = urgencyOptions.find(opt => opt.value === props.defaultValue)

    return <Select name="urgency" options={urgencyOptions} defaultValue={getDefaultValue} required className={`basic-single ${props.error && styles.errorCell}`} />
}

