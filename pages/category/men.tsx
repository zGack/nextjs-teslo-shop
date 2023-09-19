
import { ShopLayout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";

const Men = () => {

  const { products, isLoading } = useProducts('/products?gender=men')

  return (
    <ShopLayout title={'Teslo-Shop - Home Kids'} pageDescription={'Teslo Shop Kids Page'}>
      <Typography variant="h1" component='h1'>Hombres</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Todos los productos para hombres</Typography>

      {
        isLoading 
          ? <FullScreenLoading/>
          : <ProductList products={products}></ProductList>
      }

    </ShopLayout>
  )
}

export default Men;
