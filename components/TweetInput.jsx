import { db } from "@/firebase";
import { openLoginModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TweetInput() {
  const [text, setText] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  async function sendTweet() {

    if(!user.username){
      dispatch(openLoginModal())
      return
    }
    
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      uid: user.uid,
      timestamp: serverTimestamp(),
      likes: [],
      tweet: text
    });
    setText("")

  }
  return (
    <div className="flex space-x-3 p-3 border-b border-gray-700">
      <img
        className="w-11 h-11 rounded-full object-cover "
        src={user.photoUrl || "/assets/twitter-logo.png"}
        alt=""
      />

      <div className="w-full">
        <textarea
          className="bg-transparent resize-none outline-none w-full min-h-[50px] text-lg"
          placeholder="What's on your mind?"
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>

        <div className="flex justify-between border-t border-gray-700 pt-4">
          {/* icons div */}

          <div className="flex">
            <div className="iconsAnimation">
              <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="iconsAnimation">
              <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="iconsAnimation">
              <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="iconsAnimation">
              <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="iconsAnimation">
              <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
          </div>
          <button className="bg-[#1d9bf0] rounded-full px-4 py-1.5 disabled:opacity-50" onClick={() => sendTweet()}
          disabled={!text}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default TweetInput;
