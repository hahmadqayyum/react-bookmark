import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

function AddBookMark() {
  const [data, setData] = useState({
    url: "",
    description: "",
  });

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
          description: "",
        }}
        onSubmit={(values) => {
          setData({
            ...data,
            url: values.url,
            description: values.description,
          });
          console.log(data);
          //
        }}
        validationSchema={validationForm}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="url">Url:</label>
              <Field type="text" name="url" id="url" />
              <ErrorMessage
                name="url"
                render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <Field type="text" name="description" id="description" />
              <ErrorMessage
                name="description"
                render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
              />
            </div>
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
