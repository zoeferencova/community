import React from 'react';
import Select from "react-select";
import styles from './Utils.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

export const messageIcon = <FontAwesomeIcon icon={icon({ name: 'comment' })} />
export const houseIcon = <FontAwesomeIcon icon={icon({ name: 'house' })} />
export const infoIcon = <FontAwesomeIcon icon={icon({ name: 'circle-info' })} />
export const xIcon = <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
export const chatBackIcon = <FontAwesomeIcon icon={icon({ name: 'chevron-left' })} />
export const backArrowIcon = <FontAwesomeIcon icon={icon({ name: 'arrow-left' })} />
export const keyIcon = <FontAwesomeIcon icon={icon({ name: 'key' })} />
export const locationIcon = <FontAwesomeIcon icon={icon({ name: 'location-dot' })} />
export const deactivateIcon = <FontAwesomeIcon icon={icon({ name: 'ban' })} />
export const editIcon = <FontAwesomeIcon icon={icon({ name: 'pen' })} />
export const circleIcon = <FontAwesomeIcon icon={icon({ name: 'circle' })} />
export const messageIconHollow = <FontAwesomeIcon icon={icon({ name: 'comment', style: 'regular' })} />
export const trashIcon = <FontAwesomeIcon icon={icon({ name: 'trash-can', style: 'regular' })} />
export const postIcon = <FontAwesomeIcon icon={icon({ name: 'file-lines', style: 'regular' })} />
export const plusIcon = <FontAwesomeIcon icon={icon({ name: 'plus' })} />
export const errorIcon = <FontAwesomeIcon icon={icon({ name: 'exclamation-circle' })} />
export const successIcon = <FontAwesomeIcon icon={icon({ name: 'check-circle' })} />
export const spinnerIcon = <FontAwesomeIcon icon={icon({ name: 'spinner' })} spin />
export const githubIcon = <FontAwesomeIcon icon={icon({ name: 'github', style: 'brands' })} />
export const linkedinIcon = <FontAwesomeIcon icon={icon({ name: 'linkedin', style: 'brands' })} />
export const requestIcon = <div className={`${styles.bgIcon} ${styles.greenIcon}`}><FontAwesomeIcon icon={icon({ name: 'question' })} ></FontAwesomeIcon></div>
export const offerIcon = <div className={`${styles.bgIcon} ${styles.pinkIcon}`}><FontAwesomeIcon icon={icon({ name: 'heart' })} /></div>
export const locationSquareIcon = <div className={`${styles.bgIcon} ${styles.purpleIcon}`}>{locationIcon}</div>
export const postSquareIcon = <div className={`${styles.bgIcon} ${styles.yellowIcon}`}>{postIcon}</div>
export const messageSquareIcon = <div className={`${styles.bgIcon} ${styles.blueIcon}`}>{messageIcon}</div>
export const lockSquareIcon = <div className={`${styles.bgIcon} ${styles.greenIcon}`}><FontAwesomeIcon icon={icon({ name: 'lock' })} /></div>
export const eyeSquareIcon = <div className={`${styles.bgIcon} ${styles.pinkIcon}`}><FontAwesomeIcon icon={icon({ name: 'eye' })} /></div>
export const mobileSquareIcon = <div className={`${styles.bgIcon} ${styles.purpleIcon}`}><FontAwesomeIcon icon={icon({ name: 'mobile' })} /></div>


export function ButtonLight({ className, ...props }) {
    return <button disabled={props.disabled} className={`${styles.button} ${props.large ? styles.large : undefined} ${className !== undefined ? className : ""}`} {...props}>{props.loading === "true" ? spinnerIcon : props.children}</button>
}

export function ButtonDark({ className, ...props }) {
    return <button disabled={props.disabled} className={`${styles.buttonDark} ${props.large ? styles.large : undefined} ${className !== undefined ? className : ""}`} {...props}>{props.loading === "true" ? spinnerIcon : props.children}</button>
}

export function PostActionButton({ className, ...props }) {
    return (<button className={styles.actionButton} onClick={props.onClick}>
        {props.action === "details" && <>{postIcon}<span>View details</span></>}
        {props.action === "chat" && <>{messageIconHollow}<span>Start conversation</span></>}
        {props.action === "delete" && <>{trashIcon}<span>Delete chat</span></>}
    </button>)
}

export function Input({ className, ...props }) {
    return <input required={props.required} defaultValue={props.defaultValue} className={`${styles.input} ${className !== undefined ? className : ""}`} {...props} />
}

export function Label({ className, ...props }) {
    return <label className={`${styles.label} ${className !== undefined ? className : ""}`} {...props} />
}

export function Textarea({ className, ...props }) {
    return <textarea className={`${styles.input} ${styles.textarea} ${className !== undefined ? className : ""}`} {...props} />
}

export function Container({ className, ...props }) {
    return <div style={props.style} className={`${styles.container} ${props.authForm ? styles.authContainer : undefined}`}>{props.children}</div>
}

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
    return <div role="alert" className={`${styles.error} ${className !== undefined ? className : ""}`} {...props}><i className="fas fa-exclamation-circle"></i>{typeof (props.message) === 'string' ? props.message : props.message}</div>
}

export function Success({ className, ...props }) {
    return <div role="alert" className={`${styles.success} ${className !== undefined ? className : ""}`} {...props}>{successIcon} {props.message}</div>
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
        option: (styles) => ({
            ...styles,
            cursor: 'pointer',
        }),
        control: (styles) => ({
            ...styles,
            cursor: 'pointer',
        }),
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

    return <Select name="categories" isMulti required placeholder="Select" options={categoryOptions} styles={categoryStyles} defaultValue={getDefaultValues} className={`basic-multi-select ${props.error && styles.errorCell} ${styles.customSelect}`} />
}

export function UrgencySelect({ className, ...props }) {
    const urgencyOptions = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
    ]

    const urgencyStyles = {
        option: (styles) => ({
            ...styles,
            cursor: 'pointer',
        }),
        control: (styles) => ({
            ...styles,
            cursor: 'pointer',
        }),
    };

    const getDefaultValue = urgencyOptions.find(opt => opt.value === props.defaultValue)

    return <Select name="urgency" options={urgencyOptions} placeholder="Select" styles={urgencyStyles} defaultValue={getDefaultValue} required className={`basic-single ${props.error && styles.errorCell} ${styles.customSelect}`} />
}

