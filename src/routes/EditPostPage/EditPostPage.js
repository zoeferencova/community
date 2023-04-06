import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserDataService from "../../services/user-data-service";
import CommUnityContext from "../../contexts/context";
import { ButtonDark, ButtonLight, Textarea, Label, CategoryMultiSelect, UrgencySelect, Container } from "../../components/Utils/Utils";
import styles from "../NewPostPage/NewPostPage.module.css";

const cats = ['Picking up supplies', 'Running errands', 'Phone call', 'Online chat', 'Dog walking', 'Other']

const EditPostPage = props => {
    const communityContext = useContext(CommUnityContext);

    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    // Fetches post information from server and sets to state so it can be used as the value for the inputs
    // Creates SlimSelect instances for the category and urgency inputs which are applied to the divs by id value
    useEffect(() => {
        const postId = parseInt(id);
        setPost(communityContext.user_posts.find(post => post.id === postId))
    }, [])

    const handleSubmit = e => {
        e.preventDefault();

        setLoading(true)

        if (post.categories.length === 0) {
            setError("Please select one or more categories")
            setLoading(false)
        } else {
            const post_type = post.post_type;
            const categories = e.target.categories;

            const category_ids = [];
            const category_names = [];

            if (categories.length > 1) {
                categories.forEach(cat => {
                    category_ids.push(cat.value)
                    category_names.push(cats[cat.value - 1])
                })
            } else {
                category_ids.push(categories.value);
                category_names.push(cats[categories.value - 1])
            }

            const newPost = { post_type, category_ids }

            if (post.description) newPost.description = post.description;

            if (post_type === "request" && e.target.urgency.value) {
                newPost.urgency = (e.target.urgency.value);
            }

            UserDataService.patchPost(newPost, post.id)
                .then(res => {
                    communityContext.updatePost({ ...post, description: newPost.description, categories: category_names, urgency: newPost.urgency })
                    setLoading(false)
                    navigate(`/my-post/${post.id}`)
                })
                .catch(err => {
                    setError("Please select one or more categories")
                    setLoading(false)
                })
        }
    }

    return (
        <>

            <Container>
                {!post ? <div className={styles.loading}>Loading...</div> :
                    <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                        <h3>Edit {post.post_type}</h3>
                        <div>
                            <Label className={styles.label} htmlFor="categories">{post.post_type === "offer" ? "What can you help with?" : "What do you need help with?"}</Label>
                            <CategoryMultiSelect error={error} defaultValue={post.categories} />
                            {error && <div className={styles.error}>{error}</div>}
                        </div>

                        {post.post_type === "request" && <div>
                            <Label className={styles.label} htmlFor="urgency">Urgency</Label>
                            <UrgencySelect error={error} defaultValue={post.urgency} />
                        </div>}

                        <div>
                            <Label className={styles.label} htmlFor="description">Description (optional)</Label>
                            <Textarea
                                value={post.description === null ? "" : post.description}
                                onChange={e => setPost({ ...post, description: e.target.value })}
                                className={styles.textarea} name="description" id="description">
                            </Textarea>
                        </div>

                        <div className={styles.buttonContainer}>
                            <ButtonLight type="button" onClick={() => navigate(-1)}>Cancel</ButtonLight>
                            <ButtonDark type="submit" loading={loading.toString()}>Submit</ButtonDark>
                        </div>
                    </form>
                }
            </Container>
        </>
    )
}

export default EditPostPage;