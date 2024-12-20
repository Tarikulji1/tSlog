import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action) => {
            const newPost = {
                id: action.payload.id,
                title: action.payload.title,
                content: action.payload.content,
                author: action.payload.author
            };
            state.posts.push(newPost);
        },
        updatePost: (state, action) => {
            const { id, title, content, author } = action.payload;
            const post = state.posts.find((post) => post.id === id);
            if (post) {
                post.title = title;
                post.content = content;
                post.author = author;
            }
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        }
    }
});

// Export the actions
export const { addPost, updatePost, deletePost } = postSlice.actions;

// Selector functions to access posts state
export const selectPosts = (state) => state.posts.posts;
export const selectPostById = (state, id) => state.posts.posts.find((post) => post.id === id);

// Export the reducer
export default postSlice.reducer;