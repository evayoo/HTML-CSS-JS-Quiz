import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JoinGroupItem = ({ title, imageUrl, description, linkTo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-4 border rounded-md cursor-pointer group hover:bg-gray-100">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            {/* 모달창에 들어갈 내용 */}
            <h2 className="text-2xl font-bold mb-4">상세페이지</h2>
            <p>계모임 {title}의 상세페이지 내용이 여기에 들어갑니다.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={handleModalToggle}
            >
              닫기
            </button>
          </div>
        </div>
      )}
      <Link to={linkTo} className={`bg-blue-500 text-white px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${isModalOpen ? 'hidden' : ''}`}>
        상세페이지로 이동
      </Link>
    </div>
  );
};

export default JoinGroupItem;
