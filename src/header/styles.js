import { space } from '../styles/gobal'

export const styles = {
    marginTop: space,
    marginBottom: `calc(${space} * 2)`,
    textAlign: 'center',
    fontFamily: ['san-serif', 'Amatic SC'],
    h1: {
        textTransform: 'lowercase',
        fontSize: '250%',
        paddingTop: space,
        marginBottom: space
    },
    ul: {
        listStyleType: 'none',
        fontSize: '150%',
        fontWeight: 'bold',
        padding: 0
    },
    li: {
        display: 'inline-block',
        ':not(:last-child)': {
            marginRight: space
        }
    },
    'a, a:hover, a:visited': {
        color: 'black',
        textDecoration: 'none'
    },
    'a:hover': {
        color: 'pink',
        textDecoration: 'underline'
    } 
}