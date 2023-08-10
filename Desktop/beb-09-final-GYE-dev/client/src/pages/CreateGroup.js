import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const CreateGroup = () => {
  // 가상의 모임 정보 데이터
  const [groupImage, setGroupImage] = useState('null');
  const [groupName, setGroupName] = useState('');
  const [groupPurpose, setGroupPurpose] = useState('');
  const [membershipFee, setMembershipFee] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [maxMember, setMaxMember] = useState('');

  const createdDate = Date.now();
  const groupLeader = '김철수';

  const handleImageChange = (e) => {
    if (e.target.files[0] !== undefined){
      const file = e.target.files[0];
      setGroupImage(URL.createObjectURL(file));
    }    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 모임 생성 기능 구현 (예: 서버로 데이터 전송)
    console.log('Creating group with the following data:');
    console.log('Group Image:', groupImage);
    console.log('Group Name:', groupName);
    console.log('Created Date:', createdDate);
    console.log('Group Leader:', groupLeader);
    console.log('Group Purpose:', groupPurpose);
    console.log('Membership Fee:', membershipFee);
    console.log('Payment Date:', paymentDate);
    console.log('Max Member:', maxMember);
  };

  return (
    <div>
      <Nav />
      <div className="flex flex-col">
      <h2 className="w-3/5 text-4xl font-bold mx-auto mt-12 mb-2 text-gray-600">Create Group</h2>
      <p className="w-3/5 mx-auto mb-8 text-gray-500">Create Your Own Group Using GYE tokens.</p>
        <form onSubmit={handleSubmit} className="container w-3/5 mx-auto mb-24">
          <div className="flex items-center w-full">
            <label for="group_image" className='w-1/3 h-80 mr-8 rounded-md shadow-md border-2 cursor-pointer overflow-hidden'>
              {groupImage && <img src={groupImage} alt="대표 사진 선택하기" className='object-cover' />}
              <input type='file' id='group_image' accept='image/*' onChange={handleImageChange} className="hidden" required />
            </label>
            <div className="grid grid-rows-4 grid-cols-4 gap-x-2 gap-y-12 place-content-stretch w-full">
              <label for='group_name' className='text-center text-white bg-gray-400 font-bold px-4 py-2 text-xl rounded-md shadow-md'>
                모임 이름
              </label>
              <input type='text' id='group_name' value={groupName} onChange={(e) => setGroupName(e.target.value)} className='col-span-3 rounded-md shadow-md px-4 py-2 focus:outline-none'/>

              <label for='group_purpose' className='text-center text-white bg-gray-400 font-bold px-4 py-2 text-xl rounded-md shadow-md'>
                모임 목적
              </label>
              <input type='text' id='group_purpose' value={groupPurpose} onChange={(e) => setGroupPurpose(e.target.value)} className='col-span-3 rounded-md shadow-md px-4 py-2 focus:outline-none'/>

              <label for='membership_fee' className='text-center text-white bg-gray-400 font-bold px-4 py-2 text-xl rounded-md shadow-md'>
                월 회비
              </label>
              <input type='number' id='membership_fee' value={membershipFee} onChange={(e) => setMembershipFee(e.target.value)} className='col-span-3 rounded-md shadow-md px-4 py-2 focus:outline-none'/>

              <label for='payment_date' className='text-center text-white bg-gray-400 font-bold px-4 py-2 text-xl rounded-md shadow-md'>
                회비 납부일
              </label>
              <input type='number' id='payment_date' value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className='rounded-md shadow-md px-4 py-2 focus:outline-none'/>

              <label for='max_member' className='text-center text-white bg-gray-400 font-bold px-4 py-2 text-xl rounded-md shadow-md'>
                최대 인원수
              </label>
              <input type='number' id='max_member' value={maxMember} onChange={(e) => setMaxMember(e.target.value)} className='rounded-md shadow-md px-4 py-2 focus:outline-none'/>
            </div>
          </div>
          <div className="w-full text-right mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 mt-12 rounded-md cursor-pointer">
              모임 개설하기
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateGroup;
