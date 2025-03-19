import '../App.scss';
import { useNavigate } from 'react-router';
import cheston from '../img/cheston.png';

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <header className="nav-background">
      <nav className="nav-container">
        <a className='nav-item' onClick={() => navigate('/')}>
          <img src={cheston}  width='60px'/>
          <span>Cheston</span>
        </a>
        <div style={{ flexGrow: 1 }}></div>
        <a 
          className="nav-item" 
          onClick={() => navigate('/login')}
        >
          로그인
        </a>
        <a className="nav-item" onClick={() => { window.location.href = "https://forms.gle/p7yHK9VgE1588KXT9"; }}>
          <button className='btn-md bg-blue'>회원가입</button>
        </a>
      </nav>
    </header>
  );
}
