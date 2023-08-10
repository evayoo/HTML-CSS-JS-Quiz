import React, { useState, useRef, useEffect } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../api/loginAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setLogout, setNickname } from '../redux/userSlice';
import { getUserAPI } from '../api/userfindAPI';

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [arrowRotation, setArrowRotation] = useState(0);
  const modalRef = useRef();
  const navigate = useNavigate();

  const dispatch = useDispatch(); // get the dispatch function
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  console.log(useSelector((state) => state.isLoggedIn))  // Get the isLoggedIn value from the Redux store
  const userNickname = useSelector((state) => state.nickname); // Get the user's nickname from the Redux store
  const email = useSelector((state) => state.email);
  const handleLogout = () => {
    // Dispatch the setLogout action
    dispatch(setLogout());
  };

  function getUser() {
    const useremail = email;
    getUserAPI(useremail, (error, responseData) => {
      if (error) {
        console.log('회원 찾기 실패');
      } else {
        //console.log('회원 정보', responseData.data.profile_img);
        setNickname(responseData.data.nickname);
        dispatch(setNickname(responseData.data.nickname));
      }
    });
  }

  async function login() {
    const result = await loginAPI(userEmail, password);
      console.log(result.success);
      if (result.isLoginMessage === "로그인에 성공하였습니다.") {
        // console.log(result.data);
        alert("로그인 완료");
        const { email, nickname, gye_amount, usdg_amount } = result.data;
        dispatch(
          setLogin({
            email,
            nickname,
            gye_amount,
            usdg_amount,
          })
        );
        console.log('setLogin 액션 디스패치 성공');
        navigate("/");
      } else {
        alert(result.msg);
      }
  }  

  /**
   * `isNavOpen` 상태 값을 토글하는 함수
   * 현재 상태가 `true`이면 `false`로, `false`이면 `true`로 변경
   * 이 함수는 주로 네비게이션 메뉴의 열기/닫기를 제어하는데 사용
   */
  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
    setArrowRotation(arrowRotation + 180);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 로직을 구현하고, 로그인 성공 시 모달창을 닫는 등의 처리를 수행합니다.
    // 여기에서는 예시로 간단하게 alert을 사용하여 로그인 성공을 알립니다.
    console.log(`로그인 성공! 이메일: ${userEmail}, 비밀번호: ${password}`);
    getUser();
    login();
    setIsModalOpen(false);
  };

  const handleGoogleLogin = () => {
    alert('구글로 로그인합니다!');
  };

  const handleNaverLogin = () => {
    alert('네이버로 로그인합니다!');
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-center border-b-2 h-24">
      <div className="flex items-center justify-between p-2 w-3/5">
        <a href="/"><img src="https://ipfs.io/ipfs/QmbGSre3PCKn7LkQVhkqvjmFARG9Cv4cYs2j8pwsK21L1e?filename=GYE-signature.png" alt="Logo" className="w-1/6" /></a>
        <div className="flex justify-between items-center whitespace-nowrap gap-10">
          <div className={`cursor-pointer`}>
            GYE
            <BiSolidDownArrow className="inline-block" style={{ transform: `rotate(${arrowRotation}deg)`, transition: 'transform 0.4s' }} onClick={handleNavToggle} />
          </div>
          {isNavOpen && (
            <div className="
            absolute 
            top-24
            right-auto 
            overflow-hidden 
            bg-white 
            text-black 
            rounded 
            shadow-md"
            >
              <ul className="text-center">
                <Link to='/group/join'>
                  <li className="
                    flex 
                    justify-center 
                    items-center 
                    gap-2
                    border-b 
                    p-4 
                    hover:bg-gray-300 
                    transition 
                    duration-300 
                    cursor-pointer">
                    참여하기
                  </li>
                </Link>
                <Link to='/group/create'>
                  <li className="
                    flex 
                    justify-center 
                    items-center 
                    gap-2
                    border-b 
                    p-4 
                    hover:bg-gray-300 
                    transition 
                    duration-300 
                    cursor-pointer">
                    생성하기
                  </li>
                </Link>
              </ul>
            </div>
          )}
          <Link to="/community" className="cursor-pointer">Community</Link>
          <Link to="/swap" className="cursor-pointer">Swap</Link>
        </div>
        <div>
          {!isLoggedIn && (
            <>
              <button
                className={`ml-10 bg-blue-500 text-white px-4 py-2 rounded-md whitespace-nowrap cursor-pointer`}
                onClick={handleModalToggle}
              >
                로그인
              </button>
              {isModalOpen && (
              <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
                <div className="bg-white p-6 rounded-md shadow-md" ref={modalRef}>
                  <h2 className="text-center text-2xl font-bold mb-4">GYE 로그인</h2>
                  <form onSubmit={handleLogin}>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
                      placeholder="이메일을 입력하세요"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
                      placeholder="비밀번호를 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                      로그인
                    </button>
                    <div className="justify-center text-center mt-2">
                      <Link to="/signup">회원이 아니신가요?</Link>
                    </div>
                  </form>
                  <div className="mt-4">
                  <button
                      className="w-full border-2 border-gray-300 py-2 px-4 mt-8 mb-4 rounded-md"
                      onClick={handleGoogleLogin}
                  >
                    Google로 로그인
                  </button>
                  <button
                    className="w-full border-2 border-gray-300 py-2 px-4 rounded-md"
                    onClick={handleNaverLogin}
                  >
                    NAVER로 로그인
                  </button>
                  </div>
                </div>
              </div>
              )}
            </>
          )}
          {isLoggedIn && (
            <>
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">환영합니다!</span>
                  <span className="text-lg font-bold">{userNickname}님</span>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md whitespace-nowrap cursor-pointer"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
