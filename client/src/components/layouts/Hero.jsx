// Hero.js
import React from 'react';

function Hero() {
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-4">
                    Unlock Your Coding Potential
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2">
                    Learn to code with our interactive courses and hands-on projects.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2 sm:mb-8">

                </div>
                <div className="text-md sm:text-lg">
                    <p>Join thousands of learners who have transformed their careers with us.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center mt-4">
                    <div className="text-center sm:text-left sm:mr-8">

                        <div className='flex gap-8'>
                            <p className="text-sm sm:text-base mb-2 flex items-center gap-4">
                                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                                    10,000+
                                </span>{' '}
                                Learners
                            </p>
                            <p className="text-sm sm:text-base flex items-center gap-4">
                                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                                    100+
                                </span>{' '}
                                Courses
                            </p>
                        </div>
                    </div>

                </div>
            </div>
           
        </div>
    );
}

export default Hero;
