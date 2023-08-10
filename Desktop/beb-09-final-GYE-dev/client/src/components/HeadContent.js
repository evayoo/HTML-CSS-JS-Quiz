import React from 'react';

const HeadContent = ({ title, text, imageUrl }) => {
  return (
    <div className="flex justify-center bg-yellow-200">
      <div className='flex items-center justify-between w-3/5 m-10'>
        <div>
          <h2 className="text-5xl font-bold my-6">{title}</h2>
          <p>{text}</p>
        </div>
        <img src={imageUrl} alt="Content" className="w-2/5" />
      </div>
    </div>
  );
};

export default HeadContent;
