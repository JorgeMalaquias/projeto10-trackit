import styled from 'styled-components';
import logoTopo from '../assets/img/TrackIt.png';
import photo from '../assets/img/Rectangle 14.png';

export default function Top(){
    return(
        <TopTag>
            <img src={logoTopo} alt="logoTopo" />
            <img src={photo} alt="photo" />
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
;
`