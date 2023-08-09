import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import { CardType } from "../components/Card";
import { selectUsername } from "../store/Reducers/authSlice";
import { useAppSelector } from "../store";
import { generateImage, createPost } from "../api/post";
import AIModel from "../enum/AIModel";
import { AxiosError } from "axios";

const CreatePost = () => {
  const navigate = useNavigate();
  const sizeOptions = [256, 512, 1024];
  const numImageOptions = [1, 2, 3, 4];
  const username = useAppSelector(selectUsername);
  const queryClient = useQueryClient();

  const [form, setForm] = useState<CardType>({
    _id: "",
    name: username,
    prompt: "",
    photo: "",
    photo_id: "",
    guidance_scale: undefined,
    size: 512,
    steps: undefined,
    numImages: 1,
    model: "",
  });

  const [model, setModel] = useState<AIModel>(AIModel.SD);
  const [size, setSize] = useState<number>(512);
  const [numImages, setNumImages] = useState<number>(1);

  const generateImgMutation = useMutation({
    mutationFn: generateImage,
  });
  const createPostMutation = useMutation<any, any, any>({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries(["posts"], { exact: true });
      alert("Success");
      navigate("/");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const photo = await generateImgMutation.mutateAsync({
      prompt: form.prompt,
      model: model,
    });
    if (photo) {
      setForm({ ...form, photo: photo });
      await createPostMutation.mutateAsync({
        ...form,
        photo: photo,
        model: model,
      });
    }
  };

  return (
    <section className="flex justify-center mx-auto">
      {createPostMutation.isError && (
        <span className="text-red-600 mb-2">
          {createPostMutation.error.response?.data?.message}
        </span>
      )}
      <form className="mt-16">
        <div className="flex flex-col gap-5">
          {/* <FormField
            labelName="Your Name"
            type="text"
            name="name"
            value={username}
            handleChange={handleChange}
          /> */}
          <select
            className="flex flex-col gap-5"
            name="selectModel"
            value={model}
            onChange={(e) => setModel(e.target.value as AIModel)}
          >
            {(Object.keys(AIModel) as Array<keyof typeof AIModel>).map((m) => (
              <option value={AIModel[m]}>{m}</option>
            ))}
          </select>
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          {/* <div className="flex flex-row gap-5 mb-2 justify-between">
            <div className="flex flex-row gap-5 mb-2">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-900"
              >
                Size
              </label>
              <select
                name="size"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              >
                {sizeOptions.map((size) => (
                  <option value={size}>
                    {size}x{size}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row gap-5 mb-2">
              <label
                htmlFor="numImages"
                className="block text-sm font-medium text-gray-900"
              >
                Number Of Images
              </label>
              <select
                name="numImages"
                value={numImages}
                onChange={(e) => setNumImages(Number(e.target.value))}
              >
                {numImageOptions.map((num) => (
                  <option value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div> */}
          {/* {model == AIModel.SD ? (
            <div>
              <FormField
                labelName="Guidance Scale"
                type="range"
                name="guidance_scale"
                value={form.guidance_scale}
                handleChange={handleChange}
              />
              <FormField
                labelName="Guidance Scale"
                type="text"
                name="guidance_scale"
                value={form.guidance_scale}
                handleChange={handleChange}
              />
              <FormField
                labelName="Steps"
                type="range"
                name="steps"
                value={form.steps}
                handleChange={handleChange}
              />
              <FormField
                labelName="Steps"
                type="text"
                name="steps"
                value={form.steps}
                handleChange={handleChange}
              />
            </div>
          ) : (
            <></>
          )} */}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generateImgMutation.isLoading && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            id="generateBtn"
            type="button"
            onClick={handleSubmit}
            className={`dark:text-white bg-green-600 hover:bg-green-700 ${
              !form.prompt ? "opacity-50 pointer-events-none" : "opacity-100"
            }`}
            disabled={!form.prompt}
          >
            {generateImgMutation.isLoading ? "Generating..." : "Generate"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
