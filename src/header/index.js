/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link } from 'react-router-dom'

import { styles } from './styles'

export const Header = () => {
    return (
        <header css={styles}>
            <h1><Link to="/marcusgeduld">Marcus Geduld</Link></h1>
            <nav>
                <ul>
                    <li><Link to="/marcusgeduld/about">about</Link></li>
                    <li><Link to="/marcusgeduld/blog">blog</Link></li>
                    <li><Link to="/marcusgeduld/resume">resume</Link></li>
                </ul>
            </nav>
        </header>
    )
}