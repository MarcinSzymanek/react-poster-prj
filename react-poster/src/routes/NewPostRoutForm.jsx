import Button from '../components/core/Button'
import Modal from '../components/core/Modal'
import styles from './NewPost.module.css'
import { Form, redirect } from 'react-router-dom'
import { submitPost } from '../api_service/apiService'

export function NewPost() {
    console.log('Render newpost')
    return (
        <Modal>
            <Form method="post" className={styles.form}>
                <p>
                    <label htmlFor="body">Text</label>
                    <textarea id="body" name="content" required rows={3} />
                </p>
                <p>
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="author" required />
                </p>
                <Button text="Post" />
            </Form>
        </Modal>
    )
}

export async function action({ request }) {
    const formData = await request.formData()
    const postData = Object.fromEntries(formData)
    await submitPost(postData)
    return redirect('/')
}
