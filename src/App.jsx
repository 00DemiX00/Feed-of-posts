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



function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'Название поста 1', body: 'Описание поста 1'},
    {id: 2, title: 'Название поста 2', body: 'Описание поста 2'},
    {id: 3, title: 'Название поста 3', body: 'Описание поста 3'},
  ])
  
  const [filter, setFilter] = useState({sort: '', query: ''})

  const sortedPosts = useMemo(() => {
    console.log('Отработала функция getSortedPosts')
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;

  }, [filter.sort, posts])
  
  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts ([...posts, newPost])
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  };

  return (
  <div className='App'>
      <PostForm create={createPost}></PostForm>
      <hr style={{margin:'15px 0' }}></hr>
      <PostFilter filter={filter} setFilter={setFilter}></PostFilter>
      {sortedAndSearchPosts.length
      ?<PostList remove={removePost} posts={sortedAndSearchPosts} title="Список постов 1"></PostList>
      :<h1 style={{textAlign: 'center'}}>Посты не найдены.</h1>
      }

  </div>
  )
}

export default App
