import Top from './Top';
import Menu from './Menu';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ProgressContext from '../contexts/ProgressContext';
import LoginContext from '../contexts/LoginContext';

function checkHabit(id,setTodaysHabits,token){
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,{}, config);
    promise.then(()=>{
        console.log("tamo ae");
        const promise2 = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config);
        promise2.then((promise2)=>setTodaysHabits(promise2.data));
    })
    promise.catch((promise)=>promise.response.data);
}
function uncheckHabit(id,setTodaysHabits,token){
    console.log("eis nosso id");
    console.log(id);
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,{},config);
    promise.then(()=>{
        const promise2 = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config);
        promise2.then((promise2)=>setTodaysHabits(promise2.data));
    })
}
function Habit({id, name, done, currentSequence, highestSequence,setTodaysHabits}){
    const {token} = useContext(LoginContext);
    return(
        <HabitTag done={done} equal={currentSequence===highestSequence}>
            <div>
                <div>{name}</div>
                <div>Sequência atual: <span>{currentSequence} dias</span> </div>
                <div>Seu recorde: <span>{highestSequence} dias</span>  </div>
            </div>
            {done?<ion-icon onClick={()=>uncheckHabit(id,setTodaysHabits, token)} name="checkbox"></ion-icon>:<ion-icon onClick={()=>checkHabit(id,setTodaysHabits, token)} name="checkbox"></ion-icon>}
            
        </HabitTag>
    );
}
export default function TodayScreen() {
    const { progress, setProgress } = useContext(ProgressContext);
    const habitsDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const {token} = useContext(LoginContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const [todaysHabits, setTodaysHabits] = useState([]);

    setProgress(((todaysHabits.filter((h,i)=>h.done===true)).length/todaysHabits.length)*100);

    useEffect(() => {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config);
        promise.then((promise) => setTodaysHabits(promise.data));
    }, [])

    return (
        <>
            <Top></Top>
            <Core>
                <GeneralInfo status={(progress === 0)}>
                    <div>{habitsDays[dayjs().day()]}, {dayjs().$D}/{dayjs().month()+1}</div>
                    <div>{(progress === 0) ? 'Nenhum hábito concluído ainda' : `${progress.toFixed(2)}% dos hábitos concluídos`}</div>
                </GeneralInfo>
                <Habits>
                    {todaysHabits.map((h,i)=><Habit key={i} id={h.id} name={h.name} done={h.done}currentSequence={h.currentSequence}highestSequence={h.highestSequence}setTodaysHabits={setTodaysHabits}/>)}
                </Habits>
            </Core>
            <Menu></Menu>
        </>
    );
}

const Core = styled.div`
    margin-top: 70px;
    height: 100%;
    width: 100%;
`
const GeneralInfo = styled.div`
    padding: 0 18px;
    > div:nth-child(1){
        margin-top: 98px;
        font-size: 23px;
        font-weight: 400;
        line-height: 29px;
        letter-spacing: 0em;
        text-align: left;
        color:#126BA5;
    }
    > div:nth-child(2){
        font-size: 18px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
        color:${props=>props.status?"#BABABA":"#8FC549"}
    }

    

`
const Habits = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 110px;
`
const HabitTag=styled.div`
    height: 94px;
    width: 340px;
    padding: 14px;
    border-radius: 5px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    ion-icon{
        width: 70px;
        height: 70px;
        color: ${props=>props.done?"#8FC549":"#EBEBEB"};
    }
    > div:nth-child(1) > div:nth-child(1){
        font-size: 20px;
        font-weight: 400;
        line-height: 25px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 8px;
    }
    > div:nth-child(1) > *{
        color: #666666;
    }
   
    

    > div:nth-child(1) > div:nth-child(2) > span{
        color: ${props=>props.done?"#8FC549":"#666666"};
    }
    > div:nth-child(1) > div:nth-child(3) > span{
        color: ${props=>props.done && props.equal?"#8FC549":"#666666"};
    }
`