import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

//Posts
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // GET_POSTS,
    getPosts: (state, { payload }) => {
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    },
    // GET_POST,
    getPost: (state, { payload }) => {
      return {
        ...state,
        post: payload,
        loading: false,
      };
    },
    // ADD_POST
    addPost: (state, { payload }) => {
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    },
    // UPDATE_POST
    updatePost: (state, { payload }) => {
      return {
        ...state,
        // posts: [...state.posts, payload],
        posts: state.posts.map((post) => {
          if (post.id === payload.id) return payload;
          return post;
        }),
        //arr.splice(index, 1, 'z');
        loading: false,
        post: payload,
      };
    },
    // DELETE_POST
    deletePost: (state, { payload }) => {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload),
        post: null,
      };
    },
    // POST_ERROR,
    // UPDATE_LIKES,
    // ADD_COMMENT,
    // REMOVE_COMMENT,
  },
});

// Get all posts
export const getPostsAction = createAsyncThunk(
  'post/getposts',
  async (_, thunkApi) => {
    try {
      const res = await axios.get('/api/posts');
      console.log(res.data);
      thunkApi.dispatch(getPosts(res.data));
    } catch (error) {
      console.log('this is er');
      console.log(error.message);
    }
  }
);

// Add post
export const addPostAction = createAsyncThunk(
  'post/addPost',
  async (payload, { dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log(payload);
    try {
      const res = await axios.post('/api/posts/', payload, config);
      dispatch(addPost(res.data));
      // console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Update post
export const updatePostAction = createAsyncThunk(
  'post/updatePost',
  async (payload, { dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/posts/${payload.id}`, payload, config);
      dispatch(updatePost(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }
);

//Get one post
export const getPostAction = createAsyncThunk(
  'post/getpost',
  async ({ id }, thunkApi) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      // console.log(res.data);
      thunkApi.dispatch(getPost(res.data[0]));
    } catch (error) {
      console.error(error.message);
    }
  }
);

// Delete post
export const deletePostAction = createAsyncThunk(
  'post/deletepost',
  // async ({ id }, { dispatch }) => {
  async (post, { dispatch }) => {
    console.log(post.image);

    // this is from Blog old version

    // if (deletePostData.image !== undefined) {
    //   const req = async () =>
    //     console.log('we should delete this image' + deletePostData.image);
    //   axios.delete(`/api/photo-blog/${deletePostData.image}`);
    // } else {
    //   console.log('could not find image');
    // }
    try {
      const res = await axios.delete(`/api/posts/${post.id}`, { data: post });
      dispatch(deletePost(post.id));
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const { getPosts, getPost, addPost, updatePost, deletePost } =
  postSlice.actions;

export default postSlice.reducer;
