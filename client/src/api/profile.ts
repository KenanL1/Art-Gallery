import axios from "axios";

// follow a user
export const followUser = async ({
  user,
  isFollowed,
  authorId,
}: {
  user: string | null;
  isFollowed: boolean;
  authorId: string;
}) => {
  const path = isFollowed ? "unfollow" : "follow";
  const response = await axios(
    `${import.meta.env.VITE_API_URL}/api/v1/users/${user}/${path}/${authorId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Check if current user is following another user
export const getIsFollowing = async ({
  user,
  authorId,
}: {
  user: string | null;
  authorId: string;
}) => {
  const response = await axios(
    `${
      import.meta.env.VITE_API_URL
    }/api/v1/users/${user}/following/${authorId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

// Get the users number of following
export const getFollowingCount = async (user: string | undefined) => {
  const response = await axios(
    `${import.meta.env.VITE_API_URL}/api/v1/users/${user}/followingCount`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

// Get the users number of followers
export const getFollowerCount = async (user: string | undefined) => {
  const response = await axios(
    `${import.meta.env.VITE_API_URL}/api/v1/users/${user}/followerCount`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

// Get the users number of likes recieved
export const getLikesCount = async (user: string | undefined) => {
  const response = await axios(
    `${import.meta.env.VITE_API_URL}/api/v1/likes/${user}/likeCount`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

// Get user profile infromation
export const getProfile = async (user: string | undefined) => {
  const response = await axios(
    `${import.meta.env.VITE_API_URL}/api/v1/user/${user}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};
