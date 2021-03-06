import './App.css';
import { myStore } from './redux/store';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Routes,useNavigate } from 'react-router-dom';
import ThemeContainer from './components/ThemeContainer/ThemeContainer';
import UserSettingPage from './pages/UserSettingPage';
import React,{ useEffect } from 'react';



function App() {
  return (
    <Provider store={myStore}>
      <BrowserRouter>
        
          <Routes>
            <Route path="/user/settings" element={<ThemeContainer ><UserSettingPage /></ThemeContainer>} />
            <Route exact path="/" element={<Redirect to="/user/settings" />} />
          </Routes>
      </BrowserRouter>
    </Provider>
  );
}


function Redirect({to}){
  const navigate = useNavigate()
  useEffect(()=>navigate(to),[])
  return <></>
}

export default App;
