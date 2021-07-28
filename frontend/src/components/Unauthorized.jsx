import React from 'react';
import { Card,Alert } from 'react-bootstrap';

function Unauthorized(props) {
  return (
    <Card>
      <Alert variant="danger">Vous n'êtes pas autorisé à visionner cette page</Alert>
    </Card>
  );
}

export default Unauthorized;