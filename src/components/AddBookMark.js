import React, { useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const ADD_BOOKMARK = gql`
  mutation AddBookmark($url: String!, $desc: String!) {
    addBookMarks(url: $url, desc: $desc) {
      url
    }
  }
`;

const GET_BOOKMARK = gql`
  query GetBookmark {
    bookmarks {
      id
      url
      desc
    }
  }
`;

export default function AddBookMark(params) {
  const urlRef = useRef();
  const descRef = useRef();
  const { data, error, loading, refetch } = useQuery(GET_BOOKMARK);
  const [addBookMarks] = useMutation(ADD_BOOKMARK);
  console.log(data);

  if (error) {
    console.log(error.message);
  }
  if (loading) {
    return <div>loading sdfjk</div>;
  }
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addBookMarks({
            variables: {
              url: urlRef.current.value,
              desc: descRef.current.value,
            },
          });
          await refetch();
        }}
      >
        <input ref={urlRef} />
        <input ref={descRef} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
