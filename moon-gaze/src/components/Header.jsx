import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Link to='/'>
      <h1>Moon Phase</h1>
      <img src='./moon/fullMoon.svg' width='200px' height='200px' />
    </Link>
  );
};
