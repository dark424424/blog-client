import React from 'react';
import './pagination.css';

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className="paginationWrap">
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="paginationitem">
                        <a onClick={() => paginate(number)} className="paginationLink">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
