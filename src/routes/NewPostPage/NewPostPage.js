import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SlimSelect from "slim-select";
import CommUnityContext from "../../contexts/context";
import styles from "./NewPostPage.module.css";
import UserDataService from "../../services/user-data-service";
import '../../components/Utils/slim.scss';
import { ButtonLight, ButtonDark, Label, Textarea } from "../../components/Utils/Utils";

class NewPostPage extends Component {
    static contextType = CommUnityContext;

    state = { 
        error: null ,
        loading: false
    }
    
    handleSubmit(e) {
        e.preventDefault();

        this.setState({...this.state, loading: true })

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
                this.setState({...this.state, loading: false })
                this.props.history.push("/home")
            })
            .catch(err => {
                this.setState({ error: "Please select one or more categories", loading: false })
            })
    }

    componentDidMount() {
        new SlimSelect({
            select: "#categories",
            showSearch: false,
        })

        this.props.match.params.type === "request" && new SlimSelect({
            select: "#urgency",
            showSearch: false
        })
    }
    
    render() {
        const type = this.props.match.params.type;
        return (   
            <main className={styles.main}>
                <h3>Create a new {type} {type === "offer" ? <i className={`fas fa-heart ${styles.heart}`}></i> : <i className={`fas fa-hand-paper ${styles.hand}`}></i>}</h3>
                <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <Label className={styles.label} htmlFor="categories">{type === "offer" ? "What can you help with?": "What do you need help with?"}</Label>
                        <select  id="categories" multiple name="categories" className={this.state.error && styles.errorCell}>
                            <option className="supplies" value="Picking up supplies">Picking up supplies</option>
                            <option id="errands" value="Running errands">Running errands</option>
                            <option className="phone" value="Phone call">Phone call</option>
                            <option className="online" value="Online chat">Online chat</option>
                            <option className="dog" value="Dog walking">Dog walking</option>
                            <option className="other" value="Other">Other</option>
                        </select>
                        {this.state.error && <div className={styles.error}>{this.state.error}</div>}
                    </div>
                    {type === "request" && <div>
                        <Label className={styles.label} htmlFor="urgency">Urgency</Label>
                        <select id="urgency" required>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>}
                    <div>
                        <Label className={styles.label} htmlFor="description">Description (optional)</Label>
                        <Textarea className={styles.textarea} name="description" id="description"></Textarea>
                    </div>
                    <div className={styles.buttonContainer}>
                        <ButtonLight type="button" onClick={() => this.props.history.goBack()}>Cancel</ButtonLight>
                        <ButtonDark type="submit" loading={this.state.loading.toString()}>Submit</ButtonDark>
                    </div>
                </form>
            </main>
        )
    }
}

export default withRouter(NewPostPage);