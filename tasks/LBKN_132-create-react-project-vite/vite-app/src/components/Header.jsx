import reactLogo from '/icons/react.svg';
import viteLogo from '/icons/vite.svg';
import './style.scss';

export function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Title</h1>
      <div>
        <img src={viteLogo} className="header__vite-logo logo" alt="Vite logo" />
        <img src={reactLogo} className="header__react-logo logo" alt="React logo" />
      </div>
    </header>
  );
}
