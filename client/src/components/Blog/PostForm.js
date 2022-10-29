import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Blog.module.scss';
import { useDispatch } from 'react-redux';
import { addPostAction, updatePostAction } from '../../features/postSlice';
import { useLocation } from 'react-router';
import MyButton from '../layout/MyButton/MyButton';
import axios from 'axios';

const PostForm = (props) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState();
  const [prevImage, setPrevImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [_id, setId] = useState();
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState();
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
      setImage(fromPost.image);
    }
  }, []);

  const handleSubmission = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log(image);
    if (fromPost !== null) {
      dispatch(updatePostAction({ _id, title, text, image }));
      navigate(`/photo-iris-react/posts/${_id}`);
    } else {
      dispatch(addPostAction({ title, text, image }));
    }
    setTitle('');
    setText('');
    setImage('');

    await axios
      .post('/api/photo-blog', formData)
      .then((res) => {
        console.log(res.data);
        console.log('Success:', res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (selectedFile === undefined) {
      setIsFilePicked(false);
    } else {
      setIsFilePicked(true);
    }
  }, [selectedFile]);

  console.log(isFilePicked);
  console.log(selectedFile);

  return (
    <div className={styles.postForm}>
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      {/* {fromPost !== null && <p>{fromPost.title}</p>} */}
      <form className="form my-1" onSubmit={handleSubmission}>
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
        />
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
        {image && (
          <Fragment>
            <p>old name {image}</p>
            <img
              src={`${process.env.REACT_APP_URL}/blog/${image}`}
              style={{ margin: '2rem 0', maxWidth: '100%', height: 'auto' }}
            />
          </Fragment>
        )}
        <input
          type="file"
          name="file"
          onChange={(event) => {
            if (event.target.files.length !== 0) {
              setSelectedFile(event.target.files[0]);
              setImageUrl(URL.createObjectURL(event.target.files[0]));
              setImage(event.target.files[0].name);
            }
          }}
        />
        {isFilePicked ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>
              Size: {Math.round((selectedFile.size / 1000000) * 1000) / 1000} MB
            </p>
            <p>{image}</p>
            <img src={imageUrl} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <MyButton type="submit" value="Submit" borderColor="--gray-light" />
      </form>
    </div>
  );
};

// PostForm.propTypes = {
//   addPost: PropTypes.func.isRequired,
// };

export default PostForm;
