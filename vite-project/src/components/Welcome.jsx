import React from "react";
import { Container, Typography } from "@mui/material";

function Welcome() {
  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center">
        Welcome to the Platform!
      </Typography>
      <Typography variant="body1" align="center">
        Your account has been verified.
      </Typography>
    </Container>
  );
}

export default Welcome;
