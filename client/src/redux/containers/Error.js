import React from 'react'
import { useDispatch } from 'react-redux'
import { hideErrorBox } from '../actions/actions'
import { Link } from 'react-router-dom'
import '../styles/Join.css'

function Error({ error = '404 PAGE NOT FOUND' }) {
    const dispatch = useDispatch()
    
    return (
        <div id="errorContainer">
            <div id="errorContent">
                <p> OOPS, SORRY!</p>
                <p>{ error }</p>
                <Link onClick={() => dispatch(hideErrorBox())} to={`/`}>
                    <button id="homeButton">
                        <img src={process.env.PUBLIC_URL +'/ufo.png'} alt="ufoIcon"></img>
                        <span>GO HOME</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}


export default Error
