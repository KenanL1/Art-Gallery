import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { selectUsername } from "../store/Reducers/authSlice";

function Upload() {
  const [image, setImage] = useState<File | null>(null);
  const username = useAppSelector(selectUsername);

  const navigate = useNavigate();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle file upload
    try {
      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
          console.log("RESULT", reader.result);
          const response = await fetch("http://localhost:5000/api/v1/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: username,
              photo: reader.result,
              prompt: image.name,
              model: "upload",
            }),
          });
          await response.json();
          alert("Success");
          navigate("/");
        };
      }
    } catch (err) {
      alert(err);
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
