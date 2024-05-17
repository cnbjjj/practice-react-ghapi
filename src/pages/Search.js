import { useState } from 'react'
import logo from '../img/GitHub_Logo.png';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { variants, getUser, vars } from '../components/Common';
import { motion as m } from 'framer-motion';
import { projectPath } from '../components/Common';

function Search() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [err, setErr] = useState('');
    const initial = { 'translateY': "-30%" };
    const exit = { 'translateY': "-30%", opacity: 0 };

    const onSubmit = (data) => {
        getUser(data.login).then(user =>
            navigate(`${projectPath}/user/${user.login}`, { state: user })
        ).catch(error =>
            setErr({ code: error.status, message: error.data.message })
        );
    };

    return (
        <m.div className='search' {...variants}>
            <m.img src={logo} alt='github logo' {...vars(0.55)} initial={initial} exit={exit} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <m.input placeholder='search by username' {...register("login", { required: true, onChange: () => err && setErr(null) })} {...vars(0.75)} initial={initial} exit={exit} />
                <span className={err ? 'in' : 'out'}>{err && `User not found. ( ${err.code} )`} </span>
            </form>
        </m.div>
    )
}

export default Search