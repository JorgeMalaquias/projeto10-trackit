import styled from 'styled-components';
import logo from '../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


function returnAPI(e,API, loginInfos){
    e.preventDefault();
    const promise = axios.post(API,loginInfos);
    promise.then(()=>console.log(promise.data));
    promise.catch(()=>console.log(promise));
}
export default function LoginScreen(){
    const API = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const loginInfos = {
        email,
        password
    }
    return(
        <Core>
            <img src={logo} alt="logo" />
            <form onSubmit={(e)=>returnAPI(e,API,loginInfos)}>
                <input placeholder='email' type="text" onChange={(e)=>setEmail(e.target.value)} />
                <input placeholder='senha' type="text" onChange={(e)=>setPassword(e.target.value)} />
                <button type='submit'>Entrar</button>
            </form>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </Core>
    );
}


const Core=styled.div`
    padding-top: 80px;
    width: 100%;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    > a{
        color:#52B6FF;
        text-decoration: underline;
    }
    form{
        height: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        *{
            width: 300px;
            height: 44px;
            border-radius: 5px;
            font-family: 'Lexend Deca', sans-serif;
        }
        input{
            border: 1px solid #D4D4D4;
            font-size: 20px;
            font-weight: 400;
            line-height: 25px;
            letter-spacing: 0em;
            text-align: left;
            color:#DBDBDB;
        }
        button{
            background-color:#52B6FF;
            font-size: 21px;
            font-weight: 400;
            line-height: 26px;
            letter-spacing: 0em;
            text-align: center;
            color:white;
            border:none;
        }
    }
`