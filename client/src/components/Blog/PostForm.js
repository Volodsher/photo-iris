import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Blog.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirm } from '../../features/confirmSlice';
import { addPostAction, updatePostAction } from '../../features/postSlice';
import { useLocation } from 'react-router';
import MyButton from '../layout/MyButton/MyButton';
import Confirm from '../layout/Confirm';
// import { uuid } from 'uuidv4';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const PostForm = ({ posts }) => {
  const { isOpen, payload } = useSelector((store) => store.confirm);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [prevImage, setPrevImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [id, setId] = useState();
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
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

  const handleSubmission = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);

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
    setIsFilePicked(false);

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
  //     setIsFilePicked(false);
  //     console.log('this is selected file', isFilePicked);
  //   } else {
  //     setIsFilePicked(true);
  //     console.log('this is selected file', isFilePicked);
  //   }
  // }, [selectedFile]);

  const deletePostAction = () => {
    setImage('');
    setPrevImage();
    setIsFilePicked();
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
          onChange={(event) => {
            if (event.target.files && event.target.files.length > 0) {
              setImage(event.target.files[0].name);
              setSelectedFile(event.target.files[0]);
              setImageUrl(URL.createObjectURL(event.target.files[0]));
              setIsFilePicked(true);
            } else {
              setImage('');
              setSelectedFile(undefined);
              setImageUrl('');
              setIsFilePicked(false);
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
