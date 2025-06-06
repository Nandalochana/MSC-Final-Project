import { FC } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../lib/utils/routes-constants";
import { RegisterForm } from "./components/RegisterForm";

export const Register: FC = () => {
  return (
     <div className="flex justify-center items-center h-screen bg-white shadow-base">
          <div className="flex flex-col w-full max-w-lg md:p-16 p-8 rounded-lg bg-white justify-center max-lg:w-[65%] max-xl:w-[70%] max-sm:justify-start max-sm:w-[90%] max-md:w-[80%] max-md:justify-start z-50 shadow-base">
            <h2 className="text-3xl text-black font-semibold text-center mb-10">Create a new account</h2>
            <RegisterForm />
            <hr />
            <p className="text-sm mt-4 text-center text-gray-500">
            Already have an account?{" "}
              <Link
                to={Routes.SIGNIN}
                className="ml-1 font-medium text-blue-500 hover:text-blue-600 duration-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

  );
};
