import { closeCommentModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Modal } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function CommentModal() {
  const tweetDetails = useSelector(state => state.modals.commentTweetDetails)

  const isOpen = useSelector((state) => state.modals.commentModalOpen);
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
        className="flex justify-center items-center"
      >
        <div className="relative w-full h-full sm:w-[600px] sm:h-[386px] rounded-lg bg-black border border-gray-500 text-white sm:p-10 p-4">
          <div className="absolute w-[2px] h-[70px] bg-gray-500 left-[40px] top-[90px] sm:left-[64px] sm:top-[120px]"></div>

          <div className="absolute top-4 " onClick={() => dispatch(closeCommentModal())}>
            <XIcon className="w-6 cursor-pointer"/>
          </div>
          <div className="mt-8">
            <div className="flex space-x-3">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={tweetDetails.photoUrl}
              />

              <div>
                <div className="flex space-x-1.5">
                  <h1 className="font-bold">{tweetDetails.name}</h1>
                  <h1 className="text-gray-500">@{tweetDetails.username}</h1>
                </div>
                <p className="mt-1">{tweetDetails.tweet}</p>
                <h1 className="text-gray-500 text-[15px]">
                  Replying to <span className="text-[#1b9bf0]">@{tweetDetails.username}</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-11">
            <div className="flex space-x-3">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src="/assets/kylie.png"
              />

              <div className="w-full">
                <textarea
                  className="w-full bg-transparent resize-none text-lg outline-none"
                  placeholder="Tweet your reply"
                ></textarea>

                <div className="flex justify-between border-t border-gray-700 pt-4">
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
                  <button className="bg-[#1d9bf0] rounded-full px-4 py-1.5 disabled:opacity-50">
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CommentModal;
