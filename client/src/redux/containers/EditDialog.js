import React from 'react'
import JoinForm from '../components/JoinForm'
import '../styles/Lobby.css'

function EditDialog( { setEdit }) {
    return (
        <div className="dialogContainer">
            <div className="dialogInnerContainer">
                <JoinForm />
                <button id="submitEdit" onClick={() => setEdit(false)}>EDIT</button>
            </div>
        </div>
    )
}

export default EditDialog
