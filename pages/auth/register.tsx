import { useContext, useState } from 'react';
import NextLink from 'next/link'
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'

import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils';
import { tesloApi } from '@/api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '@/context/auth';

type FormData = {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {

  const router = useRouter();
  const { registerUser } = useContext( AuthContext );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterForm = async ({ name, email, password }: FormData ) => {
    
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if ( hasError ) {
      setShowError(true);
      setErrorMessage( message! );
      return;
    }

    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
  }

  return (
    <AuthLayout title='Ingresar'>
      <form onSubmit={ handleSubmit(onRegisterForm) } noValidate >
        <Box sx={{width: 350, padding: '10px 20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Crear Cuenta</Typography>
              <Chip
                  label={errorMessage} 
                  color='error'
                  icon={ <ErrorOutline /> }
                  className='fadeIn'
                  sx={{ display: showError ? 'flex' : 'none' }}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Full name' 
                type='text' 
                variant='filled' 
                fullWidth
                {...register('name', {
                  required: 'Debe ingresar su nombre',
                  minLength: { value: 2, message: 'El nombre de tener minimo 2 caracteres' }
                })}
                error={ !!errors.name }
                helperText={ errors.name?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Email' 
                type='email' 
                variant='filled' 
                fullWidth
                { ...register('email', {
                  required: 'El email es obligatorio',
                  validate: validations.isEmail
                })}
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Password' 
                type='password' 
                variant='filled' 
                fullWidth
                { ...register('password', {
                  required: 'Debe ingresar la contrasena',
                  minLength: { value: 6, message: 'Minimo 6 caracteres' }
                })}
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <Button color='secondary' className='circular-btn' size='large' fullWidth type='submit'>
                Registrarse
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href={ router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'} legacyBehavior passHref>
                <Link underline='always'>
                  Already have an account?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage