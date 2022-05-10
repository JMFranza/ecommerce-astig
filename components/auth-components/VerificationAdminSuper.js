import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import forms from "../../config/FormService";

const VerificationAdminSuper = ({ profile }) => {
  const router = useRouter();
  const [verificationFinish, setVerficiationFinish] = useState(false);
  const handleSubmit = async () => {
    if (Object.keys(profile).length == 0) return;
    const token = profile.values.token;
    const data = await forms.super_admin_account_verification(token);
    console.log(data);
    if (!data.success) {
      toast.error(data.message);
    } else {
      setVerficiationFinish(true);
      toast.success("Successfully granted access the Admin");
    }
  };
  if (Object.keys(profile).length == 0) return <></>;
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800  text-2xl">
                Verify <strong>{profile.data.full_name} </strong>account now?
              </h1>
              <p className="my-2 text-gray-800">
                Click the button below to verify{" "}
                <strong>{profile.data.full_name} </strong>. <br />
                Location :{" "}
                <strong>
                  {profile.data.country} , {profile.data.city}{" "}
                </strong>{" "}
                <br />
                Postal Code : <strong>{profile.data.postal_code} </strong>{" "}
                <br />
                Email : <strong>{profile.data.email} </strong>
              </p>
              <button
                onClick={handleSubmit}
                className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-black text-white hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-700 focus:ring-opacity-50"
              >
                Verify Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationAdminSuper;
