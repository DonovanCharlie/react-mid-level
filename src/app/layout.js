"use client";

import { Inter } from 'next/font/google'
import { NotificationContext } from './components/NotificationContext'
import { useContext, createContext, useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  
  const [favorites, setFavorites] = useState(localStorage.getItem("favorites_films") ? JSON.parse(localStorage.getItem("favorites_films")) : []);
  const [notificationsCounter, setNotificationsCounter] = useState(0);
  const [refreshFilmList, setRefreshFilmList] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [filmList, setFilmLilst] = useState([]);
  const [filter, setFilter] = useState("");
  
  //-------- function for closing notification -------------
  const closeNotification = (id) => {
    
    var index = notifications.findIndex(x => x.id === id);
    var tempNotifications = notifications;
    
    if (index != -1) {
      tempNotifications.splice(index, 1);
      setNotifications(tempNotifications);
      setNotificationsCounter(notificationsCounter + 1);
    }
    
  }
  
  //-------- defining the success notification --------------
  const success = () => {
    
    var tempNotifications = notifications;
    const id = notifications.length ? notifications.length + 1 : 0;
    const message = {
      "id":id,
      "type": "success",
      "message":"Film added to favorites!"
    }
    tempNotifications.push(message);
    setNotifications(tempNotifications);
    setNotificationsCounter(notificationsCounter + 1)

  }
  //-------- defining the filter notification --------------
  const filterNotification = () => {
    
    var tempNotifications = notifications;
    const id = notifications.length ? notifications.length + 1 : 0;
    const message = {
      "id":id,
      "type": "warning",
      "message":"You must remove the active filter"
    }
    tempNotifications.push(message);
    setNotifications(tempNotifications);
    setNotificationsCounter(notificationsCounter + 1)

  }
  //-------- defining the remove notification --------------
  const warning = () => {
    var tempNotifications = notifications;
    const id = notifications.length ? notifications.length + 1 : 0;
    const message = {
      "id":id,
      "type": "warning",
      "message":"Film removed from favorites!"
    }
    tempNotifications.push(message);
    setNotifications(tempNotifications);
    setNotificationsCounter(notificationsCounter + 1)
    
  }
  
  //------- useEffect for refreshing notifications list component ----------
  useEffect(() => {
    setNotifications(notifications);
  }, [notificationsCounter])
  
  //--------- useEffect for cleaning notifications list -------------
  useEffect(() => {
    
    if (notifications.length > 0) {
      setTimeout(() => {
        
        var tempNotifications = notifications;
        var removedFirst = tempNotifications.shift()
        
        setNotifications(tempNotifications);
        setNotificationsCounter(notificationsCounter + 1);
        
      },5000)
    }
    
  }, [notificationsCounter])
  
  
  //-------- function for add film to favorites list -----------
  const addToFavorites = (film) => {
    
    var index = favorites.findIndex(x => x.id === film.id); //index for finding film already added
    
    if (index == -1) {
      
      var tempFavorites = [];
      
      if (favorites) tempFavorites = favorites;
      
      tempFavorites.push(film);
      localStorage.setItem("favorites_films", JSON.stringify(tempFavorites))
      setRefreshFilmList(refreshFilmList + 1);
      success();
    }//adding film to favorites list
    
  };
  //-------- function for add film to favorites list -----------

  //-------- function for remove film to favorites list -----------
  const removeToFavorites = (id) => {
    
    var index = favorites.findIndex(x => x.id === id); //index for finding film to remove
   
    if (index != -1) {//if the film is in the list will be removed 
      favorites.splice(index, 1)
      localStorage.setItem("favorites_films", JSON.stringify(favorites))
      setRefreshFilmList(refreshFilmList + 1);
      warning();
    }
  };
  //-------- function for remove film to favorites list -----------

  //-------- function for checking if a film is favorite -----------
  const isFavorite = (id) => {
    var index = favorites.findIndex(x => x.id === id); //index for finding film to remove
    return index == -1 ? false : true;
  }
  //-------- function for checking if a film is favorite -----------

  //-------- category filter ------------
  
  const filterByCategory = (cat) => {
    
    if (filter) {
      filterNotification();
      return
    } 
    
    const results = filmList.filter(film => {
      return film.genres.includes(cat);
    });
    
    setFilter(cat);
    setFilmLilst(results);
  }
  
  //-------- reset category filter ------------

  return (
    
    <html lang="en">
      <body>
        <NotificationContext.Provider
          value={{
            setRefreshFilmList,
            removeToFavorites,
            filterByCategory,
            refreshFilmList,
            addToFavorites,
            setFilmLilst,
            isFavorite,
            setFilter,
            favorites,
            filmList,
            success,
            filter,
          }}
        >
          <main className='w-100 flex column align-center'>
            <div className='main-layout w-100 flex column align-center'>
              {children}
              </div>
              
              <div className='notifications-list'>
                {notifications.map((e, index) => {
                  return (
                    <div key={index} className={`notification ${e.type}`}>
                      <span className='close-notification' onClick={()=>closeNotification(e.id)}>X</span>
                      {e.message}
                    </div>
                    )
                  })
                }
              </div>
          </main>
        </NotificationContext.Provider>
      </body>
    </html>
  )
}
