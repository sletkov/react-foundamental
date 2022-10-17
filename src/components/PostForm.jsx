import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { useState } from "react";

const PostForm = ({create}) => {

    const [post, setPost] = useState({title: '', content: ''});

    const addNewPost = (e) => {
      e.preventDefault();
      const newPost = {
        id: Date.now(),
        ...post
      }

      create(newPost);
      
      setPost({title: '', body: ''});
    }

    return (
    <form action="">
        <MyInput  value = {post.title} type="text" placeholder="Название поста" onChange={event => setPost({...post, title: event.target.value})}/>
        <MyInput  value = {post.content} type="text" placeholder="Описание поста" onChange={event => setPost({...post, content: event.target.value})}/>
        <MyButton type='submit' onClick={addNewPost}>Добавить пост</MyButton>
    </form>
    )
}

export default PostForm;