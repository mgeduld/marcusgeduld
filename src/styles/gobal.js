import React from 'react'
import { Global } from '@emotion/core'

export const borderColor = '#333'
export const space = '1rem'
export const baseColor = '#440'

const styles = {
  '*': {
    boxSizing: 'border-box',
    margin: 0,
  },
  body: {
    backgroundColor: baseColor,
    fontFamily: ['serif', 'Cormorant Garamond'],
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    fontSize: 16,
  },
  '.page': {
    margin: '0 auto',
    padding: space,
    width: '80%',
    maxWidth: 800,
    backgroundColor: '#eee',
    border: `1px solid ${borderColor}`,
  },
}

export const GlobalStyles = () => {
  return <Global styles={styles} />
}
