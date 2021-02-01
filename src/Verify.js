import React, { useEffect, useState } from "react";

const Verify = ({
  match: {
    params: { token },
  },
}) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token || token.trim() === "") {
      window.location.replace("/sign_in");
      return;
    }

    fetch("http://localhost:8080/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
          case 404:
            response.json().then(({ message }) => setMessage(message));
            break;
          default:
            alert("ERROR!");
        }
      })
      .catch((error) => alert(error));
  }, []);

  return <p>{message}</p>;
};

export default Verify;
