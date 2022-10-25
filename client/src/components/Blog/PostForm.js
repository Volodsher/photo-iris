import React, { useState, useEffect } from 'react';
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
  const [_id, setId] = useState();
  const [url, setUrl] = useState('');
  // const postData = { title, text };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPost = location.state;

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState();

  useEffect(() => {
    if (fromPost !== null) {
      setTitle(fromPost.title);
      setText(fromPost.text);
      setId(fromPost._id);
    }
  }, []);

  const handleSubmission = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    await axios
      .post('/api/photo', formData)
      .then((res) => {
        console.log(res.data);
        console.log('Success:', res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(isFilePicked);
  console.log(selectedFile);

  useEffect(() => {
    if (selectedFile === undefined) {
      setIsFilePicked(false);
    } else {
      setIsFilePicked(true);
    }
  }, [selectedFile]);

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
      <form onSubmit={handleSubmission}>
        <input
          type="file"
          name="file"
          onChange={(event) => {
            // setSelectedFile(event.target.files[0]);
            // console.log(event.target.files[0]);
            // if (event.target.files.length === 0) {
            //   setIsFilePicked(false); // undefined take place instead by default
            //   // the cancel event logics will always land here
            // }
            // if (event.target.files && event.target.files[0]) {
            if (event.target.files.length !== 0) {
              setSelectedFile(event.target.files[0]);
              setImage(URL.createObjectURL(event.target.files[0]));
            }
          }}
        />
        {isFilePicked ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            {/* <p>Filetype: {selectedFile.type}</p> */}
            <p>
              Size: {Math.round((selectedFile.size / 1000000) * 1000) / 1000} MB
            </p>

            <img src={image} />
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {/* <div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <button onClick={uploadImage}>Upload</button>
      </div> */}
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={url} />
      </div>
    </div>
  );
};

// PostForm.propTypes = {
//   addPost: PropTypes.func.isRequired,
// };

export default PostForm;
