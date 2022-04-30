/** @format */

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';

import MyButton from '../Components/MyButton';
import MyHeader from '../Components/MyHeader';

import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotionList';

const Diary = () => {
  const { id } = useParams(); // 해당 diary/id 값을 가져오는 방법
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `日記 - ${id}番め`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (v) => parseInt(v.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert('日記がありません');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className='DiaryPage'>ローディングしています。。。</div>;
  } else {
    const curEmotionData = emotionList.find(
      (v) => parseInt(v.emotion_id) === parseInt(data.emotion)
    );
    console.log(curEmotionData);

    return (
      <div className='DiaryPage'>
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 記録`}
          rightChild={
            <MyButton
              text={'修正'}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
          leftChild={<MyButton text={'<'} onClick={() => navigate(-1)} />}
        />
        <article>
          <section>
            <h4>今日の気持ちは？</h4>
            <div
              className={[
                'diary_img_wrapper',
                `diary_img_wrapper${data.emotion}`,
              ].join(' ')}>
              <img src={curEmotionData.emotion_img} />
              <div className='emotion_descript'>
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>今日の日記</h4>
            <div className='diary_content_wrapper'>
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
