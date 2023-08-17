import Banner from "@/components/Banner";
import Postfeed from "@/components/Postfeed";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import CommentModal from "@/components/modals/CommentModal";
import { useSelector } from "react-redux";

export default function Home() {

  const username = useSelector(state => state.user.username)
  return (
    <div>
      <div className="bg-black min-h-screen text-[#e7e9ea] max-w-[1400px] mx-auto flex">
      <Sidebar/>
      <Postfeed/>
      <Trending/> 
    </div>

    <CommentModal/>
    {!username && <Banner/>}
    </div>
    
  )
}
