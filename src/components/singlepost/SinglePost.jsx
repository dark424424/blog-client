import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './singlepost.css';
import { Context } from '../../context/Context';
import Comment from '../comment/Comment';

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    // const PF = 'http://localhost:5000/images/';
    const PF = 'https://blog-fire.herokuapp.com/images/';
    const { user } = useContext(Context);
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentInfo, setCommentInfo] = useState('');
    const [postID, setPostID] = useState('');

    const getComments = async () => {
        const res = await axios.get(`/api/comments/?postId=${postID}`);
        setComments(res.data);
    };

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('/api/posts/' + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setCategories(res.data.categories);
            setPostID(res.data._id);
        };
        getPost();
    }, [path]);

    useEffect(() => {
        if (postID !== '') {
            getComments();
        }
    }, [postID, path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/${post._id}`, {
                data: { username: user.username },
            });
            window.location.replace('/');
        } catch (err) {
            console.log('Error when deleting post', err);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/posts/${post._id}`, {
                username: user.username,
                title,
                description,
                categories,
            });
            setUpdateMode(false);
        } catch (err) {}
    };

    const handleCreateComment = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/comments/', {
                username: user.username,
                posttitle: title,
                desc: commentInfo,
                postId: postID,
            });
            getComments();
            setCommentInfo('');
        } catch (err) {
            console.log(err);
        }
    };

    //console.log(categories);

    const handleSelectChange = (event) => {
        const selectedCategory = event.target.value;
        if (!categories.includes(selectedCategory) && selectedCategory != '') {
            const newCategories = [...categories, selectedCategory];
            setCategories(newCategories);
        }
    };

    const handleSelectDelete = (e) => {
        if (categories.includes(e)) {
            setCategories(
                categories.filter((cat) => {
                    return cat !== e;
                }),
            );
        }
    };

    const handleDeleteComment = (commentId) => {
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    };

    const handleUpdateComment = (commentText) => {
        getComments();
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && <img className="singlePostImg" src={PF + post.photo} alt="" />}
                {updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i
                                    className="singlePostIcon fa-regular fa-pen-to-square "
                                    onClick={() => setUpdateMode(true)}
                                ></i>
                                <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                            </div>
                        )}
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author :
                        <Link to={`/?user=${post.username}`} className="link">
                            <b> {post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (
                    <textarea
                        className="singlePostDescriptionInput"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                ) : (
                    <p className="singlePostDescription">{description}</p>
                )}

                <div className="singlePostEnd">
                    <div className="singlePostCategories">
                        {updateMode && (
                            <>
                                <select className="categoriesSelect" name="" onChange={(e) => handleSelectChange(e)}>
                                    <option value="">--Add Category--</option>
                                    <option value="Music">Music</option>
                                    <option value="Sport">Sport</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Ranking">Ranking</option>
                                    <option value="Game">Game</option>
                                    <option value="Mystery">Mystery</option>
                                </select>
                            </>
                        )}
                        <ul className="singlePostCategoriesList">
                            About :
                            {categories.map((c, index) => (
                                <span className="categoriesItem" key={index}>
                                    {c}
                                    {updateMode && (
                                        <button
                                            type="submit"
                                            className="categoriesItemButton"
                                            onClick={() => handleSelectDelete(c)}
                                        >
                                            X
                                        </button>
                                    )}
                                </span>
                            ))}
                        </ul>
                    </div>

                    {post.username === user?.username && updateMode && (
                        <button className="singlePostButton" onClick={handleUpdate}>
                            Update
                        </button>
                    )}
                </div>

                <div className="singlePostComment">
                    <div className="singlePostCommentLength">{comments.length} Comments</div>
                    {user && (
                        <>
                            <textarea
                                className="singlePostCommentInput"
                                placeholder="Write Your Comment Here"
                                value={commentInfo}
                                onChange={(e) => setCommentInfo(e.target.value)}
                            ></textarea>
                            <button className="SinglePostCommentBtn singlePostButton" onClick={handleCreateComment}>
                                Comment
                            </button>
                        </>
                    )}
                    <ul className="singlePostCommentList">
                        {comments.length > 0 && (
                            <>
                                {comments.map((c, index) => (
                                    <Comment
                                        comment={c}
                                        key={index}
                                        onDelete={handleDeleteComment}
                                        onUpdate={handleUpdateComment}
                                        postId={post._id}
                                    />
                                ))}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
