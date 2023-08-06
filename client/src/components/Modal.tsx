import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../store";
import { selectUser } from "../store/Reducers/authSlice";
import { downloadImage } from "../utils";
import { CardType } from "./Card";
import { closeModal, selectpost } from "../store/Reducers/modalSlice";
import { blackHeart, download, redHeart } from "../assets";
import { likePost, getIsPostLiked, getPost } from "../api/post";
import { followUser, getIsFollowing } from "../api/profile";

const Modal = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const postId = useAppSelector(selectpost);

  // const [isFollowed, setIsFollowed] = useState<boolean>(false);
  // const [isLiked, setIsLiked] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data: post } = useQuery<CardType, Error>({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });
  const { data: isFollowed } = useQuery({
    enabled: !!post, // only run if post query resolved
    queryKey: ["isFollowed", user, post?.author?._id],
    queryFn: () => getIsFollowing({ user, authorId: post?.author?._id }),
  });
  const { data: isLiked } = useQuery({
    queryKey: ["isLiked", user, postId],
    queryFn: () => getIsPostLiked({ user, postId }),
  });

  const likePostMutation = useMutation(likePost, {
    onSuccess: (data) => {
      queryClient.setQueryData(["isLiked", user, postId], !isLiked);
    },
  });
  const followUserMutation = useMutation(followUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["isFollowed", user, post?.author?._id],
        !isFollowed
      );
    },
  });

  const close = () => {
    dispatch(closeModal());
  };

  const modalClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const handleFollowUser = async (e: React.BaseSyntheticEvent) => {
    const result = followUserMutation.mutateAsync({
      user,
      authorId: post?.author._id,
      isFollowed,
    });
    // setIsFollowed(!isFollowed);
  };

  // const isFollowing = async () => {
  //   const result = await isFollowingMutation.mutateAsync({
  //     user,
  //     authorId: post?.author?._id,
  //   });

  //   setIsFollowed(result.data);
  // };

  const handleLike = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await likePostMutation.mutateAsync({ user, postId: post?._id, isLiked });
    // setIsLiked(!isLiked);
  };

  // const isPostLiked = async () => {
  //   const result = await isPostLikedMutation.mutateAsync({
  //     user,
  //     postId: post?._id,
  //   });
  //   setIsLiked(result.data);
  // };

  // useEffect(() => {
  //   isFollowing();
  //   isPostLiked();
  // }, []);

  return (
    <div onClick={close} className="relative z-10" id="modal">
      <div className="backdrop-blur fixed inset-0 bg-gray-500 bg-opacity-50"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 overlay">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg ">
            <div
              onClick={modalClick}
              className="bg-white dark:bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 "
            >
              <div className="flex justify-between m-4">
                <div>
                  <div>
                    <img src={post?.photo}></img>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleLike}
                      className="outline-none bg-transparent border-none px-2"
                    >
                      {isLiked ? (
                        <img
                          src={redHeart}
                          alt="Like"
                          className="w-6 h-6 object-contain transition"
                        />
                      ) : (
                        <img
                          src={blackHeart}
                          alt="Unlike"
                          className="w-6 h-6 object-contain transition"
                        />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadImage(post?._id, post?.photo)}
                      className="outline-none bg-transparent border-none px-0"
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
                  <h3 className="flex">
                    <span className="font-bold dark:text-white">
                      {" "}
                      {post?.author?.username}
                    </span>
                    <button
                      className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black ml-2"
                      onClick={handleFollowUser}
                    >
                      {isFollowed ? "Unfollow" : "Follow"}
                    </button>
                  </h3>
                  <h2 className="text-2xl dark:text-white">{post?.name}</h2>
                  <p className="py-1 border-b border-b-[$e6ebf4]">
                    <span className="font-bold">prompt: </span>
                    {post?.prompt}
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
