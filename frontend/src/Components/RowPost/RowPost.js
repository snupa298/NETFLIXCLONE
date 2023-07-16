import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {API_KEY, imageUrl} from '../../constants/constants'
import "./RowPost.css"
import Youtube from "react-youtube"

 function RowPost(props) {

    const[movies,setMovies]=useState([])
    const[urlId,setUrlId]=useState("")

useEffect(()=>{
    // axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`)
    axios.get(props.url)
    .then((res)=>{
        console.log(res.data.results)
        setMovies(res.data.results)
    }).catch(er=>{
        // alert("Network error")
    })
},[])

const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const handleMovie = (id) =>{
console.log(id)
axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
.then(res=>{
  console.log(res.data)
  if(res.data.results.length !== 0){
    setUrlId(res.data.results[0])
  }
})
}

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj)=>(
            <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? "smallPoster":"poster"} alt='ggh' src= {`${imageUrl + obj.backdrop_path}`}/>
       
        ))}
        
      </div>

{ urlId && <Youtube opts={opts} videoId={urlId.key}/>}

    </div>
  )
}

export default RowPost;
