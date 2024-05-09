import React, { useEffect, useState } from 'react'

const CleanUp:React.FC = () => {
  const [currentNum, setCurrentNum] = useState(0)
  const incrementNum = () => {
    console.log("Mouse event invoked!")
    setCurrentNum((preNumber) => preNumber+1)
  }
  useEffect(() => {
    console.log("useEffect in CleanUp invoked!")
    window.addEventListener("mousedown", incrementNum)
    // removeしないと裏でイベントリスナーが走ってしまう
    return ()=>{
      console.log("cleanup invoked!")
      window.removeEventListener("mousedown", incrementNum)
    }
  },[])
  return <div>{currentNum}</div>
}

export default CleanUp