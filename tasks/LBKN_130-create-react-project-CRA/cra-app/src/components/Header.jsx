import logo from '../assets/images/my-logo.svg';
import '../styles/style.scss';

export function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Title</h1>
      <img src={logo} className="header__logo" alt="logo" />
    </header>
  );
}
