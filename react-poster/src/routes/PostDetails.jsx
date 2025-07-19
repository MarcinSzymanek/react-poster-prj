import { useLoaderData, Link } from 'react-router-dom'

import Modal from '../components/core/Modal'
import classes from './PostDetails.module.css'
import { getPost } from '../api_service/apiService'

export function PostDetails() {
    const res = useLoaderData()

    if (!res.result) {
        return (
            <Modal>
                <div className={classes.details}>
                    <h1>Could not find post</h1>
                    <p>Unfortunately, the requested post could not be found.</p>
                    <p>
                        <Link to=".." className={classes.btn}>
                            Okay
                        </Link>
                    </p>
                </div>
            </Modal>
        )
    }
    const post = res.data.post
    return (
        <Modal>
            <div className={classes.details}>
                {console.log(post)}
                <p className={classes.author}>{post.author}</p>
                <p className={classes.text}>{post.content}</p>
            </div>
        </Modal>
    )
}

export async function loader({ params }) {
    console.log('loader post single')
    console.log('param id: %s', params.id)
    let postData = getPost(params.id)
    console.log(postData)
    return postData
}
