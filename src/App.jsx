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



function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'Название поста 1', body: 'Описание поста 1'},
    {id: 2, title: 'Название поста 2', body: 'Описание поста 2'},
    {id: 3, title: 'Название поста 3', body: 'Описание поста 3'},
  ])
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = useMemo(() => {
    console.log('Отработала функция getSortedPosts')
    if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts;

  }, [selectedSort, posts])
  
  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, sortedPosts])

  const createPost = (newPost) => {
    setPosts ([...posts, newPost])
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  };

const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  return (
  <div className='App'>
      <PostForm create={createPost}></PostForm>
      <hr style={{margin:'15px 0' }}></hr>
      <div>
        <MyInput 
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)} 
        placeholder="Поиск"></MyInput>
        <MySelect
        value={selectedSort}
        onChange={sortPosts}
        defaultValue="Сортировка"
        options={[
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По описанию'}
        ]}
        ></MySelect>
      </div>
      {sortedAndSearchPosts.length
      ?<PostList remove={removePost} posts={sortedAndSearchPosts} title="Список постов 1"></PostList>
      :<h1 style={{textAlign: 'center'}}>Посты не найдены.</h1>
      }

  </div>
  )
}

export default App
