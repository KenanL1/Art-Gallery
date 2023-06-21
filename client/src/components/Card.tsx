import React from "react";

import { download, remove } from "../assets";
import { downloadImage } from "../utils";
import { useAppDispatch } from "../store";
import { openModel } from "../store/Reducers/modalSlice";

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
}

const Card = ({ _id, name, prompt, photo, photo_id, model }: CardType) => {
  const dispatch = useAppDispatch();

  const deletePost = async (
    e: React.SyntheticEvent,
    _id: string | undefined,
    photo_id: string
  ) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      await fetch("http://localhost:5000/api/v1/post", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id, photo_id: photo_id }),
      });
      window.location.reload();
    } catch (e) {
      alert(e);
    }
  };
  const openPost = (e: React.MouseEvent) => {
    dispatch(openModel(_id));
  };

  return (
    <div>
      <div
        onClick={openPost}
        className="rounded-xl group relative shadow-card hover:shadow-cardhover card "
      >
        <div className="h-0 overflow-hidden" style={{ paddingBottom: "100%" }}>
          <img
            className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
            src={photo}
            alt={prompt}
          />
        </div>
        <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
          <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
          <div className="mt-5 flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
                {name && name[0]}
              </div>
              <p className="text-white text-sm">{name}</p>
            </div>
            <div>
              <button
                type="button"
                onClick={(e) => deletePost(e, _id, photo_id)}
                className="outline-none bg-transparent border-none"
              >
                <img
                  src={remove}
                  alt="remove"
                  className="w-6 h-6 object-contain invert"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
