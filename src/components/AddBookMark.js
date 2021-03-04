import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";

const BookMarksQuery = gql`
  {
    bookmark {
      id
      url
      description
    }
  }
`;

const AddBookMarkMutation = gql`
  mutation addBookmark($url: String!, $description: String!) {
    addBookmark(url: $url, description: $description) {
      url
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(BookMarksQuery);
  const [addBookmark] = useMutation(AddBookMarkMutation);
  let textfield;
  let description;
  const addBookmarkSubmit = () => {
    addBookmark({
      variables: {
        url: textfield.value,
        description: description.value,
      },
      refetchQueries: [{ query: BookMarksQuery }],
    });
    console.log("textfield", textfield.value);
    console.log("Desc", description.value);
  };
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
      <div>
        <input
          type="text"
          placeholder="URL"
          ref={(node) => (textfield = node)}
        />
        <input
          type="text"
          placeholder="Description"
          ref={(node) => (description = node)}
        />
        <button onClick={addBookmarkSubmit}>Add BookMark</button>
      </div>
    </div>
  );
}
