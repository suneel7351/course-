import React from 'react';

function Footer() {
  return (
    <div className="container mx-auto py-4 mt-12 flex justify-between items-center md:flex-row flex-col gap-2 md:gap-0">
      <div className="flex gap-4 items-center">
        {' '}
        <img
          className="w-12 h-12 rounded-full"
          src="https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819__340.png"
          alt=""
        />
        <h1 className="text-2xl">CodeWithCoder</h1>
        <div className="h-10 bg-slate-400 w-[2px]"></div>
      </div>
      <div className="text-slate-500">Copyright © 2022 codewithcoder.com</div>
      <div className="flex items-center gap-4">
        <a href="#">Linkedin</a>
        <a href="#">Github</a>
        <a href="#">Portfolio</a>
      </div>
    </div>
  );
}

export default Footer;
