import Top from './Top';
import Menu from './Menu';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import LoginContext from '../contexts/LoginContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HabitsContext from '../contexts/Habits';

function selecting(e, selected, setSelected, index, setNewHabitDays, newHabitDays) {
    e.preventDefault();
    if (selected === false) {
        setNewHabitDays([...newHabitDays, index + 1]);
    } else {
        setNewHabitDays(newHabitDays.filter((d, i) => !(d === index + 1)));
    }
    setSelected(!selected);

}

function DayBox({ formControl, index, dayInfo, newHabitDays, setNewHabitDays }) {
    const [selected, setSelected] = useState(false);
    return (
        <DaySelect disabled={formControl} key={index} status={selected} onClick={(e) => selecting(e, selected, setSelected, index, setNewHabitDays, newHabitDays)}>{dayInfo.day}</DaySelect>
    );
}
function renderAgain(setHabits, config){
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
    promise.then((promise)=>setHabits(promise.data));
}
function sendtoApi(e, habitName, newHabitDays, setFormControl, setHabitName, setNewHabitDays, setFormReset, setHabits,token) {
    e.preventDefault();
    setFormControl(true);
    
    const newhabit = {
        name: habitName,
        days: newHabitDays.sort()
    }
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", newhabit, config);
    promise.then((promise) => {
        setFormControl(false);
        setHabitName("");
        setNewHabitDays([]);
        setFormReset(true);
        renderAgain(setHabits, config);
    });
    promise.catch(() => {
        setFormControl(false);
        alert("Dados inválidos");
    });
}
export default function NewHabit({ days, formControl, setFormControl, setCreatHabit, newHabitDays, setNewHabitDays, creatHabit, formReset, setFormReset }) {
    const [habitName, setHabitName] = useState("");
    const {setHabits}= useContext(HabitsContext);
    const {token} = useContext(LoginContext);
    if (formReset === false) {
        return (
            <>
                <FormTag creatHabit={creatHabit} onSubmit={(e) => sendtoApi(e, habitName, newHabitDays, setFormControl, setNewHabitDays, setHabitName, setFormReset, setHabits,token)}>
                    <input value={habitName} disabled={formControl} placeholder='nome do hábito' type="text" onChange={(e) => setHabitName(e.target.value)} />
                    <div>{days.map((dayInfo, index) => <DayBox key={index} formControl={formControl} index={index} dayInfo={dayInfo} newHabitDays={newHabitDays} setNewHabitDays={setNewHabitDays} />)}</div>
                    <div>
                        <div onClick={() => setCreatHabit(false)} disabled={formControl}>Cancelar</div>
                        <button disabled={formControl} type='submit'>Salvar</button>
                    </div>

                </FormTag>
            </>

        );
    }else{
        return(
            <span></span>
        );
    }

}

const FormTag = styled.form`
    display: ${props => props.creatHabit ? "flex" : "none"};
`
const DaySelect = styled.button`
    width: 30px;
    height: 30px;
    border: 1px solid #D4D4D4;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#DBDBDB;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    background-color: ${props => props.status ? "#CFCFCF" : "white"};
    margin-right: 4px;
`