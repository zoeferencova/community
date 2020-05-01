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
                            <option value="Picking up supplies">Picking up supplies</option>
                            <option value="Running errands">Running errands</option>
                            <option value="Phone call">Phone call</option>
                            <option value="Online chat">Online chat</option>
                            <option value="Walking a dog">Walking a dog</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    {type === "request" && <div>
                        <label className={styles.label} htmlFor="priority">Urgency</label>
                        <select className={styles.select} id="priority">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="Urgent">Urgent</option>
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