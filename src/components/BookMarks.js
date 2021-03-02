import React from "react";

import { gql, useQuery } from "@apollo/client";

const GET_BookMark = gql`
  query GetBookMark {
    bookmarks {
      id
      url
    }
  }
`;

export default function BookMarks() {
  const { loading, error, data } = useQuery(GET_BookMark);
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
