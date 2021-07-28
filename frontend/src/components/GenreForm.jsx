import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import postApi from "../utils/postApi";
import { Button, Form, FloatingLabel, Card, Alert } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import Unauthorized from "./Unauthorized";

export default function GenreForm() {
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
    postApi("genres/", values);
    e.target.reset();
  };
  return admin ? (
    <>
      <Alert show={input} variant="success">
        <Alert.Heading>Succès!</Alert.Heading>
        <p>Le genre a bien été enregistré !</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setInput(false)} variant="outline-success">
            Fermer
          </Button>
        </div>
      </Alert>
      <Card>
        <Card.Header className="text-center">Ajouter un genre</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2">
              <FloatingLabel>
                Nom
                <br />
                <Form.Control
                  type="text"
                  name="name"
                  {...register("name", { required: "Nom de genre requis" })}
                />
              </FloatingLabel>
              {errors.name && <p>{errors.name.message}</p>}
            </Form.Group>
            <Form.Group className="mb-2">
              <FloatingLabel>
                Description <br />
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  {...register("description", {
                    required: "Description requise",
                  })}
                />
              </FloatingLabel>
              {errors.description && <p>{errors.description.message}</p>}
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
