import React from "react";
import { Styles } from "./styles";
import Header from "./components/header";

export default function Page() {
  return (
    <main>
      <Header />
      <select>
        <option value="all">All</option>
        <option value="indian">Indian</option>
        <option value="korean">Korean</option>
        <option value="chinese">Chinese</option>
        <option value="vietnamese">Vietnamese</option>
        <option value="western">Western</option>
        <option value="thai">Thai</option>
        <option value="european">European</option>
      </select>
    </main>
  );
}
