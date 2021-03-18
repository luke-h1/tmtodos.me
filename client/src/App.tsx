import { useState, useEffect } from "react";
import { setAccessToken } from "./utils/accessToken";
import { Routes } from "./Routes";

export const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>loading</p>;
  }
  return <Routes />;
};

export default App;
