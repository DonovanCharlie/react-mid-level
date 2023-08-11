"use client";

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { NotificationContext } from './components/NotificationContext';
import FilmCard from './components/FilmCard';
import styles from './style.scss'

export default function Home() {
  
  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(0);
  
  const router = useRouter();

  const { refreshFilmList, filmList, setFilmLilst, setFilter, filter,setRefreshFilmList } = useContext(NotificationContext);
  
  useEffect(() => {
    
    try {
      (async ()=>{
        const res = await fetch(`https://mttlioitimpeuzlwsgql.supabase.co/rest/v1/movies?limit=${rows}`, {
          method: "GET",
          headers: {
          apiKey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dGxpb2l0aW1wZXV6bHdzZ3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0MjM3MDAsImV4cCI6MjAwNjk5OTcwMH0.yEpNXeO-cwzp_tBNeITxr2RRytwbcVnMlarJs0cpNYY",
          },
        }).then((t) => t.json());
        setFilmLilst(res);
      })();
    } catch (error) {
      console.log(error)
    }
    
  }, [refreshFilmList])
  
  const resetFilter = () => {
    setRefreshFilmList(refreshFilmList + 1);
    setFilter("");
  }
  
  return (
      <>
        {/* ---------- page header ----------  */}
      <div className='header flex column space-between align-center w-100 p-10'>
          <div className='flex space-between align-center w-100'>
            <div className='page-title bold'>
              MOVIES
            </div>
            <div className='button flex gap-5 align-center' onClick={() => router.push("/favorites-film")}>
              <div>Favorites</div>
              <div className='icon h-100 flex align-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
              </div>
            </div>
          </div>
      
          {/* ---------- filter active ----------  */}
          {filter &&
            <div className='filter-active genres w-100'>
              Filtro attivo: <span onClick={resetFilter}>X {filter}</span>
            </div>
          }
        
        
        </div>
        {/* ---------- page header ----------  */}
      
        {/* ---------- film list ----------  */}
        <div className='film-list'>
          {filmList.map((e) => {
              return (
                <FilmCard key={e.id} filmData={e} />
              )
            })
          }
        </div>
        {/* ---------- film list ----------  */}
      </>
  )
}
