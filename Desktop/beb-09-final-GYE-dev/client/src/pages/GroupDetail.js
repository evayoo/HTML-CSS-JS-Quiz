import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupDetailAPI } from '../api/getGroupDetail';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const GroupDetail = () => {
  const { id } = useParams();
  const [info, seInfo] = useState({});
  const calculatePercentage = (current, total) => {
    return (current / total) * 100;
  };

  const remainingPercentage = 100 - calculatePercentage(info.currentMembers, info.maxMembers);
  // 가상의 모임 정보 데이터
  const groupData = {
    groupImage: 'https://via.placeholder.com/400',
    groupName: '모임명',
    groupPurpose: '모임 목적',
    membershipFee: '100,000 GYE',
    paymentDate: '매월 1일',
    createdDate: '2023-07-30',
    groupLeader: '모임장 이름',
  };

  function getGroupDetail(){
    getGroupDetailAPI(id, (error, responseData) => {
      if (error) {
        console.log('모임 디테일 받아오기 실패');
      } else {
        console.log('모임 디테일 정보', responseData);
        seInfo(responseData)
      }
    })
  }

  useEffect(() => {
    getGroupDetail();
  }, []);

  return (
    <div>
      <Nav />
      {info ?
        (
          <div className="flex flex-col">
          <h2 className="w-3/5 text-4xl font-bold mx-auto mt-12 mb-10 text-gray-600">{groupData.groupName} {info.groupName}</h2>
          <div className="container w-3/5 mx-auto mb-24">
            <div className="flex w-full mb-12">
              {/* <img src={info.groupImage} alt="group_id_image" className="w-1/3 h-80 mr-8 rounded-md shadow-md" /> */}
              <img src='https://ipfs.io/ipfs/QmZjPEMKkm7kmLjxdVKb7btR4Jqy4Kh3xHfYESrXZq1BCt?filename=%EB%8B%AC2.jpg' alt="group_id_image" className="w-1/3 h-80 mr-8 bg-gray-200 rounded-md shadow-md overflow-hidden" />
              <div className='relative flex flex-col w-full h-80'>
                {/* <div className="flex items-center w-full">
                  <div className="w-2/3 h-8 bg-green-300 rounded-md">
                    <div className="h-full bg-red-500 rounded-md" style={{ width: `${remainingPercentage}%` }}></div>
                  </div>
                  <span className="ml-2">{info.currentMembers} / {info.maxMembers}</span>
                </div> */}
                <div className='grid grid-cols-4 gap-x-2 gap-y-6 place-content-stretch w-full'>
                  <div className="text-center text-white bg-gray-400 font-bold px-4 py-2 text-xl rounded-md shadow-md">
                    전체 인원수
                  </div>
                  <div className="col-span-3 rounded-md shadow-md px-4 py-2">{info.maxMembers}명</div>
                  <div className="text-center text-white bg-gray-400 font-bold px-4 py-2 text-xl rounded-md shadow-md">
                    현재 인원수
                  </div>
                  <div className='rounded-md shadow-md px-4 py-2'>{info.currentMembers}명</div>
                  <div className="text-center text-white bg-gray-400 font-bold px-4 py-2 text-xl rounded-md shadow-md">
                    남은 인원수
                  </div>
                  <div className='rounded-md shadow-md px-4 py-2'>{info.maxMembers - info.currentMembers}명</div>
                </div>
                <div className="absolute w-full bottom-0 text-right mt-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
                    참여 신청하기
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-rows-3 grid-cols-4 gap-x-2 gap-y-6 place-content-stretch w-full">
              <div className="text-center text-white bg-gray-400 font-bold px-4 py-2 text-xl rounded-md shadow-md">
                모임 목적
              </div>
              <div className="col-span-3 rounded-md shadow-md px-4 py-2">{groupData.groupPurpose} {info.groupPurpose}</div>

              <div className="text-center text-white bg-gray-400 font-bold px-4 py-2 text-xl rounded-md shadow-md">
                월 회비
              </div>
              <div className="rounded-md shadow-md px-4 py-2">{groupData.membershipFee} {info.membershipFee}</div>

              <div className="text-center text-white bg-gray-400 font-bold px-4 py-2 text-xl rounded-md shadow-md">
                회비 납부일
              </div>
              <div className="rounded-md shadow-md px-4 py-2">{groupData.paymentDate} {info.paymentDate}</div>

              <div className="text-center text-white bg-gray-400 font-bold px-4 py-2 text-xl rounded-md shadow-md">
                모임 생성일
              </div>
              <div className="col-span-3 rounded-md shadow-md px-4 py-2">{groupData.createdDate} {info.createdDate}</div>
            </div>
          </div>
          </div>
        ) : (<></>)
      }
      <Footer />
    </div>
  );
};

export default GroupDetail;
