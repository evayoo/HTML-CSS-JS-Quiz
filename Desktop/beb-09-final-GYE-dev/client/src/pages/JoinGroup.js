import React, { useState } from 'react';
import JoinGroupItem from '../components/JoinGroupItem';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const JoinGroup = () => {
  // 가상의 계모임 목록 데이터
  const initialGroups = [
    {
      id: 1,
      title: '계모임 1',
      imageUrl: 'https://via.placeholder.com/300',
      description: '계모임 1 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      linkTo: '/group/1',
    },
    {
      id: 2,
      title: '계모임 2',
      imageUrl: 'https://via.placeholder.com/300',
      description: '계모임 2 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      linkTo: '/group/2',
    },
    {
      id: 3,
      title: '계모임 3',
      imageUrl: 'https://via.placeholder.com/300',
      description: '계모임 3 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      linkTo: '/group/3',
    },
    {
      id: 4,
      title: '계모임 4',
      imageUrl: 'https://via.placeholder.com/300',
      description: '계모임 4 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      linkTo: '/group/4',
    },
    {
      id: 5,
      title: '계모임 5',
      imageUrl: 'https://via.placeholder.com/300',
      description: '계모임 5 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      linkTo: '/group/5',
    },
    {
      id: 6,
      title: '계모임 6',
      imageUrl: 'https://via.placeholder.com/300',
      description: '계모임 6 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      linkTo: '/group/6',
    },
    {
      id: 7,
      title: '계모임 7',
      imageUrl: 'https://via.placeholder.com/300',
      description: '계모임 8 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      linkTo: '/group/7',
    },
    {
      id: 8,
      title: '계모임 8',
      imageUrl: 'https://via.placeholder.com/300',
      description: '계모임 8 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      linkTo: '/group/8',
    },
    {
      id: 1,
      title: '계모임 1',
      imageUrl: 'https://via.placeholder.com/300',
      description: '계모임 1 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      linkTo: '/group/1',
    },
    {
      id: 2,
      title: '계모임 2',
      imageUrl: 'https://via.placeholder.com/300',
      description: '계모임 2 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      linkTo: '/group/2',
    },
    {
      id: 3,
      title: '계모임 3',
      imageUrl: 'https://via.placeholder.com/300',
      description: '계모임 3 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      linkTo: '/group/3',
    },
    {
      id: 4,
      title: '계모임 4',
      imageUrl: 'https://via.placeholder.com/300',
      description: '계모임 4 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      linkTo: '/group/4',
    },
    // ... (총 8개의 계모임 데이터)
  ];

  const [groups, setGroups] = useState(initialGroups);
  const [visibleGroups, setVisibleGroups] = useState(8);

  const handleLoadMore = () => {
    setVisibleGroups((prevVisibleGroups) => prevVisibleGroups + 8);
  };

  return (
    <div>
      <Nav />
      <img src="https://ipfs.io/ipfs/QmZZkPpggsqz3bDfntmQPyGZYD57TD3AfH8yMbRiuPPHyW?filename=join-group-Banner.png" alt="join-group" className="w-3/5 mx-auto" />
      <div className="container w-3/5 mx-auto my-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {groups.slice(0, visibleGroups).map((group) => (
            <JoinGroupItem
              key={group.id}
              title={group.title}
              imageUrl={group.imageUrl}
              description={group.description}
              linkTo={group.linkTo}
            />
          ))}
        </div>
        {visibleGroups < groups.length && (
          <button
            className="justify-center w-full px-4 py-2 my-8 rounded-md bg-blue-400 hover:bg-blue-600 text-white"
            onClick={handleLoadMore}
          >
            더보기
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JoinGroup;
