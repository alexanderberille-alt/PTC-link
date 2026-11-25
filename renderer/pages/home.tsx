import React from 'react'
import Button from '../components/ui/button'
import Card from '../components/ui/card'
import Label from '../components/ui/label'
import { pc } from '../pc'

function Home() {
    return (
        <React.Fragment>
            <div style={ {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'stretch',
                paddingTop: '20px',
            }}>
                <Card className='padbottom'>
                    <h1>{pc.name}</h1>

                    <div style={{
                        width: 200,
                        margin: '0 auto',
                        paddingTop: 10,
                    }}>
                        <p style={{ textAlign: 'center' }}>{pc.platform} · {pc.connection}</p>
                    </div>

                    <h2 className='grey' style={{
                        textAlign: 'center',
                        fontSize: 12,
                    }}>{pc.id}</h2>

                    <br />

                    <Label className='green'>Allumé · Démo</Label>

                    <div style={{ display: 'flex', gap: '20px', minWidth: 'min(280px, calc(100vw - 80px))' }}>
                        <Button label='Démarrer la session' className='btn-primary'
                            onClick={() => { window.location.hash = '/stream/' + pc.id }} />
                    </div>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default Home
