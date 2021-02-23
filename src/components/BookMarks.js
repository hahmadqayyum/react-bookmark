import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const BookMarkQuery = gql`
  {
    bookmark {
      id
      url
      description
    }
  }
`;
const BookMark = () => {
  const { data, error, loading } = useQuery(BookMarkQuery);
console.log(data)
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
