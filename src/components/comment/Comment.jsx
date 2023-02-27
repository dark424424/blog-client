import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { Context } from '../../context/Context';
import './comment.css';

export default function Comment({ comment, onDelete, onUpdate, postId }) {
    const date = new Date(comment.updatedAt);
    const formattedDate = date.toLocaleDateString('en-GB');
    const [updateMode, setUpdateMode] = useState(false);
    const { user } = useContext(Context);
    const [commentText, setCommentText] = useState(comment.desc);
    const inputRef = useRef(null);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/comments/${comment._id}`, {
                data: { username: user.username },
            });
            onDelete(comment._id);
        } catch (err) {}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/comments/${comment._id}`, {
                desc: commentText,
                posttitle: comment.posttitle,
                username: user.username,
                postId: postId,
            });
            onUpdate(commentText);
            setUpdateMode(false);
        } catch (err) {}
    };

    const handleClickEdit = () => {
        setUpdateMode(true);
    };

    return (
        <div className="commentItem">
            <div className="commentItemAuthor">
                <div className="commentItemAuthorText">
                    Comment by <span> {comment.username} </span>:
                </div>
                {comment.username === user?.username && (
                    <div className="singlePostEdit">
                        <i className="singlePostIcon fa-regular fa-pen-to-square " onClick={handleClickEdit}></i>
                        <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                    </div>
                )}
            </div>
            <div className="commentItemDate">{formattedDate}</div>

            {updateMode ? (
                <form className="commentItemInfoForm" onSubmit={(e) => handleSubmit(e)}>
                    <textarea
                        className="commentItemInfoInput"
                        value={commentText}
                        onChange={(e) => {
                            setCommentText(e.target.value);
                        }}
                        ref={inputRef}
                    />
                    <button className="commentItemInfoBtn" type="submit">
                        Save
                    </button>
                </form>
            ) : (
                <div className="commentItemInfo">{comment.desc}</div>
            )}
        </div>
    );
}
