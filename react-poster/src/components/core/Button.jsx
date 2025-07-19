import styles from "./Button.module.css"

export default function Button({onClick, text})
{
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={onClick}>{text}</button>
        </div>
    )
}