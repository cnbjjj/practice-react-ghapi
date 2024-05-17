import { motion as m } from 'framer-motion'

function Repo({ name, updated_at, description, variants, onClick }) {
    return (
        <m.li className='repo' {...variants} onClick={onClick}>
            <div>
                <h4>{name}</h4>
                <span>{updated_at}</span>
            </div>
            {description && <p>{description}</p>}
        </m.li>
    )
}

export default Repo