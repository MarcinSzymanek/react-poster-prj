import { useNavigate } from 'react-router-dom'
import classes from './Modal.module.css'
import { useEffect } from 'react'

export default function Modal({ children, visibility, onClickOutside }) {
    const navigate = useNavigate()
    function closeHandler() {
        navigate('..')
    }

    useEffect(() => {
        function keyDownHandler(event) {
            if (event.key == 'Escape') closeHandler()
        }

        document.addEventListener('keydown', keyDownHandler)

        return function cleanup() {
            document.removeEventListener('keydown', keyDownHandler)
        }
    }, [])

    return (
        <>
            <div
                hidden={false}
                className={classes.backdrop}
                onMouseDown={closeHandler}
            />
            <dialog open={true} className={classes.modal}>
                {children}
            </dialog>
        </>
    )
}
