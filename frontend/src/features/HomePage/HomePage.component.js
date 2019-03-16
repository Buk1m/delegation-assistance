import React from "react";

const HomePage = () => {
  return (
    <div>
      <h1>
        <title>Fastpark - best what you can use to park</title>
      </h1>
      <div id="index-app">
        <div className="index-box">
          <h1>Fastpark</h1>
          <h4>Access to all application functionalities with only one click!</h4>
          <div className="d-flex justify-content-center">
            <a href="/signup" className="btn btn-index">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
