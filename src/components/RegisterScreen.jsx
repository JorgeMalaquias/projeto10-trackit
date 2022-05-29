import styled from 'styled-components';
import logo from '../assets/img/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner';


function returnAPI(e, API, registerInfos,navigate,setFormControl) {
    e.preventDefault();
    setFormControl(true);
    const promise = axios.post(API, registerInfos);
    promise.then((promise) => {
        setTimeout(()=>navigate("/"),1000);
    });
    promise.catch((promise)=>{
        alert("Dados inválidos");
        setFormControl(false);
    });
}
export default function RegisterScreen() {
    const API = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const registerInfos = {
        email,
        image,
        name,
        password
    }
    const [formControl, setFormControl]=useState(false);
    const navigate = useNavigate();
    return (
        <Core>
            <img src={logo} alt="logo" />
            <form onSubmit={(e) => returnAPI(e, API, registerInfos, navigate, setFormControl)}>
                <input disabled={formControl} placeholder='email' type="text" onChange={(e) => setEmail(e.target.value)} />
                <input disabled={formControl} placeholder='senha' type="text" onChange={(e) => setPassword(e.target.value)} />
                <input disabled={formControl} placeholder='nome' type="text" onChange={(e) => setName(e.target.value)} />
                <input disabled={formControl} placeholder='foto' type="text" onChange={(e) => setImage(e.target.value)} />
                <button disabled={formControl} type='submit'>
                    {formControl?<ThreeDots color="#FFFFFF" height={40} width={40} /> :"Cadastrar"}
                </button>
            </form>
            <Link to="/">Já tem uma conta? Faça login!</Link>
        </Core>
    );
}


const Core = styled.div`
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
        height: 250px;
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