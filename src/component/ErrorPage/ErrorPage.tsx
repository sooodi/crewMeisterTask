import React from "react";

type Props = {};

const ErrorPage = ({}: Props) => (
  <div
    className="lg:flex lg:m-16 text-center lg:text-left justify-center items-center"
    role="main"
  >
    <div className="p-16">
      <p className="h-10 text-red-500">🪴 Error!</p>
      <hr className="w-3/5 sm:w-full" />
      <h1
        className="mt-6 lg:text-5xl sm:text-4xl font-headline tracking-tight font-extrabold text-gray-900 leading-snug sm:leading-normal"
        role="heading"
      >
        {/* OOps! <br /> */}
        <span className="text-red-700" role="heading">
          Somthing went wrong!
        </span>
      </h1>
    </div>
  </div>
);

export default ErrorPage;
