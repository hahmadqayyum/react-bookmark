import React, { useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import {gql, useMutation} from "@apollo/client"


const ADD_BOOKMARK = gql`
mutation AddBookmark($url: String!){
  addBookmark(url: $url){
    id
  }
}
`

function AddBookMark() {
  // const [data, setData] = useState({
  //   url: "",
  //   description: "",
  // });
  const Inputref = useRef()
  const [addBookmark] = useMutation(ADD_BOOKMARK);
  const validationForm = Yup.object({
    url: Yup.string().required("Url is required"),
    description: Yup.string().required("description is required"),
  });

  return (
    <div>
      <div>User Form</div>
      <Formik
        initialValues={{
          url: "",
          
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          if (Inputref.current.value !== "") {
            await addBookmark({ variables: { value: Inputref.current.value } });
            Inputref.current.value = "";
          }
        }}
        validationSchema={validationForm}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="url">Url:</label>
              <Field type="text" name="url" id="url" ref={Inputref} />
              <ErrorMessage
                name="url"
                render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
              />
            </div>
            {/* <div>
              <label htmlFor="description">Description:</label>
              <Field type="text" name="description" id="description" />
              <ErrorMessage
                name="description"
                render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
              />
            </div> */}
            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddBookMark;
