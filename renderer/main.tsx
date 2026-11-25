import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import PCPages from './pages/pc-pages'
import './mobile.css'

function getRoute() {
    return window.location.hash.slice(1) || '/home'
}

function Preview() {
    const route = React.useSyncExternalStore(subscribe, getRoute)
    React.useEffect(() => {
        document.getElementById('app_body')?.scrollTo(0, 0)
    }, [route])

    return <App route={route}><PCPages route={route} /></App>
}

function subscribe(onNavigate: () => void) {
    window.addEventListener('hashchange', onNavigate)
    return () => window.removeEventListener('hashchange', onNavigate)
}

createRoot(document.getElementById('root')!).render(<Preview />)
