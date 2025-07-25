import { MdPostAdd, MdMessage } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

import classes from './MainHeader.module.css'

function MainHeader({ onCreatePost }) {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <MdMessage />
                React Poster
            </h1>
            <p>
                <NavLink className={classes.button} to={'create-post'}>
                    <MdPostAdd size={18} />
                    New Post
                </NavLink>
            </p>
        </header>
    )
}

export default MainHeader
