import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";

export const BookMarksQuery = gql`
  query {
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
  const { refetch } = useQuery(BookMarksQuery);
  // console.log(data);
  const [addBookmark] = useMutation(AddBookMarkMutation);
  let textfield;
  let description;
  const addBookmarkSubmit = async () => {
    await addBookmark({
      variables: {
        url: textfield.value,
        description: description.value,
      },
    });
    await refetch();
    // console.log("textfield", textfield.value);
    // console.log("Desc", description.value);
  };

  return (
    <div>
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
