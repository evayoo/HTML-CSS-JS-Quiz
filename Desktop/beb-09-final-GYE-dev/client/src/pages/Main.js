import React from 'react';
import Nav from '../components/Nav';
import HeadContent from '../components/HeadContent';
import LeftContent from '../components/LeftContent';
import RightContent from '../components/RightContent';
import Footer from '../components/Footer';

const Main = () => {
  return (
    <div>
      <div className=''>
        <Nav />
        <HeadContent
          title={["믿을 수 있는 계모임", <br />, "GYE"]}
          text={["GYE는 이더리움 기반의 디지털 계모임 플랫폼입니다.", <br />, <br />,
          "USDG 토큰을 이용해 모임에 참여하고,", <br />, "모임을 만들어 운영할 수 있고,", <br />, <br />,
          "GYE 토큰을 이용해 커뮤니티에서 놀 수 있습니다."]}
          imageUrl="https://ipfs.io/ipfs/QmVnAC2Lp7qY7BJbU8sYsp3w2sskm5N4qnCY88R6PQZzGc?filename=main-1.png"
        />
        <RightContent
          title={["GYE모임에 참여하여", <br />, "목돈을 모으세요"]}
          imageUrl="https://ipfs.io/ipfs/QmYqUmvS8gfPWgbPvFcSRkv8ZErVbT6tvyhiUSENXsixzc?filename=main-2.png"
          linkTo="/group/join"
          buttonText="모임 참여하기"
        />
        <LeftContent
          title={["GYE모임을 만들고", <br />, "모임을 운영하세요"]}
          imageUrl="https://ipfs.io/ipfs/QmaTyicuYDwi6ZJZaEymr9yYv562766XYnHxrAGx2LT92W?filename=main-3.png"
          linkTo="/group/create"
          buttonText="모임 만들기"
        />
        <RightContent
          title={["GYE모임 커뮤니티에서", <br />, "놀아보세요"]}
          imageUrl="https://ipfs.io/ipfs/QmNUKmsnQXB7eoixFWVqEu3B1R4uiccrJScSypG6rvK2TK?filename=main-4.png"
          linkTo="/community"
          buttonText="커뮤니티 참여하기"
        />
        <Footer />
      </div>
    </div>
  );
};

export default Main;
