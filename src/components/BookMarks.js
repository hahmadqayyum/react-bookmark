import React from "react";

import { useQuery } from "@apollo/client";
import { BookMarksQuery } from "./AddBookMark";

export default function BookMarks() {
  const { loading, error, data } = useQuery(BookMarksQuery);

  console.log(data);
  if (loading) {
    return <div>loading///</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {data.map((data) => {
        return (
          <ul key={data.id}>
            <li>{data.url}</li>
          </ul>
        );
      })}
    </div>
  );
}
