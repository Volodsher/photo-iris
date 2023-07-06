import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Blog.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirm } from '../../features/confirmSlice';
import { addPostAction, updatePostAction } from '../../features/postSlice';
import { useLocation } from 'react-router';
import MyButton from '../layout/MyButton/MyButton';
import Confirm from '../layout/Confirm';
import ErrorMessage from '../layout/ErrorMessage';
// import { uuid } from 'uuidv4';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const PostForm = ({ posts }) => {
  const { isOpen, payload } = useSelector((store) => store.confirm);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [newError, setNewError] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [prevImage, setPrevImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [id, setId] = useState();
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [fileIsPicked, setFileIsPicked] = useState(false);
  const [deleteImage, setDeleteImage] = useState(5);

  const navigate = useNavigate();
  const location = useLocation();
  const fromPost = location.state ? location.state : null;

  useEffect(() => {
    if (fromPost !== null) {
      setTitle(fromPost.title);
      setText(fromPost.text);
      setId(fromPost.id);
      setImage(fromPost.image);
      setPrevImage(fromPost.image);
    }
  }, []);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileSizeInBytes = file.size;
      const maxSizeInBytes = 1024 * 1024; // 1MB

      if (fileSizeInBytes > maxSizeInBytes) {
        setImage('');
        setSelectedFile(undefined);
        setImageUrl('');
        setFileIsPicked(false);
        fileInputRef.current.value = null;
        return setNewError(
          'File size exceeds the maximum allowed size in 1 MB'
        );
      }
      setNewError(''); // to delete an error from previous choice if there is one
      setImage(file.name);
      setSelectedFile(file);
      setImageUrl(URL.createObjectURL(file));
      setFileIsPicked(true);
    } else {
      setImage('');
      setSelectedFile(undefined);
      setImageUrl('');
      setFileIsPicked(false);
      setNewError('');
    }
  };

  const handleSubmission = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    console.log('from my formpos', selectedFile);
    if (fromPost !== null) {
      dispatch(
        updatePostAction({ date: fromPost.date, id, title, text, image })
      );
      navigate(`/posts/${id}`);
    } else {
      formData.append('title', title);
      formData.append('text', text);
      if (image && posts.filter((post) => image === post.image)) {
        console.log(posts.filter((post) => image === post.image));
        const changeNamePart = uuidv4().slice(0, 10);
        const newImageName = changeNamePart + image;
        console.log('here we have this picture', newImageName);
        formData.append('image', newImageName);
      } else {
        console.log('here we do not have');
        formData.append('image', image);
      }
      formData.append('file', selectedFile);

      // formData.append('image', image);
      dispatch(addPostAction(formData));
      // dispatch(addPostAction({ title, text, image }));
    }
    setTitle('');
    setText('');
    setImage('');
    setPrevImage('');
    setImageUrl('');
    setSelectedFile(undefined);
    setFileIsPicked(false);
    setNewError('');

    fileInputRef.current.value = null;
    // if (image && prevImage === undefined) {
    //   await axios
    //     .post('/api/photo-blog', formData)
    //     .then((res) => {
    //       // console.log('Success:', res);
    //       console.log('Success:');
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } else if (image && prevImage !== image) {
    //   await axios
    //     .post('/api/photo-blog', formData)
    //     .then((res) => {
    //       console.log('Success:', res);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  };

  // useEffect(() => {
  //   if (selectedFile === undefined) {
  //     setFileIsPicked(false);
  //     console.log('this is selected file', fileIsPicked);
  //   } else {
  //     setFileIsPicked(true);
  //     console.log('this is selected file', fileIsPicked);
  //   }
  // }, [selectedFile]);

  const deletePostAction = () => {
    setImage('');
    setPrevImage();
    setFileIsPicked();
    setSelectedFile('');
    setImageUrl('');

    fileInputRef.current.value = null;
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
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {newError && <ErrorMessage errMessage={newError} />}
        {image && (
          <button
            type="button"
            onClick={() => dispatch(openConfirm({ title: image }))}
          >
            Delete image
          </button>
        )}
        {fileIsPicked ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>
              Size: {Math.round((selectedFile.size / 1000000) * 1000) / 1000} MB
            </p>
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

export default PostForm;
