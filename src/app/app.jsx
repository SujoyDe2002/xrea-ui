import React, { useEffect } from "react"
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { AppStyle } from './app-style'
import './app.css'
import { HomeView } from '../modules'
import CircularIndeterminate from "shared/utils/loader/circularIndeterminate"
import LoadingContextProvider from "store2/loading-context-provider"
import { removeLocalStorageItems } from "shared/utils"

export const App = () => {

    //todo for temporary logout
    useEffect(() => {
        removeLocalStorageItems(["xrea"])
    }, [])


    return (
        <ThemeProvider theme={AppStyle}>
            <LoadingContextProvider>

                <Router>
                    <HomeView />
                </Router>
            </LoadingContextProvider>

        </ThemeProvider>
    )

}