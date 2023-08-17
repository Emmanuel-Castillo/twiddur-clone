import { openCommentModal, setCommentTweet } from "@/redux/modalSlice";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";

function Tweet({ data, id }) {
  const dispatch = useDispatch()
  return (
    <div className="border-b border-gray-700">
      <TweetHeader
        username={data.username}
        name={data.name}
        timestamp={data.timestamp?.toDate()}
        text={data.tweet}
        photoUrl={data?.photoUrl}
      />
      <div className="p-3 ml-16 flex space-x-14 text-gray-500">
        <div onClick={() => {
          dispatch(setCommentTweet({
            username: data?.username,
            name: data?.name,
            email: data?.email,
            id: id,
            photoUrl: data?.email,
          tweet: data?.tweet}))
          dispatch(openCommentModal())}}>
          <ChatIcon className="w-5 cursor-pointer hover:text-green-400" />
        </div>
        <HeartIcon className="w-5 cursor-pointer hover:text-pink-400" />
        <ChartBarIcon className="w-5 cursor-not-allowed" />
        <UploadIcon className="w-5 cursor-not-allowed" />
      </div>
    </div>
  );
}

export function TweetHeader({ username, name, timestamp, text, photoUrl }) {
  return (
    <div className="flex space-x-3 p-3 border-gray-700">
      <img src={photoUrl} className="w-11 h-11 rounded-full object-cover" />
      <div>
        <div className="text-gray-500 flex items-center space-x-2 mb-1">
          <h1 className="text-white font-bold">{name}</h1>
          <span>@{username}</span>
          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          <Moment fromNow>{timestamp}</Moment>
        </div>

        <span>{text}</span>
      </div>
    </div>
  );
}

export default Tweet;
