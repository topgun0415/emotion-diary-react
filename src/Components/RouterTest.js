/** @format */

import { Link } from 'react-router-dom';

const RouterTest = () => {
  return (
    <div>
      <Link to={'/'}>Home</Link>
      <br />
      <Link to={'/diary'}>Diary</Link>
      <br />
      <Link to={'/new'}>New</Link>
      <br />
      <Link to={'/Edit'}>Edit</Link>
    </div>
  );
};

export default RouterTest;
