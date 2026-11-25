import React from 'react'
import { pc } from '../../../pc'

interface GameTitleProps {
    name: string;
    titleId: string;
}

function GameTitle({ name, titleId }: GameTitleProps) {
    return (
        <React.Fragment>
            <div className="component_gametitle">
                <div className="component_gametitle_infopage">
                    <a href={'#/games/' + titleId} aria-label={'Fiche de ' + name}>i</a>
                </div>

                <a href={'#/stream/' + pc.id + '/' + titleId} aria-label={'Lancer ' + name}>
                    <div className="component_gametitle_title"><p>{name}</p></div>
                </a>
            </div>
        </React.Fragment>
    )
}

export default GameTitle
