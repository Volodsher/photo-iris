import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Blog.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirm } from '../../features/confirmSlice';
import { addPostAction, updatePostAction } from '../../features/postSlice';
import { useLocation } from 'react-router';
import MyButton from '../layout/MyButton/MyButton';
import Confirm from '../layout/Confirm';
import axios from 'axios';

const PostForm = () => {
  const { isOpen, payload } = useSelector((store) => store.confirm);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [prevImage, setPrevImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [id, setId] = useState();
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState();
  const [deleteImage, setDeleteImage] = useState(5);

  const navigate = useNavigate();
  const location = useLocation();
  const fromPost = location.state ? location.state : null;
  console.log(fromPost);

  useEffect(() => {
    if (fromPost !== null) {
      setTitle(fromPost.title);
      setText(fromPost.text);
      setId(fromPost.id);
      setImage(fromPost.image);
      setPrevImage(fromPost.image);
    }
  }, []);

  const handleSubmission = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    if (fromPost !== null) {
      dispatch(
        updatePostAction({ date: fromPost.date, id, title, text, image })
      );
      navigate(`/posts/${id}`);
    } else {
      dispatch(addPostAction({ title, text, image }));
    }
    setTitle('');
    setText('');
    setImage('');
    setPrevImage('');
    setImageUrl('');
    setSelectedFile('');

    if (image && prevImage === undefined) {
      await axios
        .post('/api/photo-blog', formData)
        .then((res) => {
          console.log('Success:', res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (image && prevImage !== image) {
      await axios
        .post('/api/photo-blog', formData)
        .then((res) => {
          console.log('Success:', res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (selectedFile === undefined) {
      setIsFilePicked(false);
    } else {
      setIsFilePicked(true);
    }
  }, [selectedFile]);

  const deletePostAction = () => {
    setImage('');
    setPrevImage();
    setIsFilePicked();
    setSelectedFile('');
    setImageUrl('');
  };

  return (
    <div className={styles.postForm}>
      {isOpen && (
        <Confirm
          action={deletePostAction}
          confirmName="Do you really want to delete a photo"
        />
      )}
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
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
        {prevImage && (
          <Fragment>
            <p>old name {image}</p>
            <img
              src={`/blog/${prevImage}`}
              // src={imageUrl}
              style={{ margin: '2rem 0', maxWidth: '100%', height: 'auto' }}
            />
          </Fragment>
        )}
        <input
          type="file"
          name="file"
          onChange={(event) => {
            setImage(event.target.files[0].name);
            if (event.target.files.length !== 0) {
              setSelectedFile(event.target.files[0]);
              setImageUrl(URL.createObjectURL(event.target.files[0]));
              setImage(event.target.files[0].name);
            }
          }}
        />
        {image && (
          <button
            type="button"
            onClick={() => dispatch(openConfirm({ title: image }))}
          >
            Delete image
          </button>
        )}
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
      <p>{image}</p>
    </div>
  );
};

export default PostForm;
