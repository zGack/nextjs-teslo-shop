
import { ShopLayout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";

const Kids = () => {

  const { products, isLoading } = useProducts('/products?gender=kid')

  return (
    <ShopLayout title={'Teslo-Shop - Kids'} pageDescription={'Teslo Shop Kids Page'}>
      <Typography variant="h1" component='h1'>Kids</Typography>
      <Typography variant="h2" sx={{mb: 1}}>Todos los productos para kids</Typography>

      {
        isLoading 
          ? <FullScreenLoading/>
          : <ProductList products={products}></ProductList>
      }

    </ShopLayout>
  )
}

export default Kids;
