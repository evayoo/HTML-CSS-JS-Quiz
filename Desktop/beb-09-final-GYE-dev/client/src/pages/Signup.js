import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { signupAPI } from '../api/signupAPI';

const Signup = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [userEmailFailure, setUserEmailFailure] = useState(null);
  const [passwordFailure, setPasswordFailure] = useState(null);
  const [confirmPasswordFailure, setConfirmPasswordFailure] = useState(null);
  const navigate = useNavigate();
  
  // 가상의 함수로 구글 또는 네이버로 가입하는 로직을 구현한다고 가정합니다.
  async function signup() {
    //@notion API 사용 함수를 따로 선언하여 에러 핸들링 및 화면 전환
    //  signupAPI(userEmail, password, nickname, (error, responseData) => {
    //    if (error) {
    //      if(error?.response?.status == 500){
    //        //@notion 아이디 중복일 때 응답코드 409
    //        alert('이미 있는 아이디입니다. 다른 아이디로 시도해주세요.');
    //      }
    //      else{
    //        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    //      }
        
    //    }
    //    else{
    //      console.error('회원가입 성공: ', responseData)
    //      //@notion 회원가입에 성공하면 alert확인후 login 페이지로 이동
    //      alert('회원가입이 성공적으로 완료되었습니다.');
    //      navigate('/');
    //    }
    //  })
    const result = await signupAPI(userEmail, password, nickname,);
    console.log(result.success);
      if (result.success === true) {
        alert("회원가입 완료");
        navigate("/");
      } else {
        alert(result);
      }
  }  
  
  const handleGoogleSignUp = () => {
    alert('구글로 가입합니다!');
  };

  const handleNaverSignUp = () => {
    alert('네이버로 가입합니다!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('가입 정보:', userEmail, password, confirmPassword, nickname);
     //@notion API사용 함수를 호출하여 로그인 실행
    signup();
  };

  const validateUserEmail = (value) => {
    const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!value) {
      return ''
    } else if (!emailReg.test(value)) {
      return '유효한 이메일 주소를 입력해주세요.';
    } else {
      return '';
    }
  };
  const validatePassword = (value) => {
    if (!value) {
      return '';
    } else if (value.length < 10) {
      return '비밀번호는 10자리 이상이어야 합니다.';
    } else {
      return '';
    }
  };
  const validateConfirmPassword = (password, confirmPassword) => {
    if (password.length === 0 || confirmPassword.length === 0) {
      return '';
    } else if (password !== confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    } else {
      return '';
    }
  };

  return (
    <div>
      <Nav />
      <div className="flex justify-center my-8">
        <div className="flex items-center justify-center w-3/5">
          <div className="flex flex-col w-1/2 px-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className='block text-gray-400 mb-6'>친구, 지인, 회원과 함께</span>
              <span className='block mb-6'>계모임을 시작하고</span>
              <span className='block mb-6'>목돈을 마련해 보세요</span>
            </h1>
            <img src="https://ipfs.io/ipfs/QmfHKkQnica48jgSnGBHsmpQYf6YhpjEaXeQoZzav193qt?filename=signup-left.jpg" alt="signup" />
          </div>
          <form className="flex flex-col w-1/2 px-8 border-l-2" onSubmit={handleSubmit}>
            <div className="justify-center">
              <img src="https://ipfs.io/ipfs/Qmb21pAn8SrvYKKTaneuQppjG4riEcoXuNFkaCfY1DFGT8?filename=signup-right.png" 
                alt="signup"
                className='block w-3/5 h-3/5 mx-auto my-10' />
              <button
                className="w-full border-2 border-gray-300 py-2 px-4 mt-8 mb-4 rounded-md"
                onClick={handleGoogleSignUp}
              >
                Google로 회원가입
              </button>
              <button
                className="w-full border-2 border-gray-300 py-2 px-4 rounded-md"
                onClick={handleNaverSignUp}
              >
                NAVER로 회원가입
              </button>
              <p className='text-center text-xs mt-2 mb-8'>이미 가입된 이메일로 쉽게 가입해 보세요</p>
            </div>
            <input
              type="email"
              className="w-full border-2 border-gray-300 rounded-md py-2 px-4 mt-4"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              onKeyUp={(e) => {
                setUserEmailFailure(e.target.value ? validateUserEmail(e.target.value) : '');
              }}
              required
            />
            {userEmailFailure && <div className="text-red-400 text-xs">{userEmailFailure}</div>}
            {userEmail.length>0 && !userEmailFailure && <div className="text-green-400 text-xs">사용할 수 있는 이메일입니다.</div>}
            <input
              type="password"
              className="w-full border-2 border-gray-300 rounded-md py-2 px-4 mt-4"
              placeholder="PW"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => {
                const validPasswordResult = validatePassword(e.target.value);
                setPasswordFailure(validPasswordResult);
              }}
              required
            />
            {passwordFailure && <div className="text-red-400 text-xs">{passwordFailure}</div>}
            {password.length >= 10 && !passwordFailure && <div className="text-green-400 text-xs">비밀번호가 유효합니다.</div>}
            <input
              type="password"
              className="w-full border-2 border-gray-300 rounded-md py-2 px-4 mt-4"
              placeholder="PW confirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyUp={(e) => {
                const validConfirmPasswordResult = validateConfirmPassword(password, e.target.value);
                setConfirmPasswordFailure(validConfirmPasswordResult);
              }}
              required
            />
            {confirmPasswordFailure && <div className="text-red-400 text-xs">{confirmPasswordFailure}</div>}
            {confirmPassword.length>0 && !confirmPasswordFailure && <div className="text-green-400 text-xs"></div>}
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-md py-2 px-4 mt-4"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 my-10 rounded-md hover:bg-blue-600"
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
