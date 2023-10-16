import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { initialData } from '../../database/seed-data';
import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { ICartProduct } from '@/interfaces';
import { CartContext } from '@/context/cart';

interface Props {
  editable?: boolean;
  cart: ICartProduct[]
}

export const CartList: FC<Props> = ({ editable = false }) => {

  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity( product );
  }

  const onRemoveCartProduct = ( product: ICartProduct ) => removeCartProduct(product);

  return (
    <>
      {
        cart.map( product => ( 
          <Grid container key={product.slug + product.size } spacing={2} sx={{mb:1}} >
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} legacyBehavior>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.images}`}
                      component='img'
                      sx={{borderRadius:'5px'}}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid> 
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'>Talla: <strong>{ product.size }</strong></Typography>

                {/* Condicional */}
                {
                  editable
                  ? (
                    <ItemCounter 
                      currentValue={product.quantity} 
                      maxValue={ 10 } 
                      updatedQuantity={( value ) => {onNewCartQuantityValue(product, value)}}
                    />
                  )
                  : (
                    <Typography variant='h5'>{product.quantity} { product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                  )
                }
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
              {/* Editable */}
              {
                editable && (
                <Button variant='text' color='secondary' onClick={() => {onRemoveCartProduct(product)}}>
                  Remover
                </Button>
                )
              }
            </Grid>
          </Grid>
        ))
      }
    </>
  )
}
