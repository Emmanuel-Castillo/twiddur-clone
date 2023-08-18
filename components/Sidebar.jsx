import React from "react";
import {
  HomeIcon,
  HashtagIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  BellIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "@/redux/userSlice";
import { closeLoginModal, closeSignupModal } from "@/redux/modalSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
    dispatch(closeLoginModal())
    dispatch(closeSignupModal())
  }

  return (
    <div className="hidden sm:flex flex-col fixed h-full xl:ml-24">
      <nav className="xl:space-y-1.5 relative h-full">
        <div className="flex justify-center xl:justify-start items-center py-3 xl:p-3">
          <Image src={"/assets/twitter-logo.png"} width={34} height={34} />
        </div>
        <SidebarLink text={"Home"} Icon={HomeIcon} />
        <SidebarLink text={"Explore"} Icon={HashtagIcon} />
        <SidebarLink text={"Notifications"} Icon={BellIcon} />
        <SidebarLink text={"Messages"} Icon={InboxIcon} />
        <SidebarLink text={"Bookmarks"} Icon={BookmarkIcon} />
        <SidebarLink text={"Profile"} Icon={UserIcon} />
        <SidebarLink text={"More"} Icon={DotsCircleHorizontalIcon} />
        <button className="hidden xl:inline bg-[#1d9bf0] rounded-full h-[52px] w-[200px] text-lg font-bold mt-2">
          Tweet
        </button>

        <div
          onClick={() => handleSignOut()}
          className="hover:bg-white hover:bg-opacity-10 rounded-full cursor-pointer absolute bottom-0 flex justify-center items-center space-x-3 xl:p-3"
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={user.photoUrl || "/assets/kylie.png"}
            alt=""
          />
          <div className="hidden xl:inline">
            <h1 className="font-bold whitespace-nowrap text-xs">{user.name}</h1>
            <h1 className="text-gray-500 text-xs">@{user.username}</h1>
          </div>
          <DotsHorizontalIcon
            className="h-5 hidden xl:inline
        "
          />
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;

function SidebarLink({ text, Icon }) {
  return (
    <li className="hoverAnimation flex mb-3 xl:justify-start justify-center items-center text-xl space-x-3">
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </li>
  );
}
