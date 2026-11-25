import React from 'react'

interface SettingsSidebarProps {
    route: string
    children: React.ReactNode
}

function SettingsSidebar({ route, children }: SettingsSidebarProps) {
    return (
        <React.Fragment>
            <div id="component_settings_sidebar">
                <div id="component_settings_sidebar_menu">
                    <ul>
                        <li className={route === '/settings' ? 'active' : ''}><a href="#/settings">À propos</a></li>
                        <li className={route === '/settings/streaming' ? 'active' : ''}><a href="#/settings/streaming">Diffusion</a></li>
                    </ul>
                </div>

                <div id="component_settings_sidebar_content">
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}

export default SettingsSidebar
