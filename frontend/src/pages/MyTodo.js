import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useAppContext } from "../context/appContext";

const MyTodo = () => {
  const {getAllLists} = useAppContext()
  const [lists, setLists] = useState()

  useEffect(()=>{
    const fn = async()=>{
      const res = await getAllLists()
      setLists(res);
    }
    fn()
  }, [])
  
  console.log(lists);
  return (
    <div>
    <Navbar/>
    </div>
  )
}

export default MyTodo