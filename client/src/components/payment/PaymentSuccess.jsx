import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';

function PaymentSuccess() {
  const refNo = useSearchParams()[0].get('reference');
  return (
    <div className="py-8">
      <h1 className="text-center text-4xl text-slate-700 my-4">
        You have Subscription now
      </h1>
      <div className="w-[280px] md:w-[330px] mx-auto shadow-md pb-8 mt-8">
        <div>
          <p className="rounded-t-md pl-2 bg-slate-700 text-slate-100 py-2 text-xl">
            Payment Success
          </p>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center flex gap-2 mt-2 px-2 text-center">
            <p className="text-lg">
              Congratulation you're a pro member.You have access to premium
              content.
            </p>

            <h1 className="text-5xl text-green-500">
              <RiCheckboxCircleFill />
            </h1>
          </div>
        </div>
        <Link
          to={'/profile'}
          className="btn btn-secondary my-4 w-[200px] mx-auto"
        >
          Go to profile
        </Link>
        <h1 className="text-center text-2xl font-bold">
          Reference No. : {refNo}
        </h1>
      </div>
    </div>
  );
}

export default PaymentSuccess;
