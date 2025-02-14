import React, { useState } from "react";
import { useNavigate } from 'react-router'; // 추가
import axios from "axios";
import "./Login.css";
import "../global.css";
import { useSelector } from "react-redux";
import cheston from '../img/cheston.png'

export default function Login() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const url = useSelector(state => state)
  // 버튼 클릭 시 서버로 GET 요청 (params에 로그인 정보 담음)
  const handleLogin = () => {
    axios
      .get(url + "login", {
        params: {
          name,
          password,
        },
      })
      .then((response) => {
        console.log("로그인 성공:", response.data);
        // 이후 로직 처리
      })
      .catch((error) => {
        console.error("로그인 오류:", error);
      });
  };

  // X 버튼 클릭 시 홈 화면으로 이동
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="login-background">
      <div className="nav">
        <div className="nav-bar">
          <div className="nav-item text-base" onClick={() => navigate('/')}>
            <img src={cheston} width='60px' />
            <span>Cheston</span>
          </div>
          <div className="nav-item text-2xl" onClick={() => { navigate(-1) }}>X</div>
        </div>
      </div>

      <div className="login-container">


        <p className="text-4xl bold">체스턴으로 로그인</p>

        <div className="login-form">
          <div>
            <input className="login"
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div >
            <input className="login"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-checkbox">
            <input className="checkbox" type="checkbox" id="login-checkbox" />
            <label htmlFor="login-checkbox">로그인 정보 저장하기</label>
          </div>

          <div>
            <button style={{width:'100%'}} className="btn-xl bg-blue" onClick={handleLogin}>
              로그인하기
            </button>
          </div>
        </div>

        <div className="login-signup" onClick={() => { window.location.href = "https://forms.gle/p7yHK9VgE1588KXT9"; }}>
          아직 체스턴 회원이 아닌가요?
        </div>
      </div>
    </div>
  );
}
