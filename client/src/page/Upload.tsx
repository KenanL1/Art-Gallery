import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../store";
import { selectUsername } from "../store/Reducers/authSlice";
import { uploadImage } from "../api/post";

function Upload() {
  const [image, setImage] = useState<File | null>(null);
  const username = useAppSelector(selectUsername);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation(uploadImage, {
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries(["posts"], { exact: true });
    },
  });

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await uploadMutation.mutateAsync({ image, username });
    if (data) {
      alert("Success");
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Upload an Image</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="file-input" className="mb-2 font-bold text-lg">
            Choose a file to upload:
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="border border-gray-400 p-2 rounded-md dark:text-white"
          />
        </div>
        <button
          type="submit"
          disabled={!image}
          className={`p-2 rounded-md ${
            image
              ? "bg-blue-500 text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default Upload;
