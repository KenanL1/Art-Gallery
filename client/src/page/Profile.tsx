import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../store";
// import { selectPost } from "../store/Reducers/postSlice";
import { getPosts } from "../api/post";
import { CardType } from "../components/Card";
import {
  getFollowerCount,
  getFollowingCount,
  getLikesCount,
  getProfile,
} from "../api/profile";
import { getPostFromUser, getLikedPosts } from "../api/post";
import { useParams } from "react-router-dom";
import MasonryLayout from "../components/MasonryLayout";

const Profile = () => {
  const { user } = useParams();
  const [sortBy, setSortBy] = useState<string>("oldest");
  const [postType, setPostType] = useState<number>(1);
  const [posts, setPosts] = useState<any>();

  const queryClient = useQueryClient();

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile", user],
    queryFn: () => getProfile(user),
  });

  const { data: following, isLoading: isFollowingLoading } = useQuery({
    queryKey: ["following", user],
    queryFn: () => getFollowingCount(user),
  });

  const { data: followers, isLoading: isFollowersLoading } = useQuery({
    queryKey: ["followers", user],
    queryFn: () => getFollowerCount(user),
  });

  const { data: likes, isLoading: isLikesLoading } = useQuery({
    queryKey: ["likes", user],
    queryFn: () => getLikesCount(user),
  });

  const userPost = useQuery({
    queryKey: ["userPost", user],
    queryFn: () => getPostFromUser(user),
    onSuccess: (data) => {
      setPosts(data);
    },
  });

  const likedPost = useQuery({
    enabled: false,
    queryKey: ["likedPost", user],
    queryFn: () => getLikedPosts(user),
    onSuccess: (data) => {
      setPosts(data);
    },
  });

  // Change posts type
  // 1 - User Post
  // 2 - User liked post
  const changePostType = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const type = Number(e.currentTarget.getAttribute("data-post-type"));
    setPostType(type);
    type == 1 ? userPost.refetch() : likedPost.refetch();
    // setPosts(type == 1 ? userPost.data : likedPost.data);
  };

  // Sort post by newest
  const sortByNewest = () => {
    return posts.sort((x: any, y: any) => {
      return new Date(x.createdAt).getTime() - new Date(y.createdAt).getTime();
    });
  };

  // Sort post by oldest
  const sortByOldest = () => {
    return posts.sort((x: any, y: any) => {
      return new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime();
    });
  };

  // Sort post by most liked
  const sortByLikes = () => {
    return posts.sort((x: any, y: any) => {
      return y.likes - x.likes;
    });
  };

  // Calls the specific sort function based on the selected option
  const sortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    switch (e.target.value) {
      case "newest":
        setPosts(sortByNewest());
        break;
      case "oldest":
        setPosts(sortByOldest());
        break;
      case "likes":
        setPosts(sortByLikes());
        break;
    }
  };

  useEffect(() => {
    setPosts(postType == 1 ? userPost.data : likedPost.data);
  }, []);

  return (
    <>
      {!isProfileLoading &&
      !isFollowersLoading &&
      !isFollowingLoading &&
      !isLikesLoading ? (
        <div>
          <div className="flex flex-col w-full p-5 bg-gray-600">
            <h2 className="font-semibold text-white text-3xl text-start">
              {profile.username}
            </h2>
            <div className="flex gap-4 text-white">
              <p className="text-white">{followers} Followers</p>
              <p className="text-white">{following} Following</p>
              <p className="text-white">{likes} Likes</p>
            </div>
          </div>
          <div className="flex py-2 justify-between">
            <div className="flex gap-4 p-2">
              <button
                id="my-images"
                data-post-type="1"
                className={`${
                  postType == 1 ? "bg-gray-200" : "bg-gray-500"
                } p-1 rounded-md`}
                onClick={changePostType}
              >
                My Images
              </button>
              <button
                id="my-likes"
                data-post-type="2"
                className={`${
                  postType == 2 ? "bg-gray-200" : "bg-gray-500"
                } rounded-md p-1`}
                onClick={changePostType}
              >
                My Likes
              </button>
            </div>
            <div className="p-2">
              <select onChange={sortChange} value={sortBy}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="likes">Most Liked</option>
              </select>
            </div>
          </div>
          {(postType == 1 && !userPost.isLoading) ||
          (postType == 2 && !likedPost.isLoading) ? (
            <MasonryLayout data={posts} title="No Post" />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Profile;
