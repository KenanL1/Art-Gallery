import React from "react";
import Card from "./Card";
import { CardType } from "./Card";

const CardList = ({ data, title }: { data: CardType[]; title: string }) => {
  if (data && data.length > 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((post) => (
          <Card key={post._id} {...post} />
        ))}
      </div>
    );
  }
  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

export default CardList;
