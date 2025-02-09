import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Signup.scss";
import { useSelector } from "react-redux";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const url = useSelector((state) => state);

  const handleSignup = () => {
    // 비밀번호와 비밀번호 확인이 일치하는지 체크
    if (password !== confirmPassword) {
      setErrorMsg("비밀번호를 정확하게 기입해야 합니다.");
      return;
    }
    // 에러 메시지 초기화
    setErrorMsg("");

    // 회원가입 요청 (예시로 POST 요청 사용)
    axios
      .post(url + "signup", { name, password })
      .then((response) => {
        console.log("회원가입 성공:", response.data);
        // 예: 회원가입 성공 후 로그인 페이지로 이동하거나 다른 처리를 진행
        navigate("/login");
      })
      .catch((error) => {
        console.error("회원가입 오류:", error);
      });
  };

  // X 버튼 클릭 시 홈 화면으로 이동
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="login-background">
      <div className="login-container">
        {/* 최상단 우측 X 버튼 */}
        <span className="close-button" onClick={handleClose}>
          X
        </span>

        <h3>체스턴 회원가입</h3>

        <div className="login-form">
          <div className="login-id">
            <input
              type="text"
              placeholder="아이디"
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

          <div className="login-pwd">
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* 비밀번호 불일치 시 에러 메시지 출력 */}
          {errorMsg && <div className="error-message">{errorMsg}</div>}

          <div>
            <button className="login-button" onClick={handleSignup}>
              가입하기
            </button>
          </div>
        </div>

        <div className="login-signup" onClick={()=>{navigate('/login')}}>
          이미 체스턴 회원이신가요? 로그인 하러 가기.
        </div>
      </div>
    </div>
  );
}
