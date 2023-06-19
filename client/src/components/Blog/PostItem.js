import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import styles from './Blog.module.scss';
// import {
//   faThumbsUp,
//   faThumbsDown,
//   faTimes,
// } from '@fortawesome/free-solid-svg-icons';
// import PostForm from './PostForm';
import MyButton from '../layout/MyButton/MyButton';
import { useDispatch, useSelector } from 'react-redux';

const PostItem = ({
  post,
  // showActions,
  toggleConfirm,
  postPayload,
}) => {
  const { id, text, title, date, image } = post;
  let firstSentence = '';
  if (text && text.indexOf('.') !== undefined) {
    firstSentence = text.slice(0, text.indexOf('.'));
  }
  // console.log({ id, text, title, date, image });
  // const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((store) => store.auth);

  return (
    <div className={`${styles.postItem}`}>
      <div>
        <h4>
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </h4>
      </div>
      <div>
        <h2 className="">{title}</h2>
        {firstSentence && <p className="">{firstSentence}</p>}
        {/* <Link to={`/photo-iris-react/posts/${id}`}> */}
        <Link to={`/posts/${id}`}>
          <MyButton
            className={styles.postButton}
            value="Read more"
            borderColor="--gray-ultralight"
          />
        </Link>
        {isAuthenticated && user.status === 'author' && (
          <Fragment>
            <MyButton
              className={styles.postButton}
              handleClick={() => {
                // postPayload({ id, title, image });
                postPayload(post);
                toggleConfirm();
                // console.log('done');
              }}
              value="delete"
              borderColor="--gray-ultralight"
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  showActions: PropTypes.bool.isRequired,
  toggleConfirm: PropTypes.func.isRequired,
  postPayload: PropTypes.func.isRequired,
};

export default PostItem;
