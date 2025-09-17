import { FaRegUser } from "react-icons/fa";
import { RiRobot3Line } from "react-icons/ri";

export default function Message({content}) {
  
  return (
    <div className={`grid grid-cols-[1fr_30px] gap-3 items-center w-fit py-2  `}>
      <p className={`text-lg rounded-xl ${content.role == "user"?"bg-[#303030] text-gray-50":" bg-[#f0f2f5] text-gray-800"} mt-1 p-2 `}>{content.content}</p>
      <span className="text-2xl"> {content.role == "user"? <FaRegUser />: <RiRobot3Line />}</span>
    </div>
  )
}
