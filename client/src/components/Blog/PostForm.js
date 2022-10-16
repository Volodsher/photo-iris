import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Blog.module.scss';
import { useDispatch } from 'react-redux';
import { addPostAction, updatePostAction } from '../../features/postSlice';
import { useLocation } from 'react-router';
import MyButton from '../layout/MyButton/MyButton';

const PostForm = (props) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [_id, setId] = useState();
  // const postData = { title, text };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPost = location.state;

  useEffect(() => {
    if (fromPost !== null) {
      setTitle(fromPost.title);
      setText(fromPost.text);
      setId(fromPost._id);
    }
  }, []);

  return (
    <div className={styles.postForm}>
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      {fromPost !== null && <p>{fromPost.title}</p>}
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          if (fromPost !== null) {
            dispatch(updatePostAction({ _id, title, text }));
            navigate(`/photo-iris-react/posts/${_id}`);
          } else {
            dispatch(addPostAction({ title, text }));
          }
          setTitle('');
          setText('');
        }}
      >
        <input
          name="title"
          cols="30"
          rows="5"
          type="text"
          placeholder="Create a post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '80vw',
          }}
          required
        ></input>
        <textarea
          name="text"
          cols="30"
          rows="10"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '80vw',
          }}
          required
        />
        <MyButton type="submit" value="Submit" borderColor="--gray-light" />
      </form>
    </div>
  );
};

// PostForm.propTypes = {
//   addPost: PropTypes.func.isRequired,
// };

export default PostForm;
