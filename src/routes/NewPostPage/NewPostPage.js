import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./NewPostPage.module.css";

export default class NewPostPage extends Component {
    render() {
        const type = this.props.match.params.type;
        return (   
            <main>
                <h3>Create a new {type}</h3>
                <form className={styles.form}>
                    <div>
                        <label className={styles.label} htmlFor="help-categories">{type === "offer" ? "What can you help with?": "What do you need help with?"}</label>
                        <select className={styles.select} id="help-categories" multiple>
                            <option value="supplies">Picking up supplies</option>
                            <option value="errands">Running errands</option>
                            <option value="phone">Phone call</option>
                            <option value="chat">Online chat</option>
                            <option value="dog">Walking a dog</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    {type === "request" && <div>
                        <label className={styles.label} for="priority">Priority</label>
                        <select className={styles.select} id="priority">
                            <option value="supplies">Low</option>
                            <option value="errands">Medium</option>
                            <option value="phone">Urgent</option>
                        </select>
                    </div>}
                    <div>
                        <label className={styles.label} htmlFor="description">Description (optional)</label>
                        <textarea className={styles.textarea} name="description" id="description"></textarea>
                    </div>
                    <Link to="/home"><button>Cancel</button></Link>
                    <button type="submit">Submit</button>
                </form>
            </main>
        )
    }
}