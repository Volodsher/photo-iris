import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import styles from './Blog.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import PostForm from './PostForm';
import MyButton from '../layout/MyButton/MyButton';
import { useDispatch, useSelector } from 'react-redux';

const PostItem = ({
  // addLike,
  // removeLike,
  // auth,
  post: { _id, text, title, date, image },
  showActions,
  toggleConfirm,
  postPayload,
}) => {
  const dotIndex = text.indexOf('.');
  const firstSentence = text.slice(0, dotIndex);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((store) => store.auth);

  console.log(image);

  return (
    <div className={`${styles.postItem}`}>
      <div>
        <h4>
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </h4>
      </div>
      <div>
        <h2 className="">{title}</h2>
        <p className="">{firstSentence}</p>
        <Link to={`/photo-iris-react/posts/${_id}`}>
          <MyButton
            className={styles.postButton}
            value="Read more"
            // color="--gray-light"
            // padding="0.3rem"
            borderColor="--gray-ultralight"
          />
        </Link>
        {isAuthenticated && user.status === 'superuser' && (
          <Fragment>
            <MyButton
              className={styles.postButton}
              handleCklick={() => {
                postPayload({ _id, title, image });
                toggleConfirm();
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

// PostItem.propTypes = {
//   post: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
//   addLike: PropTypes.func.isRequired,
//   removeLike: PropTypes.func.isRequired,
//   deletePost: PropTypes.func.isRequired,
// };

export default PostItem;
