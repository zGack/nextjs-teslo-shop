import { NextPage, GetServerSideProps } from "next";

import { ShopLayout } from "@/components/layouts";
import { Box, Typography } from "@mui/material";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";
import { dbProducts } from "@/database";
import { IProduct } from "@/interfaces";

interface Props {
  products: IProduct[];
  productsFound: boolean;
  query: string;
}

const Search: NextPage<Props> = ({ products, productsFound, query }) => {
  return (
    <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Teslo Shop Page'}>
      <Typography variant="h1" component='h1'>Buscar Productos</Typography>

      {
        productsFound
          ? <Typography variant="h2" sx={{mb: 1}} textTransform="capitalize">Termino: { query }</Typography>
          : (
            <>
              <Box display='flex'>
                <Typography variant="h2" sx={{mb: 1}}>No se encontraron productos</Typography>
                <Typography variant="h2" sx={{ml: 1}} color="secondary" textTransform="capitalize">{ query }</Typography>
              </Box>
            </>
          )
      }

      <ProductList products={products}></ProductList>

    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  const { query = '' } = params as { query: string};

  if ( query.length === 0 ) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProducts.getProductsByTerm( query );

  const productsFound = products.length > 0;

  // TODO: retornar otros productos
  if ( !productsFound ) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      productsFound,
      query
    }
  }
}

export default Search;
