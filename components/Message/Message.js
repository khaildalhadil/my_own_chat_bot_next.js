import { FaRegUser } from "react-icons/fa";
import { RiRobot3Line } from "react-icons/ri";

export default function Message({content}) {
  
  return (
    <div className={`grid grid-cols-[1fr_30px] gap-3 items-center w-fit p-3 rounded-xl ${content.role == "user"?"bg-[#303030]":" bg-gray-900"} mt-5`}>
      <p className={`text-white text-lg`}>{content.content}</p>
      <span className="text-white text-2xl"> {content.role == "user"? <FaRegUser />: <RiRobot3Line />}</span>
    </div>
  )
}
