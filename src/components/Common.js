import axios from 'axios';
export const projectPath = '';
export const API_URL = 'https://api.github.com/users/';
export const API_KEY = process.env.REACT_APP_GITHUB_TOKEN;

export const variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: { ease: "easeInOut", duration: 0.5 }
    },
    exit: {
        opacity: 0,
        transition: { ease: "easeInOut", duration: 0.4 }
    }
};
export const vars = i => {
    return {
        initial: {
            opacity: 0,
            translateY: "50%"
        },
        animate: {
            opacity: 1,
            translateY: 0,
            transition: { ease: "easeInOut", duration: 0.5, delay: i * 0.08 }
        },
        exit: {
            scale: 0,
            transition: { ease: "easeInOut", duration: 0.4, delay: i * 0.08 }
        }
    };
};

export const getUser = async (login, len = 5) => {
    try {
        const request = {
            url: `${API_URL}${login}`,
            headers: { Authorization: `Bearer ${API_KEY}` }
        };
        const user = await axios(request);
        const repos = await axios({ ...request, url: user.data.repos_url });
        return { ...user.data, repos: repos.data.splice(0, 5) };
    } catch (error) {
        throw error.response;
    }
};