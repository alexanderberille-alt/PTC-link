import React from 'react'

const headerLinks = [
    { name: 'Mes PC', title: 'Afficher les PC', url: '/home' },
    { name: 'Bibliothèque', title: 'Parcourir les jeux du PC', url: '/library' },
    { name: 'Paramètres', title: 'Afficher les paramètres', url: '/settings' },
]

function Header({ route }: { route: string }) {
    const activeUrl = route === '/library' || route.startsWith('/games/')
        ? '/library'
        : route.startsWith('/settings') ? '/settings' : '/home'

    function drawMenu() {
        return headerLinks.map(link => (
            <li key={link.url}>
                <a href={'#' + link.url} title={link.title} aria-current={link.url === activeUrl ? 'page' : undefined}
                    className={link.url === activeUrl ? 'active' : ''}>{link.name}</a>
            </li>
        ))
    }

    return (
        <React.Fragment>
            <div id="component_header" role="navigation" aria-label="Navigation principale">
                <a href="#/home" id="actionBarLogo" aria-label="Accueil PTC-link">
                    <i style={{ display: 'inline-block', fontSize: 18, fontStyle: 'normal', fontWeight: 700 }}>PTC</i>
                </a>

                <ul className="menu">
                    { drawMenu() }
                </ul>
            </div>
        </React.Fragment>
    )
}

export default Header
