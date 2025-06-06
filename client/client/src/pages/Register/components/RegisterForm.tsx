import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../components/input/input";
import { Button } from "../../../components/button/button";
import { RegisterFormSchema, RegisterFormType } from "./schema";
import { useSignUp } from "../api/query";
import { FaShoppingCart, FaUserTie } from "react-icons/fa";
import { uploadImageToAzureBlob } from "../../../utils/azureBlob";

export const RegisterForm: FC = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>("Freelancer");
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onChange",
    defaultValues: { role: "Freelancer" },
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
    setError,
    setValue,
  } = methods;

  const signUp = useSignUp();

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    try {
      console.log("Submitting form", data); // Debugging statement
      const { confirmPassword, ...submitData } = data;
      console.log("Submit data", submitData); // Additional debugging statement
      await signUp.mutateAsync({ ...submitData, role: selectedRole, profileImg: profileImageUrl });
      console.log("Form submitted successfully"); // Additional debugging statement
    } catch (error: unknown) {
      console.error("Error submitting form", error); // Additional debugging statement
      if (error instanceof Error) {
        setError("root", {
          type: "manual",
          message: error.message,
        });
      } else {
        setError("root", {
          type: "manual",
          message: "An unexpected error occurred",
        });
      }
    }
  };

  const handleNext = async (fields: (keyof RegisterFormType)[]) => {
    const isValid = await trigger(fields);

    if (step === 3 && !selectedRole) {
      methods.setError("role", {
        type: "manual",
        message: "Role is required",
      });
      return;
    }

    if (isValid) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        const url = await uploadImageToAzureBlob(file);
        setProfileImageUrl(url);
        setValue("profileImg", url); // Set the uploaded image URL to the profileImg input field
      } catch (error) {
        setError("profileImg", {
          type: "manual",
          message: "Failed to upload image",
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {step === 1 && (
          <>
            <Input
              type="text"
              label="First Name"
              placeholder="First Name"
              name="firstName"
              errors={errors}
            />
            <Input
              type="text"
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
              errors={errors}
            />
            <Input
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
              errors={errors}
            />
            <Input
              type="text"
              label="Telephone Number"
              name="telephoneNr"
              placeholder="Telephone Number"
              errors={errors}
            />
            <Input
              type="text"
              label="Mobile Number"
              name="mobileNr"
              placeholder="Mobile Number"
              errors={errors}
            />
            <Input
              type="hidden" // Make the input hidden
              label="Profile Image URL"
              placeholder="Profile Image URL"
              name="profileImg"
              errors={errors}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Image</label>
              <input type="file" onChange={handleImageUpload} />
              {errors.profileImg && (
                <p className="text-red-500 text-sm">{errors.profileImg.message}</p>
              )}
            </div>
            <Button
              type="button"
              onClick={() =>
                handleNext([
                  "firstName",
                  "lastName",
                  "email",
                  "telephoneNr",
                  "mobileNr",
                  "profileImg",
                ])
              }
            >
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Input
              type="text"
              label="Address"
              placeholder="Address"
              name="address1"
              errors={errors}
            />
            <Input
              type="text"
              label="Address Line 2"
              placeholder="Address Line 2"
              name="address2"
              errors={errors}
            />
            <Input
              type="text"
              label="Address Line 3"
              placeholder="Address Line 3"
              name="address3"
              errors={errors}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
              errors={errors}
            />
            <Input
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              errors={errors}
            />
            <div className="flex justify-between gap-4">
              <Button type="button" onClick={handleBack}>
                Back
              </Button>
              <Button
                type="button"
                onClick={() =>
                  handleNext([
                    "address1",
                    "address2",
                    "address3",
                    "password",
                    "confirmPassword",
                  ])
                }
              >
                Next
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Choose Your Role</h2>
            </div>
            <div className="flex justify-center gap-6">
              {/* Freelancer Role */}
              <div
                onClick={() => setSelectedRole("Freelancer")}
                className={`bg-white shadow-lg rounded-lg p-6 w-64 cursor-pointer hover:shadow-xl transition text-center ${
                  selectedRole === "Freelancer"
                    ? "border-2 border-blue-500"
                    : ""
                }`}
              >
                <div className="flex justify-center mb-4 text-blue-500">
                  <FaUserTie size={60} />
                </div>
                <h2 className="text-xl font-semibold">Freelancer</h2>
              </div>

              {/* Buyer Role */}
              <div
                onClick={() => setSelectedRole("Buyer")}
                className={`bg-white shadow-lg rounded-lg p-6 w-64 cursor-pointer hover:shadow-xl transition text-center ${
                  selectedRole === "Buyer" ? "border-2 border-green-500" : ""
                }`}
              >
                <div className="flex justify-center mb-4 text-green-500">
                  <FaShoppingCart size={60} />
                </div>
                <h2 className="text-xl font-semibold">Buyer</h2>
              </div>
            </div>

            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
            {errors.root && (
              <p className="text-red-500 text-sm">{errors.root.message}</p>
            )}
            <div className="flex justify-between gap-4">
              <Button type="button" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit">Sign Up</Button>
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
};
