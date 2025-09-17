import React from 'react'
import { RiRobot3Line } from 'react-icons/ri'

export default function Loadding({incomingMesssage}) {
  return (
    // <div className=' ml-auto'>
    //   <div className={`grid grid-cols-[1fr_30px] gap-3 items-center w-fit p-3 rounded-xl bg-gray-900 mt-5`}>
    //     <p className={`text-white text-lg`}>{incomingMesssage}</p>
    //     <span className="text-white text-2xl"><RiRobot3Line /></span>
    //   </div>
    // </div>

    <div className={`grid grid-cols-[1fr_30px] gap-3 items-center w-fit py-2  `}>
      <p className={`text-lg rounded-xl bg-[#f0f2f5] text-gray-800 mt-1 p-2 `}>{incomingMesssage}</p>
      <span className="text-2xl"> <RiRobot3Line /> </span>
    </div>
  )
}
