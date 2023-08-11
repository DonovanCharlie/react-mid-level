"use client";

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { NotificationContext } from '../components/NotificationContext';
import FilmCard from '../components/FilmCard';
import styles from '../style.scss'

export default function FavoritesFilms() {
  
  const { favorites } = useContext(NotificationContext);
  const router = useRouter();
  
  return (
      <>
        {/* ---------- page header ----------  */}
        <div className='header flex space-between align-center w-100 p-10'>
          <div className='page-title bold'>
            FAVORITES
          </div>
          <div className='button flex gap-5 align-center' onClick={() => router.push("/")}>
            <div className='icon h-100 flex align-center reverse'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
            </div>
            <div>Back</div>
          </div>
        </div>
        {/* ---------- page header ----------  */}
        
        {/* ---------- film list ----------  */}
        <div className='film-list'>
          {favorites.map((e) => {
              return (
                <FilmCard key={e.id} filmData={e} type="favorites" />
              )
            })
          }
        </div>
        {/* ---------- film list ----------  */}
      </>
  )
}
