import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import styles from "./NewPostPage.module.css";
import UserDataService from "../../services/user-data-service";
import '../../components/Utils/slim.scss';
import { ButtonLight, ButtonDark, Label, Textarea, CategoryMultiSelect, UrgencySelect } from "../../components/Utils/Utils";

const NewPostPage = () => {
    const communityContext = useContext(CommUnityContext);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { type } = useParams()

    // Handles form submission
    // Submits post request to server for new post and adds post to context
    // Throws error if no categories are selected
    const handleSubmit = e => {
        e.preventDefault();

        setLoading(true)

        const categories = e.target.categories;

        let category_ids = [];
        categories.length > 1 ? categories.forEach(cat => category_ids.push(cat.value)) : category_ids.push(categories.value);

        const post = { post_type: type, category_ids }

        if (e.target.description.value) {
            post.description = e.target.description.value;
        }

        if (type === "request" && e.target.urgency.value) {
            post.urgency = (e.target.urgency.value);
        }

        UserDataService.postPost(post)
            .then(post => {
                console.log(post)
                communityContext.addNewPost(post)
                setLoading(false)
                navigate("/home")
            })
            .catch(err => {
                setError("Please select one or more categories")
                setLoading(false)
            })
    }

    return (
        <main className={styles.main}>
            <h3>Create a new {type} {type === "offer" ? <i className={`fas fa-heart ${styles.heart}`}></i> : <i className={`fas fa-hand-paper ${styles.hand}`}></i>}</h3>
            <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                <div>
                    <Label className={styles.label} htmlFor="categories">{type === "offer" ? "What can you help with?" : "What do you need help with?"}</Label>
                    <CategoryMultiSelect error={error} />
                    {error && <div className={styles.error}>{error}</div>}
                </div>
                {type === "request" && <div>
                    <Label className={styles.label} htmlFor="urgency">Urgency</Label>
                    <UrgencySelect error={error} />
                </div>}
                <div>
                    <Label className={styles.label} htmlFor="description">Description (optional)</Label>
                    <Textarea className={styles.textarea} name="description" id="description"></Textarea>
                </div>
                <div className={styles.buttonContainer}>
                    <ButtonLight type="button" onClick={() => navigate(-1)}>Cancel</ButtonLight>
                    <ButtonDark type="submit" loading={loading.toString()}>Submit</ButtonDark>
                </div>
            </form>
        </main>
    )
}

export default NewPostPage;