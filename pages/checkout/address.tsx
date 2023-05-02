
import { ShopLayout } from '@/components/layouts'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const AddressPage = () => {
  return (
    <ShopLayout title='Direccion' pageDescription='Confirmar direccion de envio'>
      <Typography variant='h1' component='h1' sx={{mb:2}}>Direccion</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label='Nombre' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Apellido' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Direccion' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Direccion 2' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Codigo postal' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Ciudad' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              variant='filled'
              label='Pais'
              value={1}
            >
              <MenuItem value={1}>Colombia</MenuItem>
              <MenuItem value={2}>Mexico</MenuItem>
              <MenuItem value={3}>Canada</MenuItem>
              <MenuItem value={4}>Ecuador</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Telefono' variant='filled' fullWidth />
        </Grid>
      </Grid>
      <Box sx={{mt: 5}} display='flex' justifyContent='center'>
        <Button color='secondary' className='circular-btn' size='large'>
          Revisar pedido
        </Button>
      </Box>
    </ShopLayout>
  )
}

export default AddressPage