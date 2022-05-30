import styled from 'styled-components';
import logoTopo from '../assets/img/TrackIt.png';
import photo from '../assets/img/Rectangle 14.png';
import ImgContext from '../contexts/ImgContext';
import { useState, useContext, useEffect } from 'react';
export default function Top(){
    const {imgUser} = useContext(ImgContext);
    return(
        <TopTag>
            <img src={logoTopo} alt="logoTopo" />
            <img src={imgUser} alt="imgUser" />
        </TopTag>
    );
}

const TopTag=styled.div`
    height: 70px;
    width: 100%;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px 0px #00000026;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    position: fixed;
    top: 0;
    img:nth-child(2){
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
;
`