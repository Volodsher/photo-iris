import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import styles from './Blog.module.scss';
import { openConfirm } from '../../features/confirmSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import PostForm from './PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostAction } from '../../features/postSlice';

const PostItem = ({
  // addLike,
  // removeLike,
  // deletePost,
  // auth,
  post: { _id, text, title, avatar, likes, comments, date },
  showActions,
}) => {
  const dotIndex = text.indexOf('.');
  const firstSentence = text.slice(0, dotIndex);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  // console.log(_id);

  return (
    <div className={`${styles.post} bg-white p-1 my-1`}>
      <div>
        <h4>
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </h4>
      </div>
      <div>
        <h2 className="my-1">{title}</h2>
        <p className="my-1">{firstSentence}</p>

        <Link to={`/photo-iris-react/posts/${_id}`} className="btn btn-primary">
          Read more{' '}
        </Link>
        {isAuthenticated && user.status === 'superuser' && (
          <button
            onClick={() => dispatch(openConfirm({ _id, title }))}
            name="delete"
          >
            {' '}
            delete
          </button>
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

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
//   PostItem
// );

export default PostItem;
