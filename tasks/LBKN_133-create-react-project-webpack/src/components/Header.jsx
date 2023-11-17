import logo from '../assets/icons/my-logo.svg';
import './style.scss';

export function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Title</h1>
      <img src={logo} className="header__logo" alt="logo" />
    </header>
  );
}
