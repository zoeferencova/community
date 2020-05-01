import React, { Component } from "react";
import styles from "./Post.module.css";

export default class Post extends Component {
    render() {
        return (   
            <div className={styles.post}>
                <div className={styles.details}>
                    <div>
                        <h4>{this.props.first_name} {this.props.type === "offer" ? "offered to help" : "requested help"}</h4>
                        <ul className={styles.helpItems}>
                            {this.props.help_items.map(task => <li>{task}</li>)}
                        </ul>
                        <p>{this.props.description}</p>
                    </div>
                    <span>{this.props.location}</span>
                </div>
                <button className={styles.button}>{this.props.type === "offer" ? "Accept offer" : "Offer to help"}</button>
            </div>        
        )
    }
}




