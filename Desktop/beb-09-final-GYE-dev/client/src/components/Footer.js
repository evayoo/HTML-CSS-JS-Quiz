import React from 'react';
import { FaGithub, FaDiscord, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
      <footer style={{ backgroundColor: '#f2f2f2' }} className="flex justify-center my-4">
        <div className="container items-center justify-between p-4 w-3/5">
          <div className="flex justify-between p-4">
            <div className="text-xl font-bold">로고</div>
            <div className="space-x-4">
              <span className="cursor-pointer">페이지 1</span>
              <span className="cursor-pointer">페이지 2</span>
              <span className="cursor-pointer">페이지 3</span>
              <span className="cursor-pointer">페이지 4</span>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#333', fontSize: '24px' }}
            >
              <FaGithub />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#333', fontSize: '24px' }}
            >
              <FaDiscord />
            </a>
            <a
              href="https://www.notion.so"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#333', fontSize: '24px' }}
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
