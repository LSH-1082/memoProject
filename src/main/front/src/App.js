import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './test/Test';
import Login from './loginPage/Login';
import Register from './registerPage/Register';
import Main from './mainPage/Main';
const App = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                    <Route path="/test" element={<Test />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/main" element={<Main />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
