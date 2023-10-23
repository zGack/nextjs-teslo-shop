
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Router, useRouter } from 'next/router'
import Cookies from 'js-cookie'

import { Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ShopLayout } from '@/components/layouts'
import { countries } from '@/utils'
import { CartContext } from '@/context/cart'

type FormData = {
  firstName : string;
  lasttName : string;
  address   : string;
  address2? : string;
  zip?      : string;  
  city      : string;
  country   : string;
  phone     : string;
}

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lasttName: Cookies.get('lastName') || '',
    address  : Cookies.get('address') || '',
    address2 : Cookies.get('address2') || '',
    zip      : Cookies.get('zip') || '',
    city     : Cookies.get('city') || '',
    country  : Cookies.get('country') || '',
    phone    : Cookies.get('phone') || '',
  }
}

const AddressPage = () => {

  const router = useRouter();
  const { updateAddress } = useContext( CartContext );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies()
  });

  const onAddressForm = ( data: FormData ) => {
    
    

    updateAddress( data );
    router.push('/checkout/summary');
  }

  return (
    <ShopLayout title='Direccion' pageDescription='Confirmar direccion de envio'>
      <Typography variant='h1' component='h1' sx={{mb:2}}>Direccion</Typography>
      <form onSubmit={handleSubmit(onAddressForm)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Nombre' 
              variant='filled' 
              fullWidth 
              {...register('firstName', {
                required: 'Debe ingresar su nombre',
                minLength: { value: 2, message: 'El nombre de tener minimo 2 caracteres' }
              })}
              error={ !!errors.firstName }
              helperText={ errors.firstName?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Apellido' 
              variant='filled' 
              fullWidth 
              {...register('lasttName', {
                required: 'Debe ingresar su apellido',
              })}
              error={ !!errors.lasttName }
              helperText={ errors.lasttName?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Direccion' 
              variant='filled' 
              fullWidth 
              {...register('address', {
                required: 'Debe ingresar su direccion',
              })}
              error={ !!errors.address }
              helperText={ errors.address?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Direccion 2' 
              variant='filled' 
              fullWidth 
              {...register('address2')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Codigo postal' 
              variant='filled' 
              fullWidth
              {...register('zip')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Ciudad' 
              variant='filled' 
              fullWidth 
              {...register('city', {
                required: 'Debe ingresar su ciudad',
              })}
              error={ !!errors.city }
              helperText={ errors.city?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                key={ Cookies.get('country') || countries[14].code }
                select
                variant='filled'
                label='Pais'
                defaultValue={ Cookies.get('country') || countries[14].code }
                {...register('country', {
                  required: 'Debe ingresar su pais',
                })}
                error={ !!errors.country }
                helperText={ errors.country?.message }
              >
                {
                  countries.map( ({code, name}) => (
                    <MenuItem value={code} key={code} >{name}</MenuItem>
                  ))
                }
                <MenuItem value={3}>Canada</MenuItem>
                <MenuItem value={4}>Ecuador</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Telefono' 
              variant='filled' 
              fullWidth 
              {...register('phone', {
                required: 'Debe ingresar su telefono',
              })}
              error={ !!errors.phone }
              helperText={ errors.phone?.message }
            />
          </Grid>
        </Grid>
        <Box sx={{mt: 5}} display='flex' justifyContent='center'>
          <Button color='secondary' className='circular-btn' size='large' type='submit'>
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//   const { token = '' } = req.cookies;
//   let isValidToken = false;
  
//   try {
//     await jwt.isValidToken( token );
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if ( !isValidToken ) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {
      
//     }
//   }
// }

export default AddressPage