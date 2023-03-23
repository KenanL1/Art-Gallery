import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import { CardType } from "../components/Card";
import { selectIsLoggedIn } from "../store/Reducers/authSlice";

const CreatePost = () => {
  enum AIModel {
    OpenAI = "OPENAI",
    SD = "SD",
  }

  const navigate = useNavigate();
  const sizeOptions = [256, 512, 1024];
  const numImageOptions = [1, 2, 3, 4];

  const [form, setForm] = useState<CardType>({
    name: "",
    prompt: "",
    photo: "",
    photo_id: "",
    guidance_scale: undefined,
    size: 512,
    steps: undefined,
    numImages: 1,
  });

  const [generatingImg, setGeneratingImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [model, setModel] = useState<AIModel>(AIModel.OpenAI);
  const [size, setSize] = useState<number>(512);
  const [numImages, setNumImages] = useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async (e: React.BaseSyntheticEvent) => {
    let url = "";
    let body = {};
    if (model === AIModel.OpenAI) {
      url = "http://localhost:5000/api/v1/dalle";
      body = {
        prompt: form.prompt,
        // n: form.numImages,
      };
    } else {
      url = "https://khaki-beds-shout-35-240-225-214.loca.lt/text2img";
      body = {
        prompt: form.prompt,
        guidance_scale: form.guidance_scale,
        steps: form.steps,
        seed: -1,
      };
    }
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();
        const img = model == AIModel.OpenAI ? data.photo : data.images[0];
        setForm({ ...form, photo: `data:image/jpeg;base64,${img}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
        handleSubmit(e as React.FormEvent<HTMLFormElement>);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  return (
    <section className="mx-auto">
      <form className="mt-16" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />
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
          <div className="flex flex-row gap-5 mb-2 justify-between">
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
          </div>
          {model == AIModel.SD ? (
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
          )}
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

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the Community"}
          </button>
        </div> */}
      </form>
    </section>
  );
};

export default CreatePost;
