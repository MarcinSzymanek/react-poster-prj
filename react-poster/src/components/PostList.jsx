import Post from './Post'
import postStyles from './Post.module.css'
import styles from './PostList.module.css'

export default function PostList({ datap }) {
    let keyId = 0
    return (
        <div>
            <ul className={styles.list}>
                {datap.map((post) => (
                    <li className={styles.listItem} key={keyId++}>
                        <Post
                            postData={{
                                id: post.id,
                                author: post.author,
                                content: post.content,
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
