import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todos from './components/Todos'
import Addtodo from './components/Addtodo'
import Header  from './components/Header'

function App() {
 
  return (
    <>
    <Header/>
    <Addtodo/>
  <Todos/>
 
    </>
  )
}

export default App
