import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { variants, getUser, vars } from '../components/Common';
import Repo from '../components/Repo';
import { motion as m } from 'framer-motion';

function User() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        if (!params.login) navigate('/');
        if (!location.state)
            getUser(params.login).then(setUser).catch(error => navigate('/'));
        else
            setUser(location.state);
    }, []);

    return (
        user &&
        <m.div className='user' {...variants}>
            <figure>
                <img src={user.avatar_url} alt={user.login} />
                <h2>{user.name ?? user.login}</h2>
                <ul>
                    <li><span>{user.followers}</span><span>Follower</span></li>
                    <li><span>{user.following}</span><span>Following</span></li>
                    <li><span>{user.public_repos}</span><span>Repository</span></li>
                </ul>
                <a href={user.html_url} >Go to Github</a>
            </figure>
            <ul className='repos'>
                {user.repos.map((repo, i) =>
                    <Repo
                        key={repo.name}
                        {...repo} variants={vars(i)}
                        onClick={() => window.open(repo.html_url, '_blank')}
                    />)}
                {user.repos.length > 0 &&
                    <m.li
                        className='repo' {...vars(5)}>
                        <a href={`${user.html_url}?tab=repositories`} >More on Github</a>
                    </m.li>}
            </ul>
        </m.div>
    )
}

export default User;