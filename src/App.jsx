import React, { useState, useMemo, useEffect } from 'react';
import './Styles/App.css';
import Counter from './Components/Counter';
import ClassCounter from './Components/ClassCounter';
import PostItem from './Components/PostItem';
import PostList from './Components/PostList';
import MyButton from './Components/UI/Button/MyButton';
import MyInput from './Components/UI/Input/MyInput';
import PostForm from './Components/PostForm';
import MySelect from './Components/UI/Select/MySelect';
import PostFilter from './Components/PostFilter';
import MyModal from './Components/UI/Modal/MyModal';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import Loader from './Components/UI/Loader/Loader';



function App() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchPosts = usePosts(posts, filter.post, filter.query);
  const [isPostsLoading, setisPostsLoading] = useState(false);

useEffect(() => {
fetchPosts()
}, [])

  const createPost = (newPost) => {
    setPosts ([...posts, newPost])
    setModal (false)
  };

  async function fetchPosts() {
    setisPostsLoading(true);
    setTimeout(async() => {    const posts = await PostService.getAll();
      setPosts(posts)
      setisPostsLoading(false);}, 100000)

  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  };

  return (
  <div className='App'>
      <MyButton onClick={() => setModal(true)}>Новый пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
      <PostForm create={createPost}></PostForm>
      </MyModal>
      <hr style={{margin:'15px 0' }}></hr>
      <PostFilter filter={filter} setFilter={setFilter}></PostFilter>
      {isPostsLoading
      ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader></Loader></div>
      : <PostList remove={removePost} posts={sortedAndSearchPosts} title="Список постов"></PostList>
      }
  </div>
  )
}

export default App

//PostForm - форма для создания, PostFilter - форма для фильтрации, PostList - список постов
