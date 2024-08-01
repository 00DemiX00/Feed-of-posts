import React, { useState } from 'react';
import './Styles/App.css';
import Counter from './Components/Counter';
import ClassCounter from './Components/ClassCounter';
import PostItem from './Components/PostItem';
import PostList from './Components/PostList';
import MyButton from './Components/UI/Button/MyButton';
import MyInput from './Components/UI/Input/MyInput';



function App() {
  
  const [posts, setPosts] = useState([
    {id: 1, title: 'Название поста 1', body: 'Описание поста 1'},
    {id: 2, title: 'Название поста 2', body: 'Описание поста 2'},
    {id: 3, title: 'Название поста 3', body: 'Описание поста 3'},
  ])
  
const [post, setPost] = useState({title: '', body: ''})



const addNewPost = (e) => {
  e.preventDefault()
  setPosts ([...posts, {...post, id: Date.now()}]);
  setPost ({title: '', body: ''})
  }

  return (
  <div className='App'>
    <form>
      <MyInput value={post.title} onChange={e => setPost({...post, title: e.target.value})} type='text' placeholder='Название поста'></MyInput>
      <MyInput value={post.body} onChange={e => setPost({...post, body: e.target.value})} type='text' placeholder='Название поста'></MyInput>
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
     <PostList posts={posts} title="Список постов 1"></PostList>

  </div>
  );
}

export default App
