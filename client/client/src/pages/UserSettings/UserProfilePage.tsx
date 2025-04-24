import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUserStore } from "../../store/user-store";
import { useQuery } from "@tanstack/react-query";
import { UserDetailsAPI } from "./api/query-slice";
import { useUpdateUser } from "./api/query";

const UserProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUserStore();

  // Fetch user details
  const {
    data: userDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userDetails", user?.user._id],
    enabled: !!user?.user._id,
    queryFn: () =>
      UserDetailsAPI.getUserDetails({ userId: user?.user._id as string }),
  });

  const updateUserMutation = useUpdateUser();

  // Validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    address1: Yup.string(),
    address2: Yup.string(),
    address3: Yup.string(),
    mobileNr: Yup.string().min(10, "Mobile Number must be at least 10 digits"),
    telephoneNr: Yup.string(),
    hourlyRate: Yup.number().typeError("Hourly Rate must be a number").required("Hourly Rate is required (in euros)"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: userDetails?.data?.firstName || "",
      lastName: userDetails?.data?.lastName || "",
      address1: userDetails?.data?.address1 || "",
      address2: userDetails?.data?.address2 || "",
      address3: userDetails?.data?.address3 || "",
      mobileNr: userDetails?.data?.mobileNr || "",
      telephoneNr: userDetails?.data?.telephoneNr || "",
      hourlyRate: userDetails?.data?.hourlyRate || 0,
    },
    enableReinitialize: true, // Ensure form updates when userDetails changes
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitting form", values);
      updateUserMutation.mutate({
        userId: user?.user._id as string,
        ...values,
      });
      setIsEditing(false);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-700 font-medium">
            Page is loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-700">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="h-48 flex flex-col justify-center items-center bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">User Profile</h1>
      </section>
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 my-8">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {Object.keys(formik.values).map((field) => (
              <div key={field}>
                <label className="block text-base font-semibold text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {isEditing ? (
                  <>
                    <input
                      name={field}
                      value={formik.values[field as keyof typeof formik.values]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    {formik.touched[field as keyof typeof formik.values] &&
                      formik.errors[field as keyof typeof formik.values] && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors[field as keyof typeof formik.values]}
                        </p>
                      )}
                  </>
                ) : (
                  <p className="text-gray-700">
                    {formik.values[field as keyof typeof formik.values]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
                    formik.isValid && formik.dirty
                      ? "opacity-100"
                      : "opacity-50"
                  }`}
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfilePage;
