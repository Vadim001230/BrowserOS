import { useState } from 'react';
import { Main } from './components/Main';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
