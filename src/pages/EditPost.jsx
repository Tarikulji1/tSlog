import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (slug) {
                    const post = await appwriteService.getPost(slug);
                    if (post) {
                        setPosts(post);
                    } else {
                        setError("Post not found");
                    }
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error("Failed to fetch post: ", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug, navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  return post ? (
    <div>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null;
}

export default EditPost;