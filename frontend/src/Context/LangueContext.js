import React, { createContext, useEffect, useState } from 'react'

export const LangueContext = createContext()

 export const LangueProvider = ({children}) => {

   const [langue,setlangue]=useState("fr")
   const [formation_id,setformation_id]=useState(null)
   const [valuesModel,SetvaluesModel] = useState({});
   const [selectAll,setselectall] = useState(false);
   const [calcPrix,setCalcPrix]=useState(0)
   const [validationScreen,setvalidationScreen]=useState(false)
   
  return (

    <LangueContext.Provider value={{langue,setlangue,
      valuesModel, SetvaluesModel,
      setformation_id,
    formation_id,selectAll,
    setselectall,calcPrix,setCalcPrix
    ,validationScreen,setvalidationScreen,
    }}>
     {children}
    </LangueContext.Provider>
    
  )
}
