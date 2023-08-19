import React, { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../store";
import { getPosts } from "../api/post";
import { FormField, Loader } from "../components";
import { CardType } from "../components/Card";
import { PostResponse } from "../api/post";
import MasonryLayout from "../components/MasonryLayout";

const Home = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PostResponse>(["posts"], getPosts, {
      getNextPageParam: (lastPage) => lastPage.next,
    });

  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<
    NodeJS.Timeout | undefined
  >();
  const [searchedResults, setSearchedResults] = useState<CardType[]>([]);
  const dispatch = useAppDispatch();

  // Infinite scrolling
  // prevent a new function being created on each render.
  // This allows the same callback instance to be referenced across renders when passed to add/removeEventListener.
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [hasNextPage]);

  // When search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = data?.pages
          .flatMap((page) => page.results)
          .filter(
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Prevents stale closure values, ensures latest handleScroll is referenced

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
          <Loader />
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
              <MasonryLayout
                data={data?.pages.flatMap((page) => page.results)}
                title="No Posts Yet"
              />
            )}
          </>
        )}
        {isFetchingNextPage && <Loader />}
      </div>
    </section>
  );
};

export default Home;
