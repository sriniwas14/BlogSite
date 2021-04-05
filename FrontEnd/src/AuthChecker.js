import jwtDecode from "jwt-decode"

import React, { useEffect } from 'react'
import { useData, useDataUpdate } from "./DataContext"



const checkToken = (callback) => {
    const token = localStorage.getItem("token")

    if(token){
        try {
            const decodedToken = jwtDecode(token)
            decodedToken.token = token
            const currentTimestamp = Math.ceil((new Date()).getTime()/1000)

            if(decodedToken.exp<currentTimestamp){
                console.log(decodedToken, currentTimestamp)
                return callback(false)
            }

            callback(true, decodedToken)
        } catch (err) {
            console.log("Invalid Token ", err)
        }
        return
    } else {
        callback(false)
        return
    }
}

export default function AuthChecker({ children }) {
    const dataContext = useData()
    const dataUpdaterContext = useDataUpdate()

    useEffect(() => {
        console.log("A")
        checkToken((status, decodedToken) => {

            console.log("B", status, decodedToken)
            if(status){
            dataUpdaterContext.setUserDetails({
              loggedIn: true,
              userDetails: decodedToken
            })
          }
        })
      }, [])

    return (
        <>
            {children}
        </>
    )
}