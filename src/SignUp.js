import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const signUp = () => {
    fetch("http://localhost:8080/api/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, repPassword }),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            window.location.replace("/sign_in");
            break;
          case 400:
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
              type="text"
              placeholder="Name"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />
          </Form.Group>
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
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Passwort wiederholen"
              value={repPassword}
              onChange={(evt) => setRepPassword(evt.target.value)}
            />
          </Form.Group>
          <div className="d-flex align-items-center">
            <Button variant="info" onClick={signUp}>
              Sign Up
            </Button>
            <Link to="/sign_in" className="ml-3">
              Sign In
            </Link>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignUp;
