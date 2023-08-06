import React from "react";
import { useMutation } from "@tanstack/react-query";

import { download, remove } from "../assets";
import { downloadImage } from "../utils";
import { useAppDispatch } from "../store";
import { deletePost } from "../api/post";
import { openModal } from "../store/Reducers/modalSlice";

export interface CardType {
  _id: string;
  name: string | null;
  prompt: string;
  photo: any;
  photo_id: string;
  model?: string;
  guidance_scale?: number | undefined;
  size?: number;
  numImages?: number | undefined;
  steps?: number | undefined;
  author?: any;
}

const Card = ({ _id, name, prompt, photo, photo_id, model }: CardType) => {
  const dispatch = useAppDispatch();

  const deletePostMutation = useMutation(deletePost);

  const handleDelete = async (
    e: React.SyntheticEvent,
    _id: string,
    photo_id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    await deletePostMutation.mutateAsync({ _id, photo_id });
    window.location.reload();
  };
  const openPost = (e: React.MouseEvent) => {
    dispatch(openModal(_id));
  };

  return (
    <>
      <div
        onClick={openPost}
        className="relative overflow-hidden post cursor-pointer"
      >
        <img
          className="h-auto w-full rounded-lg break-inside-avoid"
          src={photo}
          alt={prompt}
        />
        <div className="flex flex-col justify-between items-be absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 transition duration-500 ease-in-out hover:opacity-100">
          <div className="m-4 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name && name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <div className="m-4 flex justify-between">
            <p className="text-white text-sm overflow-y-auto">{prompt}</p>
            <button
              type="button"
              onClick={(e) => handleDelete(e, _id, photo_id)}
              className="outline-none bg-transparent border-none"
            >
              <img
                src={remove}
                alt="remove"
                className="w-6 h-6 object-contain invert"
                title="remove"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
