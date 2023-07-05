import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { selectUser } from "../store/Reducers/authSlice";
import { downloadImage } from "../utils";
import { CardType } from "./Card";
import {
  closeModal,
  selectIsModalOpen,
  selectpost,
} from "../store/Reducers/modalSlice";
import { blackHeart, download, redHeart } from "../assets";

const Modal = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const post = useAppSelector(selectpost);
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const close = () => {
    dispatch(closeModal());
  };

  const modalClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const followUser = async (e: React.BaseSyntheticEvent) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const path = isFollowed ? "unfollow" : "follow";
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/${user}/${path}/${
          post.author._id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setIsFollowed(!isFollowed);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isFollowing = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/${user}/following/${
          post.author._id
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setIsFollowed(result.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const likePost = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/likes/${user}/${post._id}`,
        {
          method: isLiked ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setIsLiked(!isLiked);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isPostLiked = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/likes/${user}/${post._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setIsLiked(result.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    isFollowing();
    isPostLiked();
  }, []);

  return (
    <div onClick={close} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div
              onClick={modalClick}
              className="bg-white dark:bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
            >
              <div className="flex justify-between m-4">
                <div>
                  <div>
                    <img src={post.photo}></img>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={likePost}
                      className="outline-none bg-transparent border-none mx-4"
                    >
                      {isLiked ? (
                        <img
                          src={redHeart}
                          alt="Like"
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <img
                          src={blackHeart}
                          alt="Unlike"
                          className="w-6 h-6 object-contain"
                        />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadImage(post._id, post.photo)}
                      className="outline-none bg-transparent border-none"
                    >
                      <img
                        src={download}
                        alt="download"
                        className="w-6 h-6 object-contain"
                      />
                    </button>
                  </div>
                </div>
                <div className="ml-3">
                  <h3>
                    <span className="font-bold dark:text-white">
                      {" "}
                      {post.author.username}
                    </span>
                    <button
                      className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black ml-2"
                      onClick={followUser}
                    >
                      {isFollowed ? "Unfollow" : "Follow"}
                    </button>
                  </h3>
                  <h2 className="text-2xl dark:text-white">{post.name}</h2>
                  <p className="py-1 border-b border-b-[$e6ebf4]">
                    <span className="font-bold">prompt: </span>
                    {post.prompt}
                  </p>
                  {/* <p>size: {post.size}</p>
                  <p>guidance: {post.guidance}</p>
                  <p>model: {post.model}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
