import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    fetch("http://localhost:8080/api/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            response.json().then(({ token }) => {
              localStorage.setItem("token", token);
              window.location.replace("/");
            });

            break;
          case 404:
            response.json().then(({ message }) => setError(message));
            break;
          default:
            alert("ERROR!");
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <Card className="mx-auto mt-5 shadow-sm" style={{ width: "350px" }}>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Email-Adresse"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </Form.Group>
          <div className="d-flex align-items-center">
            <Button variant="info" onClick={signIn}>
              Sign In
            </Button>
            <Link to="/sign_up" className="ml-3">
              Sign Up
            </Link>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignIn;
