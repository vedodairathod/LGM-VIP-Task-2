import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Card from "./Card";
import "./App.css";
import LoadingAnime from "./LoadingAnime";

const App = (props) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const func = () => {
    setLoading(true);
    axios
      .get("https://reqres.in/api/users?page=1")
      .then((response) => setUserList(response.data.data))
      .then(
        (response) =>
          new Promise((resolve) =>
            setTimeout(() => {
              resolve(response);
            }, 2000)
          )
      )
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <div className="app_container">
      <Header function={func} />

      {loading ? (
        <LoadingAnime loading={loading} />
      ) : userList.length > 0 ? (
        <div className="all_card_container">
          {userList.map((val, ind) => (
            <Card
              key={val.id}
              id={val.id}
              email={val.email}
              first_name={val.first_name}
              last_name={val.last_name}
              avatar={val.avatar}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default App;
