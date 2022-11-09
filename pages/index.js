import Head from 'next/head'
import Image from 'next/image'
import { useState} from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const randId=Math.floor(Math.random()*500)
const [inputVal,setInputVal]=useState()  

  
  return (
    <div className="text-2xl text-slate-600 justify-center align-items-center flex w-[300px] h-[300px] m-auto flex-col">
<a href="/single">Single Player</a>
<h2 className='mt-5'>Multiplayer</h2>
<a href={`/multi/${randId}`}>Host A game</a>
<div className='mt-5'>
<input type="text" className='border-2 border-solid' value={inputVal} onChange={(e)=>setInputVal(e.target.value)} placeholder={"Please enter host number"}/>
<a href={`/multi/${inputVal}`}>Join A game</a>
</div>
    </div>
  )
}
