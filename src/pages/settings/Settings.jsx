import { useContext, useState, useEffect } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import Validator from '../../components/validator/Validator';
import Sidebar from '../../components/sidebar/SideBar';
import './settings.css';

export default function Setting() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const { user, dispatch } = useContext(Context);
    const [isValid, setIsValid] = useState(false);

    const PF = 'https://blog-fire.herokuapp.com/images/';

    useEffect(() => {
        Validator({
            form: '#form-2',
            errorSelector: '.formMessage',
            rules: [
                Validator.isRequired('.settingFormUsername'),
                Validator.minLength('.settingFormUsername', 4),
                Validator.isEmail('.settingFormEmail'),
                Validator.minLength('.settingFormPassword', 6),
            ],
            onSubmit: function (data) {
                setIsValid(data);
            },
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValid) {
            dispatch({ type: 'UPDATE_START' });
            const updatedUser = {
                userId: user._id,
                username,
                email,
                password,
            };
            if (file) {
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append('name', filename);
                data.append('file', file);
                updatedUser.profilePicture = filename;
                try {
                    await axios.post('/api/upload', data);
                } catch (err) {}
            }
            try {
                const res = await axios.put('/api/users/' + user._id, updatedUser);
                dispatch({ type: 'UPDATE_SUCCESS', playload: res.data });
                setIsValid(false);
                setSuccess(true);
            } catch (err) {
                dispatch({ type: 'UPDATE_FAILURE' });
            }
        }
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Your Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit} id="form-2">
                    <label htmlFor="">Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            className="settingsImg"
                            src={file ? URL.createObjectURL(file) : PF + user.profilePicture}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <div className="settingFormGroup">
                        <label htmlFor="">Username</label>
                        <input
                            className="settingFormUsername"
                            type="text"
                            placeholder={user.username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <span className="formMessage"></span>
                    </div>
                    <div className="settingFormGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            className="settingFormEmail"
                            type="email"
                            placeholder={user.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="formMessage"></span>
                    </div>
                    <div className="settingFormGroup">
                        <label htmlFor="">Password</label>
                        <input
                            className="settingFormPassword"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="formMessage"></span>
                    </div>
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>
                    {success && (
                        <span style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>
                            Profile has been updated....
                        </span>
                    )}
                </form>
            </div>
            <Sidebar />
        </div>
    );
}
