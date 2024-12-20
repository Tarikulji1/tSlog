import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await appwriteService.getPosts([]);
                if (posts) {
                    setPosts(posts.documents);
                }
            } catch (error) {
                console.error("Failed to fetch posts: ", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                        {/* <PostCard post={post} /> */}
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts;