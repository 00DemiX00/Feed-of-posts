import React, { useState, useMemo } from 'react';
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



function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'Название поста 1', body: 'Описание поста 1'},
    {id: 2, title: 'Название поста 2', body: 'Описание поста 2'},
    {id: 3, title: 'Название поста 3', body: 'Описание поста 3'},
  ])
  
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchPosts = usePosts(posts, filter.post, filter.query);

  const createPost = (newPost) => {
    setPosts ([...posts, newPost])
    setModal (false)
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
      <PostList remove={removePost} posts={sortedAndSearchPosts} title="Список постов 1"></PostList>
  </div>
  )
}

export default App

//PostForm - форма для создания, PostFilter - форма для фильтрации, PostList - список постов
