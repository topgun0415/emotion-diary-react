/** @format */

import './App.css';
import React, { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';

// Components
import MyButton from './Components/MyButton';
import MyHeader from './Components/MyHeader';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <MyHeader
          headText={'今日の日記'}
          leftChild={
            <MyButton
              text={'左ボタン'}
              onClick={() => {
                alert('Left btn clicked');
              }}
            />
          }
          rightChild={
            <MyButton
              text={'右ボタン'}
              onClick={() => {
                alert('Right btn clicked');
              }}
            />
          }
        />
        <h2>ようこそ！</h2>
        <MyButton
          text={'ボタン'}
          type={'positive'}
          onClick={() => {
            alert('Positive 버튼 클릭');
          }}
        />
        <MyButton
          text={'ボタン'}
          type={'negative'}
          onClick={() => {
            alert('Negative 버튼 클릭');
          }}
        />
        <MyButton
          text={'ボタン'}
          type={''}
          onClick={() => {
            alert('Default 버튼 클릭');
          }}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/diary/:id' element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
