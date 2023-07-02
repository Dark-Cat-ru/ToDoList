import {useState} from "react";
import Modal from 'react-modal';
import classes from './ItemVisual.module.scss'

export default function ItemVisual({handle}){
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    Modal.setAppElement('#root');

    const modalStyle ={
        content: {
            margin: '20px auto',
            color: 'black',
            fontSize: '20px',
            display: 'flex',
            justifyContent: 'space-around',
            background: 'transparent',
            border: 'none',
        }
    }


    function handleClick(){
        handle(title, text)
        setTitle('')
        setText('')
        setIsOpen(false)
    }

    function openModal(){
        setIsOpen(true)
    }

    return ( 
        <div className={classes.form}>
            <button onClick={openModal}>Создать дело</button>
            <Modal isOpen={isOpen} style={modalStyle}>
                <form className={classes.form}>
                    <input type='text' placeholder='title' value={title} onChange={(event)=> setTitle(event.target.value)} key='title'/>
                    <input type='text' placeholder='text' value={text} onChange={(event)=> setText(event.target.value)} key='text'/>
                    <button onClick={handleClick}>Добавить дело</button>
                </form>
            </Modal>
        </div>
    )
}