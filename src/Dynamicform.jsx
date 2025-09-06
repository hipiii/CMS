import React, { useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PostDatas from '../src/Lib/PostDatas';

const schema = yup.object().shape({
  imageid: yup.string().required("Image is required"),
  name: yup.string().required("name is required"),
  company: yup.string().required("company is required"),
  faculty: yup.string().required("faculty is required"),
  description: yup.string().required("Description is required"),
});

const formdata = [
  {
    title: "name",
    label: "name",
    type: "text"
  },
  {
    title: "company",
    label: "company",
    type: "text"
  }, {
    title: "faculty",
    label: "faculty",
    type: "text"
  },
]



function Dynamicform() {
  const editor = useRef(null);
  const navigate = useNavigate()

  const { post, err, load, response } = PostDatas("events");


  const fileUpload = (imagdata, setFieldValue) => {
    try {
      const formdata = new FormData()
      formdata.append('images', imagdata)
      axios.

        post('http://192.168.1.65:5000/fileupload', formdata)
        .then(res => {
          console.log(res.data)
          setFieldValue('imageid', res?.data?.fileupload?.id)
          // seticon(res?.data?.fileUpload?.id)
        }).catch(err => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center py-10 mt-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Event</h2>

        <Formik
          initialValues={{
            imageid: '',
            name: '',
            company: '',
            faculty: '',
            description: '',
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            try {
              console.log("Form submitted", values);
              post("events", values, resetForm)
              setTimeout(() => { }, 200);
              toast.success("Event added successfully!");
              navigate('/events')
            } catch (error) {
              toast.error("Event added failed!");
            }
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Image Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Image *</label>
                <input
                  name="image"
                  type="file"
                  className="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    fileUpload(e.target.files[0], setFieldValue)
                  }}
                />
                <ErrorMessage name="imageid" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Dynamic Input Fields */}
              {formdata.map((val, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <label className="text-sm capitalize font-medium text-gray-700">{val.label} *</label>
                  <Field
                    name={val.title}
                    type={val.type}
                    placeholder={`Enter ${val.label}`}
                    className="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <ErrorMessage name={val.title} component="div" className="text-red-500 text-sm" />
                </div>
              ))}

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Description *</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  <JoditEditor
                    ref={editor}
                    value={values.description}
                    onBlur={(newContent) => setFieldValue("description", newContent)}
                  />
                </div>
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Submit Button */}
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 w-full md:w-auto hover:bg-blue-700 transition text-white text-sm font-semibold py-2.5 px-10 rounded-full shadow-md"
                >
                  {load ? "Loading..." : "Submit"}
                </button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>

  );
}

export default Dynamicform;