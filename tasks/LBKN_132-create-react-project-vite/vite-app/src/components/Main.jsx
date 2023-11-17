import img from '/images/my-img.webp';
import './style.scss';

export function Main() {
  return (
    <main className='main'>
      <p>Main</p>
      <img src={img} className="img" alt="img" width={400} />
    </main>
  );
}
