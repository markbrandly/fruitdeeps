import {useState} from 'react'

const ImageFallback = (props) => {
    const [errored, setErrored] = useState(false)
    return errored ? 
        <img src={props.fallback} style={props.style} className={props.className} /> :
        <img src={props.src} style={props.style} className={props.className} onError={()=>{setErrored(true)}}/>
}

export default ImageFallback