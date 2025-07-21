import { useRef } from "react";
import Button from "../components/core/Button";
import Modal from "../components/core/Modal";
import styles from "./NewPost.module.css";

export default function NewPost({ onClickSubmit }) {
  const author = useRef("");
  const content = useRef("");
  const formRef = useRef(null);

  const reset = () => {
    author.current = "";
    content.current = "";
    formRef.current.reset();
  };

  const submit = (event) => {
    event.preventDefault();
    if (author.current.length < 1 || content.current.length < 1) {
      onClickSubmit(false, null);
    } else {
      onClickSubmit(true, {
        author: author.current,
        content: content.current,
      });
    }
    reset();
  };

  const updateAuthor = (event) => {
    author.current = event.target.value;
  };

  const updateContent = (event) => {
    content.current = event.target.value;
  };
  console.log("Render newpost");
  return (
    <Modal>
      <form ref={formRef} className={styles.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required rows={3} onChange={updateContent} />
        </p>
        <p>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" required onChange={updateAuthor} />
        </p>
        <Button onClick={submit} text="Post" />
      </form>
    </Modal>
  );
}
