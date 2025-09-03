import React, { lazy } from "react";
import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdBrowserUpdated } from "react-icons/md";
import axios from "axios";

const FormData = ({ placeholder }) => {
  const Info = [
    {
      label: "Image",
      name: "image",
      type: "file",
      placeholder: "",
    },
    {
      label:"Name",
      name: "name",
      type: "text",
      placeholder: "Enter Name",
    },
    {
      label: "Company",
      name: "company",
      type: "text",
      placeholder: "Enter Company",
    },
    {
      label: "Faculty",
      name: "faculty",
      type: "text",
      placeholder: "Enter Faculty",
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Enter Description",
    }
  ];

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

  

  const Schemas = yup.object().shape({
    Title: yup.string().required("Title is required!!"),
    Description: yup.string().required("Description is required!!"),
    Image: yup.mixed().required("Image is required!!"),
    Signature: yup.mixed().required("Signature is required!!"),
  });

  return (
    <div className="min-h-screen w-full bg-white shadow-2xl flex justify-center items-center py-12 px-6">
        <Formik
          initialValues={{
            image: "",
            name: "",
            company: "",
            faculty: "",
            description: ""
          }}
          validationSchema={Schemas}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="flex flex-col gap-6">
              {Info.map((val, i) => {
                if (val.name === "description") {
                  return (
                    <div key={i} className="flex flex-col gap-2">
                      <label
                        className="text-lg font-semibold text-gray-700"
                        htmlFor="Description"
                      >
                        {val.label}
                      </label>
                      <div className="border rounded-lg overflow-hidden shadow-sm">
                        <JoditEditor
                          ref={editor}
                          value={values.description}
                          config={config}
                          tabIndex={1}
                          onBlur={(newContent) =>
                            setFieldValue("description", newContent)
                          }
                          onChange={(newContent) =>
                            setFieldValue("description", newContent)
                          }
                        />
                      </div>
                      <ErrorMessage
                        name={val.name}
                        component={"div"}
                        className="text-red-600 text-sm"
                      />
                    </div>
                  );
                } else if (val.type === "file") {
                  return (
                    <div
                      key={i}
                      className="flex flex-col gap-2 items-start border border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-400 transition"
                    >
                      <h1 className="font-semibold text-gray-700">{val.label}</h1>
                      <label
                        htmlFor={val.name}
                        className="cursor-pointer w-full flex justify-center items-center"
                      >
                        {values[val.name] ? (
                          <img
                            src={URL.createObjectURL(values[val.name])}
                            className="h-48 w-72 object-cover rounded-lg shadow"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center bg-gray-100 h-48 w-72 rounded-lg border border-gray-200">
                            <MdBrowserUpdated size={40} className="text-gray-500" />
                            <span className="text-gray-400 text-sm mt-2">
                              Upload {val.label}
                            </span>
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        id={val.name}
                        className="hidden"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) =>
                          setFieldValue(val.name, e.target.files[0])
                        }
                      />
                      <ErrorMessage
                        name={val.name}
                        component={"div"}
                        className="text-red-600 text-sm"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className="flex flex-col gap-2">
                      <label className="font-semibold text-gray-700">
                        {val.label}
                      </label>
                      <Field
                        name={val.name}
                        type={val.type}
                        placeholder={val.placeholder}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
                      />
                      <ErrorMessage
                        name={val.name}
                        component={"div"}
                        className="text-red-600 text-sm"
                      />
                    </div>
                  );
                }
              })}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      
    </div>
  );
};

export default FormData;
