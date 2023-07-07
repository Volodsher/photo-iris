import { useEffect, Fragment, useState } from 'react';
import axios from 'axios';
import styles from './Blog.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from '../../features/postSlice';
import { deletePostAction } from '../../features/postSlice';
import PostForm from './PostForm';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import NewConfirm from '../layout/NewConfirm';

export default function Blog() {
  const { posts, loading } = useSelector((store) => store.post);
  const [isOpen, setIsOpen] = useState(false);
  const [deletePostData, setDeletePostData] = useState();
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // console.log(deletePostData);
  useEffect(() => {
    if (posts.length === 0) dispatch(getPostsAction());
  }, []);

  const toDeletePost = () => {
    setIsOpen(!isOpen);
    dispatch(deletePostAction(deletePostData));
    setDeletePostData(null);
    console.log('this is deletePostData', deletePostData);
    console.log('Post is deleted from Blog page');

    // if (deletePostData.image !== undefined) {
    //   const req = async () =>
    //     console.log('we should delete this image' + deletePostData.image);
    //   axios.delete(`/api/photo-blog/${deletePostData.image}`);
    // } else {
    //   console.log('could not find image');
    // }

    console.log('Post is deleted');
  };

  const postPayload = (postData) => {
    setDeletePostData(postData);
  };

  const toggleConfirm = () => {
    setIsOpen(!isOpen);
  };

  return isAuthenticated && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {isOpen && (
        <NewConfirm
          action={toDeletePost}
          toggleConfirm={toggleConfirm}
          confirmName="Do you really want to delete this post"
          isOpen={isOpen}
          payload={deletePostData}
        />
      )}
      <h1>Wellcome to my blog</h1>
      {isAuthenticated && user.status === 'author' && (
        <PostForm posts={posts} />
      )}
      {loading === true ? (
        <Spinner />
      ) : (
        <div styles={styles.posts}>
          {posts.map((post) => (
            <PostItem
              toggleConfirm={toggleConfirm}
              toDeletePost={toDeletePost}
              postPayload={postPayload}
              key={post.id}
              post={post}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
}
