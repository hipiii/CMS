import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormData from './FormData'
import Table from './Table'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FormData />
      <Table />
    </>
  )
}

export default App
