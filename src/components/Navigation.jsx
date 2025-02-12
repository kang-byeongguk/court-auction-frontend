import '../App.scss';
import { useNavigate } from 'react-router';

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <div className="nav-background">
      <nav className="nav-container">
        <div className="nav-item">체스턴</div>
        <div className="nav-item" onClick={() => navigate('/')}>홈</div>
        <div style={{ flexGrow: 1 }}></div>
        <div 
          className="nav-item" 
          onClick={() => navigate('/login')}
        >
          로그인
        </div>
        <div className="nav-item" onClick={() => { window.location.href = "https://forms.gle/p7yHK9VgE1588KXT9"; }}>회원가입</div>
      </nav>
    </div>
  );
}
