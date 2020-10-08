import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import config from "../../config";
import UserDataService from "../../services/user-data-service";
import CommUnityContext from "../../contexts/context";
import { ButtonDark, ButtonLight, Textarea, Label } from "../../components/Utils/Utils";
import SlimSelect from "slim-select";
import styles from "../NewPostPage/NewPostPage.module.css";

class EditPostPage extends Component {
    static contextType = CommUnityContext;

    state = { 
        error: null,
        post: {},
        loading: false
    }

    // Fetches post information from server and sets to state so it can be used as the value for the inputs
    // Creates SlimSelect instances for the category and urgency inputs which are applied to the divs by id value
    componentDidMount() {
        const postId = parseInt(this.props.match.params.id);
        fetch(`${config.API_ENDPOINT}/posts/${postId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem(config.TOKEN_KEY)}`
            }
        })
            .then(res => res.json())
            .then(resJson => this.setState({ post: resJson }))
            .then(res => {
                new SlimSelect({
                    select: "#categories",
                    showSearch: false
                })
        
                this.state.post.post_type === "request" && new SlimSelect({
                    select: "#urgency",
                    showSearch: false
                })
            })
        
    }

    // Changes description value in state on form change
    handleDescriptionChange = e => {
        this.setState({ post: {...this.state.post, description: e.target.value} });
    }

    // Changes urgency value in state on form change
    handleUrgencyChange = e => {
        this.setState({ post: {...this.state.post, urgency: e.target.value} });
    }

    // Changes task values in state on form change
    // Goes through each of the options on the form and pushes to opts array if selected
    handleTaskChange = e => {
        let opts = [], opt;
    
        for (let i = 0; i < e.target.options.length; i++) {
          opt = e.target.options[i];
    
          if (opt.selected) {
            opts.push(opt.value);
          }
        }
        this.setState({ post: {...this.state.post, categories: opts} });
    }

    // Handles form sumission using values saved in state
    // Throws error if no categories are selected
    // Updates post values in context and pushes location back to the post
    handleSubmit = e => {
        e.preventDefault();

        this.setState({...this.state, loading: true })

        if (this.state.post.categories.length === 0) {
            this.setState({ error: "Please select one or more categories", loading: false })
        } else {
            const post_type = this.state.post.post_type;
            let category_ids = [], option;
            for (let i = 0; i < e.target.categories.length; i++) {
                option = e.target.categories[i];
            
                if (option.selected) {
                    category_ids.push(i+1);
                }
            }
            
            const post = { post_type, category_ids }

            if (this.state.post.description) {
                post.description = this.state.post.description;
            }

            if (post_type === "request" && this.state.post.urgency) {
                post.urgency = (this.state.post.urgency).toLowerCase();
            }

            UserDataService.patchPost(post, this.state.post.id)
                .then(res => {
                    this.context.updatePost(this.state.post)
                    this.setState({...this.state, loading: false })
                    this.props.history.push(`/my-post/${this.state.post.id}`)
                })
                .catch(err => {
                    this.setState({...this.state, error: "Please select one or more categories", loading: false })
                })
        } 
    }
    
    render() {
        return (   
            <main className={styles.main}>
                {this.state && <>
                <h3>Edit {this.state.post.post_type}</h3>
                <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <Label className={styles.label} htmlFor="categories">{this.state.post.post_type === "offer" ? "What can you help with?": "What do you need help with?"}</Label>
                        <select id="categories" value={this.state.post.categories} onChange={this.handleTaskChange} multiple className={this.state.error && styles.errorCell}>
                            <option className="supplies" value="Picking up supplies">Picking up supplies</option>
                            <option id="errands" value="Running errands">Running errands</option>
                            <option className="phone" value="Phone call">Phone call</option>
                            <option className="online" value="Online chat">Online chat</option>
                            <option className="dog" value="Dog walking">Dog walking</option>
                            <option className="other" value="Other">Other</option>
                        </select>
                        {this.state.error && <div className={styles.error}>{this.state.error}</div>}
                    </div>
                    {this.state.post.post_type === "request" && <div>
                        <Label className={styles.label} htmlFor="urgency">Urgency</Label>
                        <select value={this.state.post.urgency} onChange={this.handleUrgencyChange} id="urgency" required>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>}
                    <div>
                        <Label className={styles.label} htmlFor="description">Description (optional)</Label>
                        <Textarea value={this.state.post.description === null ? "" : this.state.post.description} onChange={this.handleDescriptionChange} className={styles.textarea} name="description" id="description"></Textarea>
                    </div>
                    <div className={styles.buttonContainer}>
                        <ButtonLight type="button" onClick={() => this.props.history.goBack()}>Cancel</ButtonLight>
                        <ButtonDark type="submit" loading={this.state.loading.toString()}>Submit</ButtonDark>
                    </div>
                </form>
                </>}
            </main>
        )
    }
}



export default withRouter(EditPostPage);