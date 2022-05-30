import Top from './Top';
import Menu from './Menu';
import styled from 'styled-components';

export default function HystoryScreen() {
    return (
        <>
            <Top></Top>
            <Core>
                <div>Histórico</div>
                <div>Em breve você poderá ver o histórico dos seus hábitos aqui!</div>
            </Core>
            <Menu></Menu>
        </>
    );
}

const Core=styled.div`
    padding: 0 18px;
    margin-top: 98px;
    height: 100%;
    width: 100%;
    > div:nth-child(1){
        color:#126BA5;
        font-size: 23px;
        font-weight: 400;
        line-height: 29px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 18px;
    }
    > div:nth-child(2){
        font-size: 18px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
        color:#666666;
    }
`