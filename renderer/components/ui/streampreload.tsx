import React from 'react'
import Card from './card'
import Button from './button'

interface StreamPreloadProps {
    name: string
    bitrate: string
    onDisconnect: () => void
}

function StreamPreload({ name, bitrate, onDisconnect }: StreamPreloadProps) {
    return (
        <React.Fragment>
            <div>
                <div id="streamComponent"></div>

                <div id="component_streamcomponent_loader">
                    <Card className="padbottom">
                        <h1>{name}</h1>
                        <p id="component_streamcomponent_connectionstatus">Session de démonstration</p>
                        <p>Débit sélectionné · {bitrate}</p>
                    </Card>
                </div>

                <div id="component_streamcomponent_gamebar">
                    <div id="component_streamcomponent_gamebar_menu">
                        <Button label="Terminer la session" className="btn-cancel" onClick={onDisconnect} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default StreamPreload
