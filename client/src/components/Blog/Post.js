import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostAction } from '../../features/postSlice';
import { openConfirm } from '../../features/confirmSlice';
import { deletePostAction } from '../../features/postSlice';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import Confirm from '../layout/Confirm';
import Moment from 'react-moment';

const Post = (props) => {
  const { post, loading } = useSelector((store) => store.post);
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const { isOpen } = useSelector((store) => store.confirm);
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

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {isOpen && (
        <Confirm
          action={deletePostAction}
          confirmName="Do you really want to delete a post"
          goTo="/photo-iris-react/blog"
        />
      )}
      <Link to="/photo-iris-react/blog" className="btn">
        Back to Posts
      </Link>
      {isAuthenticated && user.status === 'superuser' && (
        <Fragment>
          <Link
            to="/photo-iris-react/posts/postForm"
            state={{ ...post }}
            className="btn btn-primary"
          >
            Edit{' '}
          </Link>
          <button
            onClick={() => dispatch(openConfirm({ _id, title }))}
            name="delete"
          >
            {' '}
            delete
          </button>
        </Fragment>
      )}

      <h1>{post.title}</h1>
      <h4>
        <Moment format="YYYY/MM/DD">{post.date}</Moment>
      </h4>
      <p>{post.text}</p>
      {/* <PostItem post={post} showActions={false} /> */}
    </Fragment>
  );
};

Post.propTypes = {};

export default Post;
