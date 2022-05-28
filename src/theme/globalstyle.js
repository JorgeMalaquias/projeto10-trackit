import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    body{
        width: 100%;
        height: 100%; 
        font-family: 'Lexend Deca', sans-serif;
        background-color: #E5E5E5;
    }
    .root{
        width: 100%;
        height: 100%;
    }

    a{
        text-decoration: none;
        
    }
`

export default GlobalStyle;