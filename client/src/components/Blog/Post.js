import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostAction } from '../../features/postSlice';
import { openConfirm } from '../../features/confirmSlice';
import { deletePostAction } from '../../features/postSlice';
import styles from './Blog.module.scss';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import Confirm from '../layout/Confirm';
import Moment from 'react-moment';
import MyButton from '../layout/MyButton/MyButton';
import NewConfirm from '../layout/NewConfirm';

const Post = (props) => {
  const { post, loading } = useSelector((store) => store.post);
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [deletePostData, setDeletePostData] = useState();
  const { id } = useParams();
  const payload = { id };
  const dispatch = useDispatch();
  let _id = null;
  let title = null;

  if (post !== null) {
    _id = post._id;
    title = post.title;
  }

  useEffect(() => {
    dispatch(getPostAction(payload));
  }, [getPostAction]);

  const toDeletePost = () => {
    setIsOpen(!isOpen);
    dispatch(deletePostAction(deletePostData));
    setDeletePostData(null);
    console.log('Post is deleted');
  };

  const postPayload = (postData) => {
    setDeletePostData(postData);
  };

  const toggleConfirm = () => {
    setIsOpen(!isOpen);
  };

  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className={styles.postContainer}>
      {/* {isOpen && (
        <Confirm
          action={deletePostAction}
          confirmName="Do you really want to delete a a post"
          toDispatch={true}
          link="/"
          goTo="/blog"
        />
      )} */}
      {isOpen && (
        <NewConfirm
          action={toDeletePost}
          link="/blog"
          toggleConfirm={toggleConfirm}
          confirmName="Do you really want to delete this post"
          isOpen={isOpen}
          payload={deletePostData}
        />
      )}
      <div className={styles.postButtons}>
        <Link to="/blog" className={styles.postLink}>
          <MyButton value="All Posts" className={styles.postButton} />
        </Link>
        {isAuthenticated && user.status === 'superuser' && (
          <Fragment>
            <Link to="/posts/postForm" state={{ ...post }}>
              <MyButton value="Edit" className={styles.postButton} />
            </Link>
            <MyButton
              value="Delete"
              className={styles.postButton}
              // handleCklick={() => dispatch(openConfirm({ _id, title }))}
              handleCklick={() => {
                postPayload({ _id, title });
                toggleConfirm();
              }}
            />
          </Fragment>
        )}
      </div>
      <h1>{post.title}</h1>
      <h4 style={{ color: 'var(--gray-light' }}>
        <Moment format="YYYY/MM/DD">{post.date}</Moment>
      </h4>
      <p>{post.text}</p>
      {post.image && (
        <img
          src={`/blog/${post.image}`}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
    </div>
  );
};

Post.propTypes = {};

export default Post;
