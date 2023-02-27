import Home from './pages/home/Home.jsx';
import TopBar from './components/topbar/TopBar.jsx';
import Single from './pages/single/Single.jsx';
import Write from './pages/write/Write.jsx';
import Settings from './pages/settings/Settings.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import './App.css';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context.jsx';
import About from './pages/about/About.jsx';

function App() {
    const { user } = useContext(Context);
    return (
        <Router>
            <TopBar />
            <div className="app">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/posts">
                        <Home />
                    </Route>
                    <Route path="/register">{user ? <Home /> : <Register />}</Route>
                    <Route path="/login">{user ? <Home /> : <Login />}</Route>
                    <Route path="/post/:id">
                        <Single />
                    </Route>
                    <Route path="/write">{user ? <Write /> : <Login />}</Route>
                    <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
                    <Route path="/about">
                        <About />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
export default App;
