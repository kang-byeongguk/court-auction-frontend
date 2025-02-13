import '../App.scss';
import { useNavigate } from 'react-router';
import cheston from '../img/cheston.png';

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <div className="nav-background">
      <nav className="nav-container">
        <div className='nav-item' onClick={() => navigate('/')}>
          <img src={cheston}  width='60px'/>
          <span>Cheston</span>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div 
          className="nav-item" 
          onClick={() => navigate('/login')}
        >
          로그인
        </div>
        <div className="nav-item" onClick={() => { window.location.href = "https://forms.gle/p7yHK9VgE1588KXT9"; }}>
          <button className='btn-md bg-blue'>회원가입</button>
        </div>
      </nav>
    </div>
  );
}
