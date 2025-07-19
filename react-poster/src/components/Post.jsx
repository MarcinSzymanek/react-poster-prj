import styles from './Post.module.css'
import { Link } from 'react-router-dom'

function Post({ postData }) {
    return (
        <div className={styles.post}>
            <Link to={postData.id}>
                <h2 className={styles.name}>{postData.author}</h2>
                <span className={styles.content}>{postData.content}</span>
            </Link>
        </div>
    )
}

export default Post
