import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import styles from './Blog.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from '../../features/postSlice';
import { deletePostAction } from '../../features/postSlice';
import PostForm from './PostForm';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import Confirm from '../layout/Confirm';
import { check } from 'express-validator';

export default function Blog() {
  const { posts, loading } = useSelector((store) => store.post);
  const { isOpen, payload } = useSelector((store) => store.confirm);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((store) => store.auth);

  // const { posts, loading } = post;

  useEffect(() => {
    if (posts.length === 0) dispatch(getPostsAction());
  }, []);

  return isAuthenticated && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {isOpen && (
        <Confirm
          action={deletePostAction}
          confirmName="Do you really want to delete a post"
        />
      )}
      <h1>Wellcome to my blog</h1>
      <p>Here I tell some intresting stores about photography</p>
      {isAuthenticated && user.status === 'superuser' && <PostForm />}
      <div styles={styles.posts}>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
}
