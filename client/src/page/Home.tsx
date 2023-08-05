import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../store";
import { getPosts } from "../api/post";
import { Card, FormField, Loader } from "../components";
import { CardType } from "../components/Card";
// import {
//   fetchPosts,
//   selectLoading,
//   selectPost,
// } from "../store/Reducers/postSlice";
import MasonryLayout from "../components/MasonryLayout";

const Home = () => {
  // const allPosts = useAppSelector(selectPost);
  // const loading = useAppSelector(selectLoading);
  const {
    data: allPosts,
    isLoading,
    isError,
  } = useQuery<CardType[]>(["posts"], getPosts);

  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<
    NodeJS.Timeout | undefined
  >();
  const [searchedResults, setSearchedResults] = useState<CardType[]>([]);
  const dispatch = useAppDispatch();

  // // Get post on inital render
  // useEffect(() => {
  //   dispatch(fetchPosts());
  // }, []);

  // When search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts?.filter(
          (item) =>
            (item.name &&
              item.name.toLowerCase().includes(searchText.toLowerCase())) ||
            (item.prompt &&
              item.prompt.toLowerCase().includes(searchText.toLowerCase()))
        );
        if (searchResult) setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="mx-auto">
      <div className="mt-16">
        <FormField
          labelName="Search Images"
          type="text"
          name="text"
          placeholder="Search Prompt..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Results for{" "}
                <span className="text-[#222328] dark:text-white">
                  {searchText}
                </span>
                :
              </h2>
            )}
            {searchText ? (
              <MasonryLayout
                data={searchedResults}
                title="No Search Results Found"
              />
            ) : (
              <MasonryLayout data={allPosts} title="No Posts Yet" />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
