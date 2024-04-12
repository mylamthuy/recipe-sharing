import React from "react";
import Header from "../components/header";
import Heading1 from "../components/heading1";

export default function Page() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex justify-center items-center h-content">
      <div className="w-full h-dvh border border-color border-2 rounded-3xl p-8 mb-8 mx-8">
        <Heading1 />
        </div>
      </div>
    </div>
  );
}
