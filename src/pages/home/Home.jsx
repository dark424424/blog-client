import Header from '../../components/header/Header';
import SideBar from '../../components/sidebar/SideBar';
import Posts from '../../components/posts/Posts';
import Pagination from '../../components/pagination/Pagination';
import './home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import Footer from '../../components/footer/Footer';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('/api/posts' + search);
            setPosts(res.data);
            setLoading(false);
        };
        fetchPosts();
    }, [search]);
    // console.log(posts);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <div className="home">
                <div className="pageandnum">
                    <Posts posts={currentPosts} loading={loading} />
                    <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
                </div>
                <SideBar />
            </div>
            <Footer />
        </>
    );
}
