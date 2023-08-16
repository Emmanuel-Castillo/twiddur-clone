import Postfeed from "@/components/Postfeed";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-[#e7e9ea] max-w-[1400px] mx-auto flex">
      <Sidebar/>
      <Postfeed/>
      <Trending/> 
    </div>
  )
}
