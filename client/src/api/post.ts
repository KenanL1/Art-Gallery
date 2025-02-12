import AIModel from "../enum/AIModel";
import { blobToBase64 } from "../utils";
import { CardType } from "../components/Card";
import axios from "axios";

export interface PostResponse {
  results: CardType[];
  next: number | null;
  prev: number | null;
}

// Generate AI art by calling API
export const generateImage = async ({
  prompt,
  model,
}: {
  prompt: string;
  model: AIModel;
}) => {
  let url = "";
  let body = {};
  let img;
  let response;
  switch (model) {
    case AIModel.OpenAI:
      url = import.meta.env.VITE_API_URL + "/api/v1/dalle";
      body = {
        prompt: prompt,
        // n: form.numImages,
      };
      break;
    case AIModel.FLUX:
      let width = 512;
      let height = 512;
      url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        prompt
      )}?width=${width}&height=${height}&model=flux`;
      response = await axios.get(url, {
        responseType: "blob",
        maxRedirects: 5, // Allow redirects
      });
      break;
    default:
      url =
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";
      body = {
        inputs: prompt,
        // guidance_scale: form.guidance_scale,
        // steps: form.steps,
        // seed: -1,
      };
      response = await axios.post(url, body, {
        responseType: "blob",
        headers: {
          Authorization: import.meta.env.VITE_HUGGINGFACE_KEY,
        },
      });
  }

  const data = response?.data;

  switch (model) {
    case AIModel.OpenAI:
      img = `data:image/jpeg;base64,${data.photo}`;

    // case AIModel.FLUX:
    //   await response.buffer()
    default:
      img = await blobToBase64(data);
  }

  return img;
};

// Create a new Post
export const createPost = async (body: CardType) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/post`,
    body
  );

  return response.data;
};

// Get all the posts
export const getPosts = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/post?page=${pageParam}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

// Get a single post by id
export const getPost = async (postId: string) => {
  const response = await axios(
    `${import.meta.env.VITE_API_URL}/api/v1/post/${postId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

// Get posts made from user
export const getPostFromUser = async ({
  user,
  pageParam = 1,
}: {
  user: string | undefined;
  pageParam?: number;
}) => {
  const response = await axios(
    `${
      import.meta.env.VITE_API_URL
    }/api/v1/post/userPost/${user}?page=${pageParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

// Get posts that the user liked
export const getLikedPosts = async ({
  user,
  pageParam = 1,
}: {
  user: string | undefined;
  pageParam?: number;
}) => {
  const response = await axios(
    `${import.meta.env.VITE_API_URL}/api/v1/likes/${user}?page=${pageParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

// Delete a post
export const deletePost = async ({
  _id,
  photo_id,
}: {
  _id: string;
  photo_id: string;
}) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/v1/post`,
    {
      data: { _id: _id, photo_id: photo_id },
    }
  );

  return response.data;
};

// Like a post
export const likePost = async ({
  user,
  postId,
  isLiked,
}: {
  user: string | null;
  postId: any;
  isLiked: boolean;
}) => {
  const response = await axios(
    `${import.meta.env.VITE_API_URL}/api/v1/likes/${user}/${postId}`,
    {
      method: isLiked ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Check if a post is liked by user
export const getIsPostLiked = async ({
  user,
  postId,
}: {
  user: string | null;
  postId: any;
}) => {
  const response = await axios(
    `${import.meta.env.VITE_API_URL}/api/v1/likes/${user}/${postId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

// Handle File Upload
export const uploadImage = async ({
  image,
  username,
}: {
  image: File | null;
  username: string | null;
}) => {
  if (image) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    await new Promise((resolve, reject) => {
      reader.onload = resolve;
    });
    const response = await axios(
      `${import.meta.env.VITE_API_URL}/api/v1/post`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: username,
          photo: reader.result,
          prompt: image?.name,
          model: "upload",
        },
      }
    );
    return response.data;
  }
};
