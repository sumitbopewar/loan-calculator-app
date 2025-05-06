import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';


function ErrorPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "80vh", textAlign: "center" }}>
      <Typography
        variant="h4" gutterBottom
      >
        Something went wrong in the application.
      </Typography>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" LinkComponent={Link} to={"/"}>GO HOME</Button>
      </Stack>
    </div>
  )
}

export default ErrorPage