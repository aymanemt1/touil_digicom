import React, { createContext, useState } from 'react'

export const LangueContext = createContext()

 export const LangueProvider = ({children}) => {

   const [langue,setlangue]=useState("fr")
  return (

    <LangueContext.Provider value={{langue,setlangue}}>
     {children}
    </LangueContext.Provider>
    
  )
}
