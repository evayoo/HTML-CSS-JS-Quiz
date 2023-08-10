import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Swap = () => {
  const [usdgAmount, setUsdgAmount] = useState('');
  const [gyeAmount, setGyeAmount] = useState('');
  const [swapRate, setSwapRate] = useState(0.05); // 임의의 스왑 비율
  const [slippageTolerance, setSlippageTolerance] = useState(1);
  const [minimumReceived, setMinimumReceived] = useState(0);

  const handleGyeInputChange = (e) => {
    setGyeAmount(e.target.value);
    // 임의의 스왑 비율로 계산 (실제로는 스마트 컨트랙트와 연동하여 계산해야 함)
    const calculatedUsdgAmount = parseFloat(e.target.value) * swapRate;
    setUsdgAmount(calculatedUsdgAmount.toFixed(2)); // 소수점 두 자리까지 표시
    // Slippage tolerance, Minimum received 등의 계산도 이곳에서 처리 가능
  };

  const handleSwap = () => {
    // 스왑 실행 기능 구현
    console.log(`Swapping ${gyeAmount} GYE to ${usdgAmount} USDG`);
  };

  return (
    <div>
      <Nav />
      <h2 className="w-3/5 text-4xl font-bold mx-auto mt-12 mb-2 text-gray-600">Swap</h2>
      <p className="w-3/5 mx-auto mb-8 text-gray-500">Change GYE tokens to USDG tokens.</p>
      <div className="container w-3/5 p-8 mx-auto mt-4 mb-24 border-2 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className='w-full border-r-2 pr-8'>
            <div>
              <div className="mb-4">
                <label htmlFor="gyeAmount" className="block font-bold mb-2">
                  GYE 수량
                </label>
                <input
                  type="number"
                  id="gyeAmount"
                  value={gyeAmount}
                  onChange={handleGyeInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="usdgAmount" className="block font-bold mb-2">
                  USDG 수량
                </label>
                <input
                  type="text"
                  id="usdgAmount"
                  value={usdgAmount}
                  readOnly
                  className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col text-right pt-48">
            <div className='w-1/2 text-left mb-4'>
              <strong className='text-gray-600'>Swap Rate</strong>
              <p className='text-gray-500'>{swapRate} USDG per GYE</p>
            </div>
            <div className='text-left mb-4'>
              <strong className='text-gray-600'>Slippage Tolerance</strong>
              <p className='text-gray-500'>{slippageTolerance}%</p>
            </div>
            <div className='text-left mb-4'>
              <strong className='text-gray-600'>Minimum Received</strong>
              <p className='text-gray-500'>{minimumReceived} GYE</p>
            </div>
          </div>
        </div>

        <div className='text-right'>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mt-4" onClick={handleSwap}>
            스왑하기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Swap;
