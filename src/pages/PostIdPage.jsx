import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/loader/Loader';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getPostById(id);
        setPost(response.data);
    })

    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchComments(params.id);
    }, [])
    
    return (
        <div>
            <h1>Страница поста c ID = {params.id}</h1>
            { isLoading
                ? <Loader/>
                :  <div>{post.id}. {post.title}</div>
            }

            <h2>Комментарии</h2>

            { isCommentsLoading
                ? <Loader/>
                : <div>
                    {comments.map(comment => 
                        <div key={comment.id} style={{marginTop: 15}}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
           
        </div>
    )
}

export default PostIdPage;
