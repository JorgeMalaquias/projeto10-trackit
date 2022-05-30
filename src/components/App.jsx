import Reset from "../theme/reset";
import GlobalStyle from "../theme/globalstyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HabitsScreen from './HabitsScreen';
import TodayScreen from './TodayScreen';
import HystoryScreen from './HystoryScreen';
import LoginContext from "../contexts/LoginContext";
import ImgContext from "../contexts/ImgContext";
import ProgressContext from "../contexts/ProgressContext";
import { useState } from "react";


export default function App() {
    const [token, setToken] = useState("");
    const [imgUser, setImgUser] = useState("");
    const [progress, setProgress] = useState(0);
    console.log(token);
    return (
        <>
            <Reset />
            <GlobalStyle />
            <LoginContext.Provider value={{ token, setToken }}>
                <ImgContext.Provider value={{ imgUser, setImgUser }}>
                    <ProgressContext.Provider value={{ progress, setProgress }}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<LoginScreen />} />
                                <Route path="/cadastro" element={<RegisterScreen />} />
                                <Route path="/habitos" element={<HabitsScreen />} />
                                <Route path="/hoje" element={<TodayScreen />} />
                                <Route path="/historico" element={<HystoryScreen />} />
                            </Routes>
                        </BrowserRouter>
                    </ProgressContext.Provider>
                </ImgContext.Provider>
            </LoginContext.Provider>
        </>


    );
}