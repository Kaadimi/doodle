import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr'
import '../styles/Join.css'
import { setName, setPlayer } from '../actions/actions'

function JoinForm() {
    const dispatch = useDispatch()
    const {name} = useSelector(state => state.room)
    const [index, setIndex] = useState(0)
    const slide = useRef(null)
    const imgSize = 90
    const margin = 20
    const players = ['earth', 'mars' , 'venus' , 'neptune', 'uranus' , 'jupiter', 'saturn', 'mercury']

    const nextSlide = (evt) => {
        evt.preventDefault()
        if (index === (players.length - 1)) {
            slide.current.style.transition = 'none'
            slide.current.childNodes[index + 1].style.filter = 'grayscale(70%)'
            setIndex(0)
        } else {
            setIndex(prevIndex => {
                slide.current.style.transition = 'transform 0.5s ease-in-out'
                slide.current.childNodes[prevIndex + 2].style.filter = 'none'
                slide.current.childNodes[prevIndex + 1].style.filter = 'grayscale(70%)'
                return prevIndex + 1
            })
        }
    }

    const prevSlide = (evt) => {
        evt.preventDefault()
        if (index === 0) {
            slide.current.style.transition = 'none'
            slide.current.childNodes[index + 1].style.filter = 'grayscale(70%)'
            slide.current.childNodes[players.length].style.filter = 'none'
            setIndex(players.length - 1)
        } else {
            setIndex(prevIndex => {
                slide.current.style.transition = 'transform 0.5s ease-in-out'
                slide.current.childNodes[prevIndex].style.filter = 'none'
                slide.current.childNodes[prevIndex + 1].style.filter = 'grayscale(70%)'
                return prevIndex - 1
            })
        }
    }

    useEffect(() => {
        if (index === 0)
            slide.current.childNodes[index + 1].style.filter = 'none'
        slide.current.style.transform = `translateX(${-((imgSize + margin) * index)}px)`
        dispatch(setPlayer(players[index]))
    }, [index])
    
    return (
        <div>
            <input id="nameInput" placeholder="Name..." type="text" value={name} onChange={(event) => dispatch(setName(event.target.value))}></input>
            <div className="CarouselContainer">
                <div className="CarouselSlide" ref={slide}>
                    <img alt="" width={imgSize} height={imgSize} src={process.env.PUBLIC_URL +'/mercury.png'}></img>
                    {players.map(player => <img alt={player} key={player} width={imgSize} height={imgSize} src={process.env.PUBLIC_URL +'/' + player + '.png'}></img>)}
                    <img alt="" width={imgSize} height={imgSize} src={process.env.PUBLIC_URL +'/earth.png'}></img>
                </div>
                <div className="CarouselActions">
                    <button id="PrevButton" onClick={(evt) => prevSlide(evt)}>
                        <GrCaretPrevious size={24}/>
                    </button>
                    <button id="NextButton" onClick={(evt) => nextSlide(evt)}>
                        <GrCaretNext size={24}/> 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JoinForm
