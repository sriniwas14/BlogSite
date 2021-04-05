import React, { useContext, useState } from 'react'

const DataContext = React.createContext()
const DataUpdaterContext = React.createContext()

const postsList = [
    {
        _id: "a",
        title: "First Post Title",
        excerpt: "Some Rad Content for ya boy",
        postedOn: Date.now(),
        featuredImage: "https://via.placeholder.com/800x500",
        userInfo: {
            firstName: "Sriniwas",
            lastName: "Jha",
            role: "Engineer",
            profilePicture: null
        }
    },
    {
        _id: "b",
        title: "Second Post Title",
        excerpt: "Some Rad Content for ya boy",
        postedOn: Date.now(),
        featuredImage: "https://via.placeholder.com/800x500",
        userInfo: {
            firstName: "Sriniwas",
            lastName: "Jha",
            role: "Engineer",
            profilePicture: null
        }
    }
]

export function useData() {
    return useContext(DataContext)
}

export function useDataUpdate() {
    return useContext(DataUpdaterContext)
}

export function DataProvider({ children }) {
    const [posts, setPosts] = useState(postsList)
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
