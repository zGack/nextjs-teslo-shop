import { useContext } from 'react'
import NextLink from 'next/link'

import { CartList, OrderSummary } from "@/components/cart"
import { ShopLayout } from "@/components/layouts"
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import { CartContext } from '@/context/cart'
import { countries } from '@/utils'


const SummaryPage = () => {

  const { cart, numberOfItems, shippingAddress } = useContext( CartContext );

  if ( !shippingAddress ) return <></>;

  const { firstName, lasttName, address, address2, city, country, phone, zip } = shippingAddress;

  return (
    <ShopLayout title="Resumen de la orden" pageDescription="resumen de la orden">
      <Typography variant="h1" component="h1">Resumen de la orden</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList cart={cart} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">{`Resumen (${(numberOfItems === 1)? '1 producto': `${numberOfItems} productos`} )`}</Typography>
              <Divider sx={{my: 1}} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Direccion de entrega</Typography>
                <NextLink href='/checkout/address' legacyBehavior>
                  <Link underline='always'>
                    Editar
                  </Link>
                </NextLink>
              </Box>  

              <Typography>{firstName} {lasttName}</Typography>
              <Typography>{ address }{ address2 ? `, ${address2}`:'' }</Typography>
              <Typography>{city}, {zip}</Typography>
              <Typography>{countries.find( c => ( c.code === country ))?.name}</Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{my: 1}} />

              <Box display='flex' justifyContent='end' sx={{mb:1}}>
                <NextLink href='/cart' legacyBehavior>
                  <Link underline='always'>
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{mt: 3}}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage