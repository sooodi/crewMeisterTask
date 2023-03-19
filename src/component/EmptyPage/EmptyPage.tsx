import React, { MouseEventHandler } from "react";
// import { buttonStyles } from "./Button.styles";

type Props = {};

const EmptyPage = ({}: Props) => (
  <div
    className="lg:flex lg:m-16 text-center lg:text-left justify-center items-center"
    role="main"
  >
    <div className="p-16">
      <p className="h-10">🪴 OOps!</p>
      <hr className="w-3/5 sm:w-full" />
      <h1
        className="mt-6 lg:text-5xl sm:text-4xl font-headline tracking-tight font-extrabold text-gray-900 leading-snug sm:leading-normal"
        role="heading"
      >
        {/* OOps! <br /> */}
        <span className="text-green-700" role="heading">
          Absenses list is empty.
        </span>
      </h1>
    </div>
  </div>
);

export default EmptyPage;
