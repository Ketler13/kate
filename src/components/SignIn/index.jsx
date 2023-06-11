import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from "react-i18next";

import { signIn, useAuthState, useAuthDispatch } from '../Auth';

export default function SignIn() {
  const { t } = useTranslation();
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email:  data.get('email'),
      password: data.get('password'),
    };
    
    signIn(credentials, authDispatch);
  };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {t('titles.signIn')}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('commonInputs.email')}
              name="email"
              autoComplete="email"
              autoFocus
              error={!!authState.error}
              helperText={authState.error ? authState.error.message : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('commonInputs.password')}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={authState.status === 'pending'}
            >
              {t('actions.signIn')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {t('signIn.signUpLink')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}