import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import forms from "../../config/FormService";

const VerificationAdmin = () => {
  const router = useRouter();
  const [verificationFinish, setVerficiationFinish] = useState(false);
  const handleSubmit = async () => {
    const token = router.query.token;
    const data = await forms.admin_account_verification(token);

    if (!data.success) {
      toast.error(data.message);
    } else {
      setVerficiationFinish(true);
      toast.success("Created admin successfully");
      router.push("/views/auth/login-admin");
    }
  };
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                {verificationFinish
                  ? "Acount Has been Verified"
                  : "Verify your account now?"}
              </h1>
              <p className="my-2 text-gray-800">
                Click the button below to verify your email. Please Remember
                that Admin must verify your email first before you can fully use
                your account
              </p>
              <button
                onClick={handleSubmit}
                className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-black text-white hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-700 focus:ring-opacity-50"
              >
                {verificationFinish ? "Sign in Now?" : "Verify Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationAdmin;
