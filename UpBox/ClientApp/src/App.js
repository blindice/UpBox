import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";

import "./custom.css";
import FileUpload from "./components/FileUpload";
import Login from "./components/Login";
import useToken from "./helper/useToken";

export default function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken}></Login>;
  }
  return (
    <FileUpload></FileUpload>
    // <Layout>
    //   <Route exact path='/' component={Home} />
    //   <Route path='/counter' component={Counter} />
    //   <Route path='/fetch-data' component={FetchData} />
    // </Layout>
  );
}
