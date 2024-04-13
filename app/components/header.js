import React from "react";

function Header() {
  return (
    <div className="flex mx-6 mt-3 mb-1 p-2">
      <h1 className="flex-auto w-3/5 title-color font-libre-baskerville text-2xl">
        Kitchen Diary
      </h1>
      <p className="flex-auto w-1/4 text-lg font-roboto text-color">UserName</p>
      <p className="flex-auto text-lg font-roboto text-color">Log Out</p>
    </div>
  );
}

export default Header;
