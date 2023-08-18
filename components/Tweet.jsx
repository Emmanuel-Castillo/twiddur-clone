import { db } from "@/firebase";
import { openCommentModal, openLoginModal, setCommentTweet } from "@/redux/modalSlice";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  TrashIcon,
  UploadIcon,
} from "@heroicons/react/outline";

import {HeartIcon as FilledHeart} from "@heroicons/react/solid"

import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

function Tweet({ data, id }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  async function likeComment(e) {
    e.stopPropagation();

    if(!user.username){
      dispatch(openLoginModal())
      return
    }

    if (likes.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayUnion(user.uid),
      });
    }
  }

  async function deleteTweet(e){
    e.stopPropagation()

    await deleteDoc(doc(db,"posts",id))
  }

  useEffect(() => {

    if (!id) return 

    const unsubscribe = onSnapshot(doc(db, "posts", id), (doc) => {
      setLikes(doc.data()?.likes);
      setComments(doc.data()?.comments)
    });

    return unsubscribe
  }, []);
  return (
    <div
      className="border-b border-gray-700 cursor-pointer"
      onClick={() => {
        if(!user.username){
          dispatch(openLoginModal())
          return
        }
        router.push("/" + id)}}
    >
      <TweetHeader
        username={data?.username}
        name={data?.name}
        timestamp={data?.timestamp?.toDate()}
        text={data?.tweet}
        photoUrl={data?.photoUrl}
      />
      <div className="p-3 ml-16 flex space-x-14 text-gray-500">
        <div
          className="flex justify-center items-center space-x-2"
          onClick={(e) => {
            e.stopPropagation();

            if(!user.username){
              dispatch(openLoginModal())
              return
            }

            dispatch(
              setCommentTweet({
                username: data?.username,
                name: data?.name,
                email: data?.email,
                id: id,
                photoUrl: data?.photoUrl,
                tweet: data?.tweet,
              })
            );
            dispatch(openCommentModal());
          }}
        >
          <ChatIcon className="w-5 cursor-pointer hover:text-green-400" />
        
          {comments?.length > 0 && <span>{comments.length}</span>}
        </div>

        <div onClick={(e) => likeComment(e)} className="flex justify-center items-center space-x-2">
          {likes?.includes(user.uid) ? <FilledHeart className="w-5 text-pink-500"/> : <HeartIcon className="w-5 cursor-pointer hover:text-pink-400" />}
          {likes.length > 0 && <span>{likes.length}</span>}
        </div>

        {user.uid === data?.uid && (
          <div className="cursor-pointer hover:text-red-600"
          onClick={(e) => deleteTweet(e)}>
            <TrashIcon className="w-5"/>
          </div>
        )}
        <ChartBarIcon className="w-5 cursor-not-allowed" />
        <UploadIcon className="w-5 cursor-not-allowed" />
      </div>
    </div>
  );
}

export function TweetHeader({ username, name, timestamp, text, photoUrl }) {
  return (
    <div className="flex space-x-3 p-3 border-gray-700">
      <img
        src={photoUrl}
        className="w-11 h-11 rounded-full object-cover"
        alt=""
      />
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
