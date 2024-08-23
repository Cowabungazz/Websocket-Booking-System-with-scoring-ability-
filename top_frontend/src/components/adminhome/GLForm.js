import React, { useEffect, useState } from "react";
import style from "../adminform/AdminForm.module.scss";
import axios from "axios";
import { toast } from "react-toastify";

const GLForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [teamNames, setTeamNames] = useState([]);
  const [team, setTeam] = useState("");
  const host = process.env.REACT_APP_BACKEND;

  useEffect(() => {
    axios
      .get(host + "/house/get_all_houses")
      .then((res) => {
        // sort res.data then set
        res.data.sort((a, b) => (a.house_name > b.house_name ? 1 : -1));
        console.log(res.data);

        // Extract house names using .map
        const houseNames = res.data.map((item) => item.house_name);
        console.log(houseNames);

        setTeamNames(houseNames);
        setTeam(houseNames[0]); // Set the first house name as the default team
      })
      .catch((err) => {
        toast.error("Failed to get houses");
      });
  }, [host]);

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const headers = {
      headers: {
        Authorization: localStorage.getItem("admin_token"),
      },
    };
    const payload = {
      username: username,
      password: password,
      team_name: team,
    };
    axios
      .post(host + "/admin/create_gl", payload, headers)
      .then((res) => {
        console.log(res.data);
        toast.success("Registration Successful!");
      })
      .catch((err) => {
        console.log(err.response?.data?.message || "Registration Failed");
        toast.error("Registration Failed!");
      });
  };

  return (
    <div
      className={` ${style.Holder} fixed h-80 w-4 bg-white flex items-center justify-center z-[80]`}
    >
      <div className={style.Form}>
        <h1>GL registration</h1>
        <form id="loginForm" onSubmit={handleRegisterSubmit}>
          <div className={style.Input}>
            <div htmlFor="username" className={style.InputLabel}>
              Username:{" "}
            </div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className={style.InputBox}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={style.Input}>
            <div htmlFor="password" className={style.InputLabel}>
              Password:{" "}
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={style.InputBox}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={style.Input}>
            <div htmlFor="team" className={style.InputLabel}>
              Team:{" "}
            </div>
            <select
              id="team"
              name="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className={style.InputBox}
            >
              {teamNames.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
          <div className={style.Submit}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <div className={style.Backdrop} />
    </div>
  );
};

export default GLForm;
