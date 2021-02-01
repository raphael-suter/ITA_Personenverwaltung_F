import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

const Profile = ({ token, saveToken }) => {
  const [{ name, email }, setUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((user) => setUser(user));
  }, []);

  const signOut = () => {
    fetch("http://localhost:8080/sign_out", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => saveToken(undefined));
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
