import React,{createContext,useState} from "react";

const IndexContext=createContext({});

export const IndexContextProvider = ({children}) =>{
    const [indexOfSection,setIndexOfSection]=useState(0);


const value={
    indexOfSection,
    setIndexOfSection
};
return (
    <IndexContext.Provider value={value}>{children}</IndexContext.Provider>
);
}

export default IndexContext;