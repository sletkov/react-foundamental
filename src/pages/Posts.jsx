import {useState, useMemo, useEffect, useRef} from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyButton from "../components//UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import MySelect from "../components/UI/select/MySelect";
import Pagination from "../components/UI/pagination/Pagination";


import '../styles/App.css'
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPagesCount } from '../utils/pages'
import { useReducer } from "react";
import { useObserver } from "../hooks/useObserver";

const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '' , query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();


  const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {;
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton onClick={fetchPosts}>Запросить посты</MyButton>
      <MyButton style={{marginTop: "30px"}} onClick={()=> setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <MySelect
        value = {limit}
        onChange={value => setLimit(value)}
        defaultValue='Кол-во элементов на странице'
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name :'25'},
          {value: 25, name :'25'},
          {value: -1, name :'Показать всё'},
        ]}
      />
      {postError &&
        <h1>Произошла ошибка {postError}</h1>
      }
        <PostList remove ={removePost} posts = {sortedAndSearchedPosts} title = 'Список постов про Javascript'/>
        <div ref={lastElement} style={{height:20, background: 'red'}}></div>
      {
        isPostsLoading &&
        <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}><Loader/></div>
      }
        <Pagination totalPages={totalPages} page={page} changePage={changePage}/>

    </div>
  );
}

export default Posts;
