import React, { useContext } from 'react'

import { NotificationContext } from './NotificationContext';

const FilmCard = ({ filmData, type }) => {
   
const { addToFavorites, removeToFavorites, isFavorite, filterByCategory } = useContext(NotificationContext);

   
  return (
     <div className='card flex'>
        <div className={isFavorite(filmData.id) == true ? "star active" : "star"} onClick={() => isFavorite(filmData.id) == true ?  removeToFavorites(filmData.id) : addToFavorites(filmData)}>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
        </div>
         <div className='film-img-wrapper'>
               <div className='film-img' style={{backgroundImage:`url(${filmData ? filmData.posterUrl : 'placeholder.png'})`}}/>
         </div>
         <div className='film-data flex column'>
            <div className='title'>
               {filmData.title}
            </div>
            <div className='genres'>
               {filmData.genres.map((category) => {
                  return (
                     <span onClick={() => type === "favorites" ? "" : filterByCategory(category)}>
                        {category}
                     </span>
                  )
               })
               }
            </div>
            <div className='year'>
               Year of release: <b>{filmData.year}</b>
            </div>
            <div className='director'>
               Directed by: <b>{filmData.director}</b>
            </div>
            <div className='plot'>
               {filmData.plot}
            </div>
            <div className='actors'>
               Actors: {filmData.actors}
            </div>
         </div>
      </div>
  )
}

export default FilmCard