import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import styles from "./NewPostPage.module.css";
import UserDataService from "../../services/user-data-service";

export default class NewPostPage extends Component {
    static contextType = CommUnityContext;
    
    handleSubmit(e) {
        e.preventDefault();

        const post_type = this.props.match.params.type;
        let category_ids = [], option;
        for (let i = 0; i < e.target.categories.length; i++) {
          option = e.target.categories[i];
    
          if (option.selected) {
            category_ids.push(i+1);
          }
        }
        
        const post = { post_type, category_ids }

        if (e.target.description.value) {
            post.description = e.target.description.value;
        }

        if (post_type === "request" && e.target.urgency.value) {
            post.urgency = (e.target.urgency.value).toLowerCase();
        }

        UserDataService.postPost(post)
            .then(post => {
                this.context.addNewPost(post)
                this.props.history.push("/home")
            })
    }
    
    render() {
        const type = this.props.match.params.type;
        return (   
            <main>
                <h3>Create a new {type}</h3>
                <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <label className={styles.label} htmlFor="categories">{type === "offer" ? "What can you help with?": "What do you need help with?"}</label>
                        <select className={styles.select} id="categories" multiple>
                            <option value="Picking up supplies">Picking up supplies</option>
                            <option value="Running errands">Running errands</option>
                            <option value="Phone call">Phone call</option>
                            <option value="Online chat">Online chat</option>
                            <option value="Dog walking">Dog walking</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    {type === "request" && <div>
                        <label className={styles.label} htmlFor="urgency">Urgency</label>
                        <select className={styles.select} id="urgency">
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