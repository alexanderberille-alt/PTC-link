import React from 'react'
import BreadcrumbBar from '../components/ui/breadcrumbbar'
import Button from '../components/ui/button'
import Card from '../components/ui/card'
import GameTitle from '../components/ui/game/title'
import StreamPreload from '../components/ui/streampreload'
import ViewportGrid from '../components/ui/viewportgrid'
import SettingsSidebar from '../components/settings/sidebar'
import { pc } from '../pc'
import './pc-pages.css'

const games = [
    { id: 'persona', name: 'Persona 3 Reload', genre: 'RPG', description: 'Explore Tartarus et retrouve tes amis au fil de l’année scolaire.' },
    { id: 'night-circuit', name: 'Night Circuit', genre: 'Course', description: 'Un jeu de course fictif pour essayer la bibliothèque.' },
    { id: 'brumeval', name: 'Brumeval', genre: 'Aventure', description: 'Un jeu d’aventure fictif pour essayer la bibliothèque.' },
]

type Game = typeof games[number]

function Library() {
    const [searchTerm, setSearchTerm] = React.useState('')
    const titles = games.filter(item => item.name.toLocaleLowerCase('fr').includes(searchTerm.trim().toLocaleLowerCase('fr')))

    return (
        <React.Fragment>
            <BreadcrumbBar>
                <a href="#/home">Mes PC</a>
                <a href="#/library">Bibliothèque</a>
            </BreadcrumbBar>
            <h2 className="title pc-library-title">
                Bibliothèque
                <input type="search" className="text h2-search" placeholder="Rechercher un jeu" aria-label="Rechercher un jeu"
                    value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
            </h2>

            {titles.length === 0 ? (
                <div role="status" style={{textAlign: 'center', padding: '60px 20px', color: '#aaa'}}>Aucun jeu trouvé.</div>
            ) : (
                <ViewportGrid drawPagination={true}>
                    {titles.map(item => <GameTitle titleId={item.id} name={item.name} key={item.id} />)}
                </ViewportGrid>
            )}
        </React.Fragment>
    )
}

function GameInfo({ game }: { game: Game }) {
    return (
        <React.Fragment>
            <BreadcrumbBar>
                <a href="#/home">Mes PC</a>
                <a href="#/library">Bibliothèque</a>
                <a href={'#/games/' + game.id}>{game.name}</a>
            </BreadcrumbBar>
            <div id="page_info_titleid">
                <div id="page_info_hero">
                    <h1>{game.name}</h1>
                    <h2>{pc.name}</h2>
                </div>
                <div id="page_info_titleid_sidebar">
                    <Button label="Jouer" className="btn-primary" onClick={() => { location.hash = '/stream/' + pc.id + '/' + game.id }} />
                </div>
                <div id="page_info_titleid_content">
                    <h3>Description</h3>
                    <p>{game.description}</p>
                    <h3>Caractéristiques</h3>
                    <div><span className="page_info_pill">{game.genre}</span><span className="page_info_pill">{pc.platform}</span></div>
                </div>
            </div>
        </React.Fragment>
    )
}

const bitrateKey = 'ptc-link.greenlight.bitrate'
let previewBitrate = 10240

function loadBitrate() {
    try {
        const stored = localStorage.getItem(bitrateKey)
        if (stored !== null) {
            const value = Number(stored)
            if (value >= 0 && value <= 40960 && value % 1024 === 0) return value
        }
    } catch { /* Storage can be unavailable in a downloaded preview. */ }
    return previewBitrate
}

export default function PCPages({ route }: { route: string }) {
    const [bitrate, setBitrate] = React.useState(loadBitrate)
    const bitrateLabel = bitrate === 0 ? 'Automatique' : Math.floor(bitrate / 1024) + ' Mbit/s'

    function setPCBitrate(event: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(event.target.value)
        previewBitrate = value
        setBitrate(value)
        try {
            localStorage.setItem(bitrateKey, String(value))
        } catch { /* Keep the selection in memory. */ }
    }

    if (route === '/library') return <Library />

    if (route === '/settings' || route === '/settings/streaming') {
        return (
            <SettingsSidebar route={route}>
                {route === '/settings' ? (
                    <Card className="padbottom">
                        <h1>À propos</h1>
                        <p>PTC-link · Aperçu de Greenlight pour PC</p>
                        <p>{pc.name} · {pc.platform} · {pc.connection}</p>
                    </Card>
                ) : (
                    <Card className="padbottom">
                        <h1>Diffusion</h1>
                        <p>Choisis le débit affiché pendant la session de démonstration.</p>
                        <p>
                            <label htmlFor="pc-bitrate">Débit de la diffusion PC</label>
                            <input id="pc-bitrate" type="range" min="0" max="40960" step="1024" value={bitrate} onChange={setPCBitrate} />
                            <output htmlFor="pc-bitrate">{bitrateLabel}</output>
                        </p>
                    </Card>
                )}
            </SettingsSidebar>
        )
    }

    const [, section, id, gameId] = route.split('/')
    const game = games.find(item => item.id === (section === 'stream' ? gameId : id))
    if (section === 'games' && game) return <GameInfo game={game} />
    if (section === 'stream' && id === pc.id && (!gameId || game)) {
        return <StreamPreload name={game?.name || pc.name} bitrate={bitrateLabel} onDisconnect={() => {
            location.hash = game ? '/games/' + game.id : '/home'
        }} />
    }

    return (
        <Card className="padbottom">
            <h1>Page introuvable</h1>
            <Button label="Retour à mes PC" onClick={() => { location.hash = '/home' }} />
        </Card>
    )
}
