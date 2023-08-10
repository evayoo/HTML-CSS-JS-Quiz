import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const MyPage = () => {
  // 가상의 사용자 정보 데이터
  const [user, setUser] = useState({
    nickname: '김진산',
    badges: ['뱃지1', '뱃지2', '뱃지3'],
    walletAddress: '지갑 주소',
    gyeTokens: 100,
    usdgTokens: 50,
    createdGroups: [
      // ... (생성한 계모임 데이터)
      {
        id: 1,
        name: '내가 생성한 계모임 1',
        paymentStatus: '납부 완료',
        nextMonthFee: 200,
        isPaid: true,
      },
      {
        id: 2,
        name: '내가 생성한 계모임 2',
        paymentStatus: '미납',
        nextMonthFee: 150,
        isPaid: false,
      },
    ],
    joinedGroups: [
      // ... (참여한 계모임 데이터)
      {
        id: 3,
        name: '참여한 계모임 1',
        paymentStatus: '납부 완료',
        nextMonthFee: 100,
        isPaid: true,
      },
      {
        id: 4,
        name: '참여한 계모임 2',
        paymentStatus: '납부 완료',
        nextMonthFee: 120,
        isPaid: true,
      },
    ],
  });

  return (
    <div>
      <Nav />
      <div className="flex flex-col w-3/5 mx-auto">
        <div className="w-full mx-auto mt-12 mb-4 text-3xl font-bold">
          {user.nickname}님, 환영합니다!
        </div>
        <div className="flex">
          <div className="w-1/2 mx-auto mb-8">
            {user.badges.map((badge, index) => (
              <span key={index} className="px-2 py-1 mx-1 bg-blue-200 rounded-md">
                {badge}
              </span>
            ))}
          </div>
          <div className="flex flex-col w-1/2 mx-auto mb-8">
            <div className="w-full">
              <div className="mb-4">
                지갑 주소: {user.walletAddress}
              </div>
              <div className="mb-4">
                보유 GYE 토큰: {user.gyeTokens} GYE
              </div>
              <div className=''>
                보유 USDG 토큰: {user.usdgTokens} USDG
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto mb-8">
          <div className="w-full border-b-2 pb-2 text-2xl font-bold mb-4">
            나의 계모임
          </div>
          <div className="grid grid-cols-1 gap-4">
            {user.createdGroups.map((group, index) => (
              <div key={index} className="bg-gray-200 rounded-md p-4">
                <div className="text-lg font-bold mb-2">
                  {group.name}
                </div>
                <div className="text-right mb-2">
                  이번달 납부 현황: {group.paymentStatus} 
                </div>
                <div className="text-right mb-2">
                  이번달 납부할 회비: {group.nextMonthFee} 
                </div>
                <div className="text-right mb-2">
                  납부 유무: {group.isPaid ? '납부 완료' : '미납'}
                </div>
                <div className="flex justify-between">
                  <Link to='/group/manage/:id' className="bg-gray-500 text-white px-2 py-1 rounded-md cursor-pointer">
                    계모임 관리하기
                  </Link>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer">
                    회비 납부하기
                  </button>
                </div>
              </div>
            ))}
            {user.joinedGroups.map((group, index) => (
              <div key={index} className="bg-gray-200 rounded-md p-4">
                <div className="text-lg font-bold mb-2">
                  {group.name}
                </div>
                <div className="text-right mb-2">
                  이번달 납부 현황: {group.paymentStatus}
                </div>
                <div className="text-right mb-2">
                  이번달 납부할 회비: {group.nextMonthFee}
                </div>
                <div className="text-right mb-2">
                  납부 유무: {group.isPaid ? '납부 완료' : '미납'}
                </div>
                <div className="flex justify-end">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer">
                    회비 납부하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mx-auto mb-8">
          <div className="w-full border-b-2 pb-2 text-2xl font-bold mb-4">
            나의 포스팅
          </div>
          <div className="grid grid-cols-4 gap-4">
            {/* 나의 포스팅 정보 */}
            <div className="bg-gray-200 rounded-md p-4 flex flex-col">
              <div className="text-lg font-bold mb-2">
                포스팅 제목 1
              </div>
              <div className="mb-2">
                작성 날짜: 2023년 8월 1일
              </div>
              <button className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer">
                포스팅 보기
              </button>
            </div>
            <div className="bg-gray-200 rounded-md p-4 flex flex-col">
              <div className="text-lg font-bold mb-2">
                포스팅 제목 2
              </div>
              <div className="mb-2">
                작성 날짜: 2023년 8월 2일
              </div>
              <button className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer">
                포스팅 보기
              </button>
            </div>
            {/* ... (나머지 포스팅 정보) */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
