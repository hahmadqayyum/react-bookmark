import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const BookMarkQuery = gql`
  query GetBookmarks {
    bookmark {
      id
      url
    }
  }
`;
const BookMark = () => {
  const { loading, error, data, refetch } = useQuery(BookMarkQuery);

  console.log(data);
  if (error) {
    return <div>{error.message}</div>;
  }
  if (loading) {
    return <div>loading//</div>;
  }

  return (
    <div>
      {data.map((data) => (
        <li key={data.id}>
          <h2>{data.url}</h2>
          <h3>{data.description}</h3>
        </li>
      ))}
    </div>
  );
};

export default BookMark;
