import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";

const SignIn = ({ saveToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = () => {
    fetch("http://localhost:8080/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            response.json().then(({ token }) => saveToken(token));
          case 404:
            setError("Anmeldedaten ungültig.");
        }
      })
      .catch((err) => alert(err));
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
          <Button variant="info" onClick={signIn}>
            Sign In
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignIn;
