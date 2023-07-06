import { ShopLayout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";

const Women = () => {

  const { products, isLoading } = useProducts('/products?gender=women')

  return (
    <ShopLayout title={'Teslo-Shop - Mujeres'} pageDescription={'Teslo Shop Kids Page'}>
      <Typography variant="h1" component='h1'>Mujeres</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Todos los productos para mujeres</Typography>

      {
        isLoading 
          ? <FullScreenLoading/>
          : <ProductList products={products}></ProductList>
      }

    </ShopLayout>
  )
}

export default Women;
