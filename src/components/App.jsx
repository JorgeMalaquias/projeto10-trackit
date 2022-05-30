import Reset from "../theme/reset";
import GlobalStyle from "../theme/globalstyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HabitsScreen from './HabitsScreen';
import TodayScreen from './TodayScreen';
import HystoryScreen from './HystoryScreen';
import LoginContext from "../contexts/LoginContext";
import { useState } from "react";


export default function App() {
    const [token, setToken] = useState("");
    console.log(token);
    return (
        <>
            <Reset />
            <GlobalStyle />
            <LoginContext.Provider value={{ token, setToken }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginScreen />} />
                        <Route path="/cadastro" element={<RegisterScreen />} />
                        <Route path="/habitos" element={<HabitsScreen />} />
                        <Route path="/hoje" element={<TodayScreen />} />
                        <Route path="/historico" element={<HystoryScreen />} />
                    </Routes>
                </BrowserRouter>
            </LoginContext.Provider>
        </>


    );
}