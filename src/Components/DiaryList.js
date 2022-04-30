/** @format */

import React, { useState } from 'react';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';

const sortOptionList = [
  { value: 'latest', name: '最新' },
  { value: 'oldest', name: '古い順' },
];

const filterOptionList = [
  { value: 'all', name: '全部' },
  { value: 'good', name: '嬉しい' },
  { value: 'sad', name: '悲しい' },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className='ControlMenu'
      value={value}
      onChange={(e) => onChange(e.target.value)}>
      {optionList.map((v, idx) => (
        <option key={idx} value={v.value}>
          {v.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');

  const getProcessedDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === 'all' ? copyList : copyList.filter((v) => filterCallback(v));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className='DiaryList'>
      <div className='menu_wrapper'>
        <div className='left_col'>
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className='right_col'>
          <MyButton
            type={'positive'}
            text={'日記作成'}
            onClick={(e) => {
              navigate('/new');
            }}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((v) => (
        <DiaryItem key={v.id} {...v} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
