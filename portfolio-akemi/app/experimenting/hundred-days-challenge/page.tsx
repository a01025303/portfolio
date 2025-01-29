'use client';
import React from 'react';
import Hamburger from "@/app/ui/hundred-days-challenge/hamburger";
import path from 'path';
export default function Page() {
    return (
        <section className="py-12 bg-gray-900 text-gray-100 sm:py-12 lg:py-16">
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="mt-1 text-4xl font-extrabold sm:text-5xl lg:text-6xl">100 day challenge</p>
                    <p className="max-w-xl mx-auto mt-5 text-xl text-gray-400">Learning tailwind through the 100 days challenge for CSS</p>
                </div>
                <div className="grid grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left h-full">
                    <div className="flex flex-col bg-gray-100 shadow-md rounded-lg h-96">
                        <div className="m-3 bg-white flex flex-col rounded-md h-full">
                            <div className="flex justify-center bg-gradient-to-tr from-blue-700 to-pink-500 via-purple-500 rounded-t-md p-2 h-full">
                                <div className="flex items-center relative">
                                    <div className="w-[40px] h-[20px] bg-white z-0 rounded-sm transform -rotate-45 mt-[-52px] mr-[-13px]"></div>
                                    <div className="h-[100px] w-[25px] bg-white z-10 rounded-sm shadow-lg mr-[-10px]"></div>
                                    <div className="bg-transparent w-[100px] h-[100px] border-solid border-white border-[25px] rounded-full z-20 shadow-lg mr-[-10px]"></div>
                                    <div className="bg-transparent w-[100px] h-[100px] border-solid border-white border-[25px] rounded-full z-30 shadow-lg"></div>
                                </div>
                            </div>
                            <div className="flex flex-col text-center p-2">
                                <p className="text-gray-900 font-bold text-xl pb-1">Day 1</p>
                                <p className="text-gray-600 pt-1">Custom built number with gradient</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-gray-100 shadow-md rounded-lg h-96">
                        <div className="m-3 bg-white flex flex-col rounded-md h-full">
                            <div className="flex justify-center bg-blue-700 rounded-t-md p-2 h-full">
                                <div className="flex items-center relative">
                                    <div>
                                        <Hamburger />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col text-center p-2">
                                <p className="text-gray-900 font-bold text-xl pb-1">Day 2</p>
                                <p className="text-gray-600 pt-1">Hamburger menu animation</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-gray-100 shadow-md rounded-lg h-96">
                        <div className="m-3 bg-white flex flex-col rounded-md h-full">
                            <div className="flex justify-center items-center bg-slate-800 rounded-t-md p-2 h-full">
                                <div className="">
                                    <div className="w-[200px] h-[200px] bg-white rounded-full overflow-hidden relative">
                                        <div className="absolute animate-daytonight w-[200px] h-[200px] z-0"></div>
                                        <div className="absolute w-[34px] h-[34px] bg-yellow-300 rounded-full transform translate-x-[83px] translate-y-[153px] animate-sunset"></div>
                                        <div className="absolute top-[85px] left-[35px] h-[57px] w-[116px] clip-triangle-left animate-leftshadow"></div>
                                        <div className="absolute top-[85px] left-[35px] h-[57px] w-[116px] clip-triangle-right animate-rightshadow"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col text-center p-2">
                                <p className="text-gray-900 font-bold text-xl pb-1">Day 3</p>
                                <p className="text-gray-600 pt-1">Pyramid</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}