import React from 'react';
import { Link } from 'react-router-dom';

const LeftContent = ({ title, imageUrl, linkTo, buttonText }) => {
  return (
    <div className="flex justify-center py-4 border-y-2">
      <div className="flex items-center justify-between p-4 w-3/5">
        <div className="justify-end">
          <h2 className="text-4xl font-bold py-6">{title}</h2>
          <Link to={linkTo} className="bg-gray-200 border-gray-400 border-2 px-4 py-2 rounded-md">
            {buttonText}
          </Link>
        </div>
        <img src={imageUrl} alt="Content" className="w-1/2" />
      </div>
    </div>
  );
};

export default LeftContent;
