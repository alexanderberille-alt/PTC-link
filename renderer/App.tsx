import React from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'

interface AppProps {
    route: string
    children?: React.ReactNode
}

export default function App({ route, children }: AppProps) {
    return (
        <React.Fragment>
            <Header route={route} />

            <div id="app_body">
                <div id="app_body_container">
                    {route === '/home' || route === '/' ? <Home /> : children}
                </div>
            </div>

            <div id="app_sidebar">
                <div id="components_sidebarfriends">
                    <div className='components_sidebarfrienditem'>
                        <div className='components_sidebarfrienditem_userdetails'>
                            <p>Aperçu local · PC de démonstration</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}
