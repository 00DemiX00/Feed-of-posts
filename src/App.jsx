import React, { useState, useEffect } from 'react';
import './Styles/App.css';
import PostList from './Components/PostList';
import MyButton from './Components/UI/Button/MyButton';
import PostForm from './Components/PostForm';
import PostFilter from './Components/PostFilter';
import MyModal from './Components/UI/Modal/MyModal';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import Loader from './Components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount } from './utils/pages';
import Pagination from './Components/UI/Pagination';



function App() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.post, filter.query);


  const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
  })

  
useEffect(() => {
fetchPosts()
}, [page])

  const createPost = (newPost) => {
    setPosts ([...posts, newPost])
    setModal (false)
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  };

const changePage = (page) => {
  setPage(page)
}

  return (
  <div className='App'>
      <MyButton onClick={() => setModal(true)}>Новый пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
      <PostForm create={createPost}></PostForm>
      </MyModal>
      <hr style={{margin:'15px 0' }}></hr>
      <PostFilter filter={filter} setFilter={setFilter}></PostFilter>
    

      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostsLoading
      ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader></Loader></div>
      : <PostList remove={removePost} posts={sortedAndSearchPosts} title="Список постов"></PostList>
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
        ></Pagination>
  </div>
  )
}

export default App

//PostForm - форма для создания, PostFilter - форма для фильтрации, PostList - список постов
