import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import postApi from "../utils/postApi";
import { Button, Form, FloatingLabel, Card, Alert } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import Unauthorized from "./Unauthorized";

export default function MusicianForm() {
  const [input, setInput] = useState(false);
  const { admin } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values, e) => {
    setInput(true);
    e.preventDefault();
    postApi("musicians/", values);
    e.target.reset();
  };
  return admin ? (
    <>
      <Alert show={input} variant="success">
        <Alert.Heading>Succès!</Alert.Heading>
        <p>Le musicien a bien été enregistré !</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setInput(false)} variant="outline-success">
            Fermer
          </Button>
        </div>
      </Alert>
      <Card>
        <Card.Header className="text-center">Ajouter un musicien</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2">
              <FloatingLabel>
                Prénom
                <br />
                <Form.Control
                  type="text"
                  name="firstName"
                  {...register("firstName", {
                    required: "Prénom de musicien requis",
                  })}
                />
              </FloatingLabel>
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </Form.Group>
            <Form.Group className="mb-2">
              <FloatingLabel>
                Nom
                <br />
                <Form.Control
                  type="text"
                  name="lastName"
                  {...register("lastName", {
                    required: "Nom de musicien requis",
                  })}
                />
              </FloatingLabel>
              {errors.lastName && <p>{errors.lastName.message}</p>}
            </Form.Group>
            <Form.Group className="mb-2">
              <FloatingLabel>
                Instrument
                <br />
                <Form.Control
                  type="text"
                  name="instrument"
                  {...register("instrument", { required: "instrument requis" })}
                />
              </FloatingLabel>
              {errors.instrument && <p>{errors.instrument.message}</p>}
            </Form.Group>
            {!input ? (
              <Button type="submit" size="lg" className="">
                ajouter
              </Button>
            ) : (
              <Button size="lg" disabled>
                ajouter
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </>
  ) : (
    <Unauthorized />
  );
}
