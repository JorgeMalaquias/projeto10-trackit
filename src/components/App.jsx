import Reset from "../theme/reset";
import GlobalStyle from "../theme/globalstyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HabitsScreen from './HabitsScreen';
import TodayScreen from './TodayScreen';
import HystoryScreen from './HystoryScreen';


export default function App() {
    return (
        <>
            <Reset />
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/cadastro" element={<RegisterScreen />} />
                    <Route path="/habitos" element={<HabitsScreen />} />
                    <Route path="/hoje" element={<TodayScreen />} />
                    <Route path="/historico" element={<HystoryScreen />} />
                </Routes>
            </BrowserRouter>
        </>


    );
}