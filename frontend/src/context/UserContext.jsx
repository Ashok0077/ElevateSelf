/* eslint-disable react/prop-types */


import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";


export const UserContext=createContext({})


export function UserContextProvider({children}){
    const [user,setUser]=useState(null)

    useEffect(()=>{
      getUser()

    },[])

    const getUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log("No token found");
          return;
        }
  
        const res = await axios.get(URL + "/api/auth/refetch", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    
    return (<UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>)
}