/** @format */

import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App';

import EmotionItem from './EmotionItem';
import MyButton from './MyButton';
import MyHeader from './MyHeader';

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: '/assets/emotion1.png',
    emotion_descript: 'すごく嬉しい',
  },
  {
    emotion_id: 2,
    emotion_img: '/assets/emotion2.png',
    emotion_descript: '嬉しい',
  },
  {
    emotion_id: 3,
    emotion_img: '/assets/emotion3.png',
    emotion_descript: '普通',
  },
  {
    emotion_id: 4,
    emotion_img: '/assets/emotion4.png',
    emotion_descript: '悲しい',
  },
  {
    emotion_id: 5,
    emotion_img: '/assets/emotion5.png',
    emotion_descript: 'すごく悲しい',
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');
  const contentRef = useRef();

  const navigate = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, emotion);
    navigate('/', { replace: true });
  };

  return (
    <div className='DiaryEditor'>
      <MyHeader
        headText={'日記作成'}
        leftChild={
          <MyButton
            text={'<'}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <div>
        <section>
          <h4>今日何日ですか</h4>
          <div className='input_box'>
            <input
              className='input_date'
              type='date'
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <h4>今日の気持ちは</h4>
          <div className='input_box emotion_list_wrapper'>
            {emotionList.map((v) => (
              <EmotionItem
                key={v.emotion_id}
                {...v}
                onClick={handleClickEmotion}
                isSelected={v.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>今日の日記</h4>
          <div className='input_box text_wrapper'>
            <textarea
              placeholder='今日はどうでしたか'
              ref={contentRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <div className='control_box'>
            <MyButton
              text={'取り消す'}
              type={'negative'}
              onClick={() => {
                navigate(-1);
              }}
            />
            <MyButton text={'保存'} type='positive' onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
