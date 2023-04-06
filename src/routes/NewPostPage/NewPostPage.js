import React, { useContext, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import CommUnityContext from "../../contexts/context";
import styles from "./NewPostPage.module.css";
import UserDataService from "../../services/user-data-service";
import '../../components/Utils/slim.scss';
import { ButtonLight, ButtonDark, Label, Textarea, CategoryMultiSelect, UrgencySelect, Container, offerIcon, requestIcon } from "../../components/Utils/Utils";

const NewPostPage = () => {
    const communityContext = useContext(CommUnityContext);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { type } = useParams();
    const location = useLocation();

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
        <Container>
            <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                <h3 className={styles.formHeading}>{type === "offer" ? offerIcon : requestIcon}New {type}</h3>
                <div className={styles.mobileSelectors}>
                    <h3 onClick={() => navigate("/new-post/request")} className={location.pathname === "/new-post/request" ? styles.selected : undefined}>{requestIcon}New request</h3>
                    <h3 onClick={() => navigate("/new-post/offer")} className={location.pathname === "/new-post/offer" ? styles.selected : undefined}>{offerIcon}New offer</h3>
                </div>
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
                    <ButtonLight type="button" onClick={() => navigate("/home")}>Cancel</ButtonLight>
                    <ButtonDark type="submit" loading={loading.toString()}>Submit</ButtonDark>
                </div>
            </form>
        </Container>
    )
}

export default NewPostPage;