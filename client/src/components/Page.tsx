import React, { useState } from 'react';
import { CircleX } from 'lucide-react';
import { Link } from 'react-router-dom';
import MaxWidthWrapper from './MaxWidthWrapper';

const Page = () => {
  const [showAlert, setShowAlert] = useState(true);

  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <div className="w-full  bg-green-600 flex items-center justify-between">
          <div className="flex-grow">
            <h1 className="text-center font-semibold text-white">
              Buy Premium at just <span className='font-bold text-red-700 underline ml-2 mr-2'>10 USD</span>to get free practice quizzes and receive recommendations from recruiters
            </h1>
          </div>
          <div className="flex-shrink-0 cursor-pointer p-2" onClick={handleDismissAlert}>
            <CircleX size={24} color="#000000" />
          </div>
        </div>
      )}
      <MaxWidthWrapper >
        <div className="mt-3 ">
          <h1 className='text-center text-8xl font-bold'>Hire and <span className='text-green-600'>Get Hired</span>!</h1>
        </div>
        <div className="flex flex-col md:grid grid-cols-2">
          <div className="">
<img src="/geeks1.png" alt="" />

          </div>
          
          <div className="">
            <img src="/recruiter1.png" alt="" />

          </div>
        </div>
        <div className="flex justify-center items-center">
          <img src="/hand-capsules.png" alt="" />
        </div>
        <div className="flex flex-col md:grid grid-cols-2">
          <div className="">
            <img src="/geeksdash.png" alt="" className='h-80 w-96 object-cover'/>
          </div>
          <div className="">
            <img src="/recdash.png" alt="" className='h-80 w-96 object-cover' />
          </div>

        </div>
        <div className="">
          <h1 className='text-center text-3xl font-bold'>Get Premium in Just <span className='text-orange-600'>10 USD</span> <span className='text-green-600'>(Lifetime)</span></h1>
          <img src="/prem.png" alt="" />
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
