import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import fetchApi from "../utils/fetchApi";
import postApi from "../utils/postApi";
import { Button, Form, FloatingLabel, Card, Alert } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import Unauthorized from "./Unauthorized";

export default function AlbumForm() {
  const [bands, setBands] = useState([]);
  const [input, setInput] = useState(false);
  const { admin } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchApi("bands").then((r) => setBands(r));
  }, []);

  const onSubmit = (values, e) => {
    setInput(true);
    e.preventDefault();
    postApi("albums/", values);
    e.target.reset();
  };
  return (
    admin ? 
    <>
      <Alert show={input} variant="success">
        <Alert.Heading>Succès!</Alert.Heading>
        <p>L'album a bien été enregistré !</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setInput(false)} variant="outline-success">
            Fermer
          </Button>
        </div>
      </Alert>
      <Card>
        <Card.Header className="text-center">Ajouter un Album</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2">
              <FloatingLabel>
                Nom
                <br />
                <Form.Control
                  type="text"
                  name="name"
                  {...register("name", { required: "Nom d'album requis" })}
                />
              </FloatingLabel>
              {errors.name && <p>{errors.name.message}</p>}
            </Form.Group>
            <Form.Group className="mb-2">
              <FloatingLabel controlId="floatingSelect" label="groupe">
                <Form.Select
                  name="idBand"
                  {...register("idBand", {
                    required: "Merci de choisir un groupe",
                  })}
                >
                  {bands.map((b) => (
                    <option value={b.id}> {b.name}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            {errors.idBand && <p>{errors.idBand.message}</p>}
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
                Année de sortie
                <br />
                <Form.Control
                  type="text"
                  name="releaseYear"
                  {...register("releaseYear", {
                    required: "date de sortie requise",
                  })}
                />
              </FloatingLabel>
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
