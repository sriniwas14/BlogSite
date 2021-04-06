import React, { useContext, useState } from 'react'

const DataContext = React.createContext()
const DataUpdaterContext = React.createContext()

export function useData() {
    return useContext(DataContext)
}

export function useDataUpdate() {
    return useContext(DataUpdaterContext)
}

export function DataProvider({ children }) {
    const [posts, setPosts] = useState([])
    const [userDetails, setUserDetails] = useState({ loggedIn: false })


    return (
        <DataContext.Provider value={
            {
                userDetails,
                posts
            }
        }>
            <DataUpdaterContext.Provider value={
                {
                    setUserDetails,
                    setPosts
                }
            }>
                { children }
            </DataUpdaterContext.Provider>
        </DataContext.Provider>
    )
}
