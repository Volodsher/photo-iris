import { useState, useEffect } from 'react';
import axios from 'axios';
// import styles from './Blog.module.scss';

// const baseURL = '/';
// const baseURL = 'https://jsonplaceholder.typicode.com/posts/1';

export default function Blog() {
  //   const [post, setPostId] = useState(null);
  //   // const [post1, setPost1] = useState(null);

  //   useEffect(() => {
  //     // POST request using fetch inside useEffect React hook
  //     const requestOptions = {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //       // body: JSON.stringify({ title: 'React Hooks POST Request Example' }),
  //     };
  //     // fetch('https://reqres.in/api/posts', requestOptions)
  //     // fetch('/', requestOptions)
  //     //   .then((response) => response.json())
  //     //   .then((data) => {
  //     //     console.log(data.json());
  //     //     return setPostId(data);
  //     //   });
  //     fetch('/', requestOptions).then(async (response) => {
  //       try {
  //         const data = await response.json();
  //         console.log('response data?', data);
  //       } catch (error) {
  //         console.log('Error happened here!');
  //         console.error(error);
  //       }
  //     });

  //     // empty dependency array means this effect will only run once (like componentDidMount in classes)
  //   }, []);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ title: 'React Hooks POST Request Example' }),
    };
    axios.get(`/api/posts`, requestOptions).then((res) => {
      console.log(res.data[1].text);
    });
  }, []);

  // function createPost() {
  //   axios
  //     .post(baseURL, {
  //       title: 'Hello World',
  //       body: 'This is a new post',
  //     })
  //     .then((res) => {
  //       setPost(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // if (!post) return 'No post!';

  return (
    <div>
      <p>this is Blog</p>
      {/* <p>{post}</p> */}

      {/* <button onClick={createPost}>Create post</button> */}
      <p>one more time to speak</p>
    </div>
  );
}
