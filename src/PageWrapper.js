// 

import React from 'react'
import { useEffect } from 'react'

const PageWrapper = (props) => {
   
    
    useEffect(()=>{
        document.title=props.title
    },[props.title])
  return (
    <>{props.children}</>
  )
}

export default PageWrapper