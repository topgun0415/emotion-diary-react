/** @format */

import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App';

import EmotionItem from './EmotionItem';
import MyButton from './MyButton';
import MyHeader from './MyHeader';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotionList';

const DiaryEditor = ({ isEdit, originData }) => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');
  const contentRef = useRef();

  const navigate = useNavigate();
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(isEdit ? '日記をやり直しますか' : '新しい日記を書きますか')
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate('/', { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm('本当に削除しますか')) {
      onRemove(originData.id);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className='DiaryEditor'>
      <MyHeader
        headText={isEdit ? '日記修正' : '日記作成'}
        leftChild={
          <MyButton
            text={'<'}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightChild={
          isEdit && (
            <MyButton text={'削除'} type={'negative'} onClick={handleRemove} />
          )
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
