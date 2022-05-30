import Top from './Top';
import Menu from './Menu';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import LoginContext from '../contexts/LoginContext';
import HabitsContext from '../contexts/Habits';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NewHabit from './NewHabitForm';
import React from 'react';


function deleteHabit(id, setHabits,token) {
    const conf = prompt("Você tem certeza que deseja excluir?(S-sim N-não)")
    if (conf === 'S') {
        const API = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
        
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        const promise = axios.delete(API, config);
        promise.then(() => {
            const promisetwo = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
            promisetwo.then((promisetwo) => {
                setHabits(promisetwo.data);
            })

        });
    }

}
function HabitComponent({ habit, index }) {
    const habitsDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const { setHabits } = useContext(HabitsContext);
    const {token} = useContext(LoginContext);
    return (
        <Habit key={index}>
            <div>
                <div>{habit.name}</div>
                <div>{habitsDays.map((d, i) => <Day key={i} status={habit.days.includes(i + 1)}>{d}</Day>)}</div>
            </div>
            <ion-icon onClick={() => deleteHabit(habit.id, setHabits,token)} name="trash-outline"></ion-icon>
        </Habit>
    );
}
function Content({ habits }) {
    console.log(habits);
    console.log(habits.length);
    if (habits.length === 0) {
        return (
            <NothingWarning>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NothingWarning>
        );
    } else {
        return (
            <Habits>
                {habits.map((habit, index) => <HabitComponent habit={habit} index={index} key={index} />)}
            </Habits>

        );
    }

}

export default function HabitsScreen() {
    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const {token} = useContext(LoginContext);
    const [formReset, setFormReset] = useState(false);
    const [newHabitDays, setNewHabitDays] = useState([]);
    const [habits, setHabits] = useState([]);
    const [formControl, setFormControl] = useState(false);
    const [creatHabit, setCreatHabit] = useState(false);
    const [days, setDays] = useState([
        { day: 'D', status: false },
        { day: 'S', status: false },
        { day: 'T', status: false },
        { day: 'Q', status: false },
        { day: 'Q', status: false },
        { day: 'S', status: false },
        { day: 'S', status: false }
    ]);
    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.get(API, config);
        promise.then((promise) => {
            setHabits(promise.data);
        })
    }, [])
    return (
        <HabitsContext.Provider value={{ habits, setHabits }}>
            <Top></Top>
            <Core>
                <HeadTag>
                    <div>Meus hábitos</div>
                    <div onClick={() => {
                        setCreatHabit(true);
                        setFormReset(false);
                    }}>+</div>
                </HeadTag>

                <NewHabit days={days} formControl={formControl} setFormControl={setFormControl} setCreatHabit={setCreatHabit} newHabitDays={newHabitDays} setNewHabitDays={setNewHabitDays} creatHabit={creatHabit} formReset={formReset} setFormReset={setFormReset} />

                <Content habits={habits} />

            </Core>
            <Menu></Menu>

        </HabitsContext.Provider>

    );
}
const Day = styled.div`
    height: 30px;
    width: 30px;
    border-radius: 5px;
    border: 1px solid #D4D4D4;
    margin-right: 4px;
    color:${props => props.status ? "white" : "#CFCFCF"};
    background-color: ${props => props.status ? "#CFCFCF" : "white"};
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Habits = styled.div`
    margin-top: 20px;
    margin-bottom: 100px;
`
const Habit = styled.div`
    width: 340px;
    height: 90px;
    border-radius: 5px;
    background-color: white;
    margin-bottom: 10px;
    padding: 14px;
    display: flex;
    justify-content: space-between;
    ion-icon{
        width: 18px;
        height: 18px;
    }
    > div > div:nth-child(1){
        font-size: 20px;
        font-weight: 400;
        line-height: 25px;
        letter-spacing: 0em;
        text-align: left;
        color:#666666;
        margin-bottom: 10px;
    }

    > div > div:nth-child(2){
        display: flex;
        align-items: center;
    }
`
const Core = styled.div`
    margin-top: 70px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    form{
        height: 180px;
        width: 340px;
        padding: 18px;
        border-radius: 5px;
        background-color: white;
        flex-direction: column;
        align-items: center;
        font-family: 'Lexend Deca', sans-serif;
        > div{
        display: flex;
        align-items: center;
        width: 300px;
        }
        > input:nth-child(1){
            border: 1px solid #D4D4D4;
            color: #DBDBDB;
            font-size: 20px;
            font-weight: 400;
            line-height: 25px;
            letter-spacing: 0em;
            text-align: left;
            height: 45px;
            width: 300px;
            border-radius: 5px;
            margin-bottom: 10px;
            font-family: 'Lexend Deca', sans-serif;
        }
        > div:last-child{
            margin-top: 28px;
            justify-content: flex-end;
            *{
                height: 35px;
                width: 84px;
                border-radius: 5px;
                font-size: 16px;
                font-weight: 400;
                line-height: 20px;
                letter-spacing: 0em;
                text-align: center;
                font-family: 'Lexend Deca', sans-serif;
            }
            *:nth-child(1){
                color: #52B6FF;
                background-color: white;
                border: none;
                font-family: 'Lexend Deca', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            *:nth-child(2){
                color: white ;
                background-color:  #52B6FF;
                border: none;
                font-family: 'Lexend Deca', sans-serif;
            }
        }
    }
`

const NothingWarning = styled.div`
    width: 338px;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color:#666666
`

const HeadTag = styled.div`
    margin-top: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 340px;
    > div:nth-child(1){
        color:#126BA5;
        font-size: 23px;
        font-weight: 400;
        line-height: 29px;
        letter-spacing: 0em;
        text-align: left;
    }
    > div:nth-child(2){
        width: 40px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        color:white;
        background-color: #52B6FF;
        border-radius: 5px;
        font-size: 27px;
        font-weight: 400;

    }
`

