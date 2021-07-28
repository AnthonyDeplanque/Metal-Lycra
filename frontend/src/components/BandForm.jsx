import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import postApi from "../utils/postApi";
import { Button, Form, FloatingLabel, Card, Alert } from "react-bootstrap";
import Unauthorized from "./Unauthorized";
import UserContext from "../contexts/UserContext";

export default function BandForm() {
  const [input, setInput] = useState(false);
  const {admin} = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (values, e) => {
    setInput(true);
    e.preventDefault();
    postApi("bands/", values);
    e.target.reset();
  };
  return (
    admin ? <>
      <Alert show={input} variant="success">
        <Alert.Heading>Succès!</Alert.Heading>
        <p>Le groupe a bien été enregistré !</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setInput(false)} variant="outline-success">
            Fermer
          </Button>
        </div>
      </Alert>
      <Card>
        <Card.Header className="text-center">Ajouter un Groupe</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2">
              <FloatingLabel>
                Nom
                <br />
                <Form.Control
                  type="text"
                  name="name"
                  {...register("name", { required: "Nom de groupe requis" })}
                />
              </FloatingLabel>
              {errors.name && <p>{errors.name.message}</p>}
            </Form.Group>
            <Form.Group className="mb-2">
              <FloatingLabel>
                Image URL <br />
                <Form.Control
                  type="text"
                  {...register("image", { required: "choisissez une image" })}
                />
              </FloatingLabel>
              {errors.image && <p>{errors.image.message}</p>}
            </Form.Group>
            <Form.Group className="mb-2">
              <FloatingLabel>
                Année de formation
                <br />
                <Form.Control
                  type="text"
                  name="formationYear"
                  {...register("formationYear", {
                    required: "date de formation requise",
                  })}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-2">
              <FloatingLabel>
                Description <br />
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  {...register("description", { required: "Description requise" })}
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
    :
    <Unauthorized />
  );
}
