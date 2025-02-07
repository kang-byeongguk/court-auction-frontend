import React, { useState } from "react";
import { useNavigate } from 'react-router'; // 추가
import axios from "axios";
import "./Login.scss";
import { useSelector } from "react-redux";

export default function Login() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const url = useSelector(state=>state)
  // 버튼 클릭 시 서버로 GET 요청 (params에 로그인 정보 담음)
  const handleLogin = () => {
    axios
      .get(url+"login", {
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
      <div className="login-container">
        {/* 최상단 우측에 X 버튼 */}
        <span className="close-button" onClick={handleClose}>
          X
        </span>
        
        <h3>체스턴으로 로그인</h3>
        
        <div className="login-form">
          <div className="login-id">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="login-pwd">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-checkbox">
            <input type="checkbox" id="login-checkbox" />
            <label htmlFor="login-checkbox">로그인 정보 저장하기</label>
          </div>

          <div>
            <button className="login-button" onClick={handleLogin}>
              다음
            </button>
          </div>
        </div>

        <div className="login-signup">
          아직 체스턴 회원이 아닌가요?
        </div>
      </div>
    </div>
  );
}
