import React, { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import {
  FloatingLabel,
  Form,
  Button,
  Alert,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const { setUser, setAdmin, user, setToken} = useContext(UserContext);
  const [falseLogin, setFalseLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/auth`, values)
      .then((r) => r.data)
      .then((r) => {
        if (r.message === "ACCESS_GRANTED") {
          setFalseLogin(false);
          localStorage.setItem("metalLycraUser", JSON.stringify(r));
          setUser(JSON.parse(localStorage.getItem("metalLycraUser")));
          setToken(user.token);
          if (r.role>0){setAdmin(true)}
        } else {
          setFalseLogin(true);
        }
      })
      .catch((err) => {
        if (err) setFalseLogin(true);
      });
  };
  return (
    <Container className="d-flex w-75 justify-content-center">
      <Col>
        <Row className="d-flex justify-content-center">
          <Card className="d-flex justify-content-between">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="p-3">
                <FloatingLabel>Email</FloatingLabel>
                <Form.Control
                  type="text"
                  name="credentialEmail"
                  {...register("credentialEmail", {
                    required: "Saisissez votre adresse e-mail",
                  })}
                />
                {errors.credentialEmail && (
                  <p>{errors.credentialEmail.message}</p>
                )}
              </Form.Group>
              <Form.Group className="p-3">
                <FloatingLabel>Mot de passe</FloatingLabel>
                <Form.Control
                  type="password"
                  name="credentialPassword"
                  {...register("credentialPassword", {
                    required: "Saisissez votre mot de passe",
                  })}
                />
                {errors.credentialPassword && (
                  <p>{errors.credentialPassword.message}</p>
                )}
              </Form.Group>
              <Button

                type="submit"
                className="button-link d-flex justify-content-between mx-auto mb-2"
              >
                Log In !
              </Button>
              {falseLogin && <Alert>Mauvais email ou mot de passe !</Alert>}
            </Form>
          </Card>
        </Row>
        <Row>
            <Button size="lg" className="mt-3 d-inline mx-auto">
          <Link to="/addUser" className="button-link" >
              Nouveau membre ?
          </Link>
              </Button>
        </Row>
      </Col>
    </Container>
  );
}
