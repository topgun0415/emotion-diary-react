/** @format */

import React from 'react';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  console.log(strDate);

  return (
    <div className='DiaryItem'>
      <div
        className={[
          'emotion_img_wrapper',
          `emotion_img_wrapper_${emotion}`,
        ].join(' ')}>
        <img src={`./assets/emotion${emotion}.png`} alt='' />
      </div>
      <div
        className='info_wrapper'
        onClick={() => {
          navigate(`/diary/${id}`);
        }}>
        <div className='diary_date'>{strDate}</div>
        <div className='diary_content_preview'>{content.slice(0, 25)}</div>
      </div>
      <div className='btn_wrapper'>
        <MyButton
          text={'修正する'}
          onClick={() => {
            navigate(`./edit/${id}`);
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
