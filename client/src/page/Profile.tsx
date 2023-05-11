import { useState, useEffect } from "react";
import { useAppSelector } from "../store";
import { selectPost } from "../store/Reducers/postSlice";
import { useParams } from "react-router-dom";
import CardList from "../components/CardList";

const Profile = () => {
  const { user } = useParams();
  const allPost = useAppSelector(selectPost);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [following, setFollowing] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [posts, setPosts] = useState<any>();

  // Get the users number of following
  const getFollowingCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${user}/followingCount`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setFollowing(result.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Get the users number of followers
  const getFollowerCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${user}/followerCount`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setFollowers(result.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Get the users number of likes recieved
  const getLikesCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/likes/${user}/likeCount`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setLikes(result.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Get users profile information
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/v1/user/${user}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setProfile(result.data);
      }
      getFollowerCount();
      getFollowingCount();
      getLikesCount();
      fetchPostFromUser();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Get posts made from user
  const fetchPostFromUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/post/userPost/${user}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setPosts(result.data.reverse());
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Get the post liked by the user
  const fetchLikedPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/likes/${user}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setPosts(result.data.reverse().map((p: any) => p.post));
      }
    } catch (e) {
      console.error(e);
    }
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
    fetchProfile();
  }, []);

  return (
    <>
      {!loading ? (
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
                className="focus:bg-gray-500 bg-gray-400 p-1 rounded-md"
                onClick={fetchPostFromUser}
              >
                My Images
              </button>
              <button
                className="focus:bg-gray-500 bg-gray-400 rounded-md p-1"
                onClick={fetchLikedPost}
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
          <CardList data={posts} title="No Post" />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Profile;
