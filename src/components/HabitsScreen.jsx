import Top from './Top';
import Menu from './Menu';
import styled from 'styled-components';

export default function HabitsScreen(){
    return(
        <>
            <Top></Top>
            <Core>Eita</Core>
            <Menu></Menu>
        </>
        
    );
}


const Core=styled.div`
    margin-top: 70px;
    height: 100%;
    width: 100%;
`