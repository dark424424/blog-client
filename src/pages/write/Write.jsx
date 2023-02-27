import axios from 'axios';
import { useContext, useState } from 'react';
import Footer from '../../components/footer/Footer';
import { Context } from '../../context/Context';
import './write.css';

export default function Write() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    const [categories, setCategories] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            description,
            categories,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            newPost.photo = filename;
            try {
                await axios.post('/api/upload', data);
            } catch (err) {
                console.log(1);
            }
        }
        try {
            const res = await axios.post('/api/posts', newPost);
            window.location.replace('/post/' + res.data._id);
        } catch (err) {
            console.log(2);
        }
    };

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

    return (
        <div className="writePage">
            <div className="write">
                {file && <img className="writeImg" src={URL.createObjectURL(file)} alt="" />}
                <form className="writeForm" onSubmit={handleSubmit}>
                    <div className="writeFormGroup">
                        <label htmlFor="fileInput">
                            <i className="writeIcon fa-sharp fa-solid fa-plus"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <input
                            type="text"
                            placeholder="Title"
                            className="writeInput"
                            autoFocus={true}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="writeCategories">
                        <select className="categoriesSelect " name="" onChange={(e) => handleSelectChange(e)}>
                            <option value="">--Add Category--</option>
                            <option value="Music">Music</option>
                            <option value="Sport">Sport</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Ranking">Ranking</option>
                            <option value="Game">Game</option>
                            <option value="Mystery">Mystery</option>
                        </select>
                        <span className="writeCategoriesText">About :</span>
                        {categories.map((c, index) => (
                            <span className="wCategoriesItem" key={index}>
                                {c}
                                <button
                                    type="submit"
                                    className="categoriesItemButton"
                                    onClick={() => handleSelectDelete(c)}
                                >
                                    X
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="writeFormGroup">
                        <textarea
                            placeholder="Tell your story...."
                            type="text"
                            className="writeInput writeText"
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <button className="writeSubmit" type="submit">
                        Publish
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
