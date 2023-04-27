import React from "react"
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { AppStyle } from './app-style'
import './app.css'
import { HomeView } from '../modules'

export const App = () => (
    <ThemeProvider theme={AppStyle}>
        <Router>
            <HomeView />
        </Router>
    </ThemeProvider>

)