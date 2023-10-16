import { useState, useContext } from 'react'
import NextLink from 'next/link'

import { useForm } from 'react-hook-form'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

import { AuthContext } from '@/context/auth'
import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils'
import { tesloApi } from '@/api'
import { useRouter } from 'next/router'

type FormData = {
  email: string,
  password: string,
}

const LoginPage = () => {

  const router = useRouter();
  const { loginUser } = useContext( AuthContext );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const onLoginUser = async ( { email, password }: FormData ) => {

    setShowError(false);

    const loginSuccessful = await loginUser( email, password );

    if ( !loginSuccessful ) {
      setShowError(true);
      // setTimeout(() => setShowError(false), 3000);
      return;
    }

    // TODO: navegar a la pantalla en la que se encontraba el usr
    router.replace('/');
  }

  return (
    <AuthLayout title='Ingresar'>
      <form onSubmit={ handleSubmit(onLoginUser) } noValidate >
        <Box sx={{width: 350, padding: '10px 20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Iniciar Sesion</Typography>
              <Chip
                label="No se reconoce el email" 
                color='error'
                icon={ <ErrorOutline /> }
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Correo' 
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
              <Button 
                color='secondary' 
                className='circular-btn' 
                size='large' 
                fullWidth 
                type='submit'
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/register' legacyBehavior passHref>
                <Link underline='always'>
                  Don't have an account?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage