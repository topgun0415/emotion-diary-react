/** @format */

import React, { useState } from 'react';

const sortOptionList = [
  { value: 'lastest', name: '最新' },
  { value: 'oldest', name: '古い順' },
];

const filterOptionList = [
  { value: 'all', name: '全部' },
  { value: 'good', name: '嬉しい' },
  { value: 'sad', name: '悲しい' },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((v, idx) => (
        <option key={idx} value={v.value}>
          {v.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState('lastest');
  const [filter, setFilter] = useState('all');

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === 'lastest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  return (
    <div>
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
      {getProcessedDiaryList().map((v) => (
        <div key={v.id}>
          {v.content}
          {v.emotion}
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
