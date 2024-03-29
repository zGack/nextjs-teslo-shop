import { CartContext } from "@/context/cart"
import { currency } from "@/utils";
import { Grid, Typography } from "@mui/material"
import { useContext } from "react"

export const OrderSummary = () => {

  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);
  

  return (
    <Grid container>
      <Grid item xs={6} >
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{numberOfItems} { numberOfItems > 1 ? 'producto' : 'productos'}</Typography>
      </Grid>
      <Grid item xs={6} >
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>
      <Grid item xs={6} >
        <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100})%</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(tax)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{mt:2}}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{mt:2}} display='flex' justifyContent='end'>
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  )
}
