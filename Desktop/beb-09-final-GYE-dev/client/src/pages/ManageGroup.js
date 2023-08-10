import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const ManageGroup = () => {
  const pageSize = 10; // 한 페이지에 보여줄 회원 수
  const [currentPage, setCurrentPage] = useState(1);

  // 가상의 회원 정보 데이터
  const [members, setMembers] = useState([
    { id: 1, email: 'root@never.com', nickname: 'User1', joinDate: '2023-07-01', paymentCount: 3, isPaid: true },
    { id: 2, email: 'root@never.com', nickname: 'User2', joinDate: '2023-07-05', paymentCount: 2, isPaid: false },
    { id: 3, email: 'root@never.com', nickname: 'User3', joinDate: '2023-07-10', paymentCount: 1, isPaid: true },
    { id: 4, email: 'root@never.com', nickname: 'User1', joinDate: '2023-07-01', paymentCount: 3, isPaid: true },
    { id: 5, email: 'root@never.com', nickname: 'User2', joinDate: '2023-07-05', paymentCount: 2, isPaid: false },
    { id: 6, email: 'root@never.com', nickname: 'User3', joinDate: '2023-07-10', paymentCount: 1, isPaid: true },
    { id: 7, email: 'root@never.com', nickname: 'User1', joinDate: '2023-07-01', paymentCount: 3, isPaid: true },
    { id: 8, email: 'root@never.com', nickname: 'User2', joinDate: '2023-07-05', paymentCount: 2, isPaid: false },
    { id: 9, email: 'root@never.com', nickname: 'User3', joinDate: '2023-07-10', paymentCount: 1, isPaid: true },
    { id: 10, email: 'root@never.com', nickname: 'User1', joinDate: '2023-07-01', paymentCount: 3, isPaid: true },
    { id: 11, email: 'root@never.com', nickname: 'User2', joinDate: '2023-07-05', paymentCount: 2, isPaid: false },
    { id: 12, email: 'root@never.com', nickname: 'User3', joinDate: '2023-07-10', paymentCount: 1, isPaid: true },
    // ... 다른 회원 데이터
  ]);

  const totalPages = Math.ceil(members.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleMembers = members.slice(startIndex, startIndex + pageSize);

  const handleKickMember = (id) => {
    // 회원 퇴장 처리 기능 구현
    // 해당 id를 가진 회원을 리스트에서 제거하는 등의 작업
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
  };

  return (
    <div>
      <Nav />
      <div className="flex flex-col w-3/5 mx-auto">
        <div className="flex justify-between w-full">
          <h2 className="w-1/2 text-3xl font-bold border-b-2 pb-2 mt-12 mb-8 text-gray-600">계모임 이름</h2>
          <div className="w-1/2 text-end mt-12 mb-8 font-bold px-4 py-2 text-xl text-gray-600">
            현재 인원수: 12명
          </div>
        </div>
        <div className='ml-2 mb-4 text-gray-600'>
          계모임 총 목표액: 
        </div>
        <div className='ml-2 mb-4 text-gray-600'>
          현재 누적 액수: 
        </div>
        <div className='ml-2 mb-10 text-gray-600'>
          누적 개월수: 
        </div>
        <div className="container w-full mx-auto">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">번호</th>
                <th className="border p-2 w-1/4">이메일</th>
                <th className="border p-2">닉네임</th>
                <th className="border p-2">가입날짜</th>
                <th className="border p-2 w-1/12">납입횟수</th>
                <th className="border p-2 w-1/6">이번달 납부 여부</th>
                <th className="border p-2 w-1/12">퇴장</th>
              </tr>
            </thead>
            <tbody>
              {visibleMembers.map(member => (
                <tr key={member.id}>
                  <td className="border p-2">{member.id}</td>
                  <td className="border p-2">{member.email}</td>
                  <td className="border p-2">{member.nickname}</td>
                  <td className="border p-2">{member.joinDate}</td>
                  <td className="border p-2">{member.paymentCount}</td>
                  <td className="border p-2">
                    <span className={member.isPaid ? 'text-green-500' : 'text-red-500'}>
                      {member.isPaid ? '납부 완료' : '미납'}
                    </span>
                  </td>
                  <td className="border p-2">
                    <button
                      className="bg-red-500 text-white text-center px-2 py-1 rounded-md cursor-pointer"
                      onClick={() => handleKickMember(member.id)}
                    >
                      퇴장
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 mb-24">
          <div className="flex">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-3 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-gray-400 text-white' : 'bg-gray-200'}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManageGroup;
