import React, { useState, useEffect } from 'react'
import "./style.css";

const UseEffect = () => {
    const initialdata=0;
    const [myNum,setMyNum]=useState(initialdata);

    useEffect(()=>{
        document.title=`Chats(${myNum})`;
    });
  return (
    <>
      <div className='center_div'>
        <p>{myNum}</p>
        <div class="button2" onClick={()=>setMyNum(myNum+1)}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            INCR
        </div>
      
      </div>
    </>
  )
}

export default UseEffect;
