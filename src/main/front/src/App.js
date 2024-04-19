import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './beforeAuth/Login';
import Register from './beforeAuth/Register';
import Main from "./main/Main";
import NotFound from "./beforeAuth/NotFound";

const App = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/main" element={<Main/>}></Route>
                        {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                        <Route path='*' element={<NotFound />} />
                    </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
