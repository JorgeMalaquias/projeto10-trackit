import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext } from 'react';
import ProgressContext from "../contexts/ProgressContext";
function goToToday(navigate){
    navigate("/hoje");
}
export default function Menu() {
    const {progress} = useContext(ProgressContext);
    const navigate = useNavigate();
    return (
        <>
            <MenuTag>
                <Options>
                    <Link to="/habitos">Hábitos</Link>
                    <Link to="/historico">Histórico</Link>
                </Options>
                <ProgressCircle onClick={()=>goToToday(navigate)}>
                    <CircularProgressbar value={progress}  />
                    <Link to="/hoje">Hoje</Link>
                </ProgressCircle>


            </MenuTag>

        </>

    );
}

const MenuTag = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: fixed;
    bottom: 0;
`
const ProgressCircle = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #52B6FF;
    position: fixed;
    bottom: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    *{
        color: white;
    }
    > *:nth-child(1){
        position: fixed;
        bottom: 10; 
        width: 80px;
        height: 80px;
        color:white
    }
`
const Options = styled.div`
    height: 70px;
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    *{
        color:#52B6FF;
        font-size: 18px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: center;

    }
`