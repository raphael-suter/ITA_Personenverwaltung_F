import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [{ name, email }, setUser] = useState({});

  useEffect(() => {
    if (!token || token.trim() === "") {
      window.location.replace("/sign_in");
      return;
    }

    fetch("http://localhost:8080/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            response.json().then((user) => setUser(user));
            break;
          case 404:
            response.json().then(() => {
              localStorage.clear();
              window.location.replace("/sign_in");
            });

            break;
          default:
            alert("ERROR!");
        }
      })
      .catch((error) => alert(error));
  }, [token]);

  const signOut = () => {
    fetch("http://localhost:8080/api/sign_out", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
          case 404:
            localStorage.removeItem("token");
            window.location.replace("/sign_in");
            break;
          default:
            alert("ERROR!");
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <Card className="mx-auto mt-5 shadow-sm" style={{ width: "350px" }}>
      {name && email && (
        <Card.Body>
          <p className="m-0">{name}</p>
          <p>{email}</p>
          <Button variant="info" onClick={signOut}>
            Sign Out
          </Button>
        </Card.Body>
      )}
    </Card>
  );
};

export default Profile;
