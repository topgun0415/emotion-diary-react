/** @format */

import { useEffect } from 'react';
import DiaryEditor from '../Components/DiaryEditor';

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `日記作成 `;
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
