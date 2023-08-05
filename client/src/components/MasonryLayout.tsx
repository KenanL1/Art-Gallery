import React, { useState, useEffect } from "react";
import Card from "./Card";
import { CardType } from "./Card";

const MasonryLayout = ({
  data,
  title,
}: {
  data: CardType[] | undefined;
  title: string;
}) => {
  // function handleScroll() {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // }

  // Calculate the number of columns based on the screen width
  const getColumnCount = (): number => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1280) return 5; //xl
    else if (screenWidth >= 1024) return 4; // lg
    else if (screenWidth >= 768) return 3; // md
    else if (screenWidth >= 640) return 2; // sm
    else return 1;
  };

  const [columnCount, setColumnCount] = useState<number>(getColumnCount);
  // Split the iamge array into multiple arrays for columns
  const getColumnArrays = (): CardType[][] => {
    const columnArrays: CardType[][] = Array.from(
      { length: columnCount },
      () => []
    );
    data?.forEach((post, index) => {
      const columnIndex = index % columnCount;
      columnArrays[columnIndex].push(post);
    });
    return columnArrays;
  };

  // Update the column count when the window size changes with debounce
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newColumnCount = getColumnCount();
        if (newColumnCount !== columnCount) {
          setColumnCount(newColumnCount);
        }
      }, 200);
    }

    const debouncedResizeHandler = setTimeout(handleResize, 20);

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(debouncedResizeHandler);
      window.removeEventListener("resize", handleResize);
    };
  }, [columnCount]); // Depend on columnCount to avoid unnecessary effect re-runs

  if (data && data.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {getColumnArrays().map((columnArray, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {columnArray.map((post, index) => (
              <Card key={post._id} {...post} />
            ))}
          </div>
        ))}
      </div>
    );
  }
  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

export default MasonryLayout;
