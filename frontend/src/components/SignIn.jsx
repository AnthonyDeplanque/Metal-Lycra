import {
  Container,
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import postApi from "../utils/postApi";
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function SignIn() {
  const [error, setError] = useState(false);
  const { setUser, setAdmin } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    const dateOfInscription = Date.now();
    const role = 0;
    const data = { ...values, dateOfInscription, role };
    const credentialEmail = data.email;
    const credentialPassword = data.password;
    postApi(`users/`, data).catch((err) => setError(true));
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/auth`, {
        credentialEmail,
        credentialPassword,
      })
      .then((r) => r.data)
      .then((r) => {
        if (r.message === "ACCESS_GRANTED") {
          localStorage.setItem("metalLycraUser", JSON.stringify(r));
          setUser(JSON.parse(localStorage.getItem("metalLycraUser")));
          if (r.role > 0) {
            setAdmin(true);
          }
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        if (err) setError(true);
      });
      window.location.reload();

  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <FloatingLabel>pseudo</FloatingLabel>
          <Form.Control
            type="text"
            name="nickName"
            {...register("nickName", {
              required: "Saisissez votre pseudo",
            })}
          ></Form.Control>
          {errors.nickName && <p>{errors.nickName.message}</p>}
        </Form.Group>

        <Form.Group>
          <FloatingLabel>email</FloatingLabel>
          <Form.Control
            type="text"
            name="email"
            {...register("email", {
              required: "Saisissez votre email",
            })}
          ></Form.Control>
          {errors.email && <p>{errors.email.message}</p>}
        </Form.Group>

        <Form.Group>
          <FloatingLabel>Mot de passe</FloatingLabel>
          <Form.Control
            type="password"
            name="password"
            {...register("password", {
              required: "Saisissez votre mot de passe",
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </Form.Group>

        <hr />
        <Form.Group>
          <Row>
            <Col>
              <FloatingLabel>prénom</FloatingLabel>
              {errors.firstName && <p>{errors.firstName.message}</p>}
              <Form.Control
                type="firstName"
                name="firstName"
                {...register("firstName", {
                  required: "Saisissez votre prénom",
                })}
              ></Form.Control>
            </Col>
            <Col>
              <FloatingLabel>nom</FloatingLabel>
              {errors.lastName && <p>{errors.lastName.message}</p>}
              <Form.Control
                type="lastName"
                name="lastName"
                {...register("lastName", {
                  required: "Saisissez votre nom",
                })}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>

        <Button type="submit" size="lg">
          Créer ! 
        </Button>

        {error && <p>Une erreur est survenue, contactez un administrateur</p>}
      </Form>
    </Container>
  );
}

export default SignIn;
