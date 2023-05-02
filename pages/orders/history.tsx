import NextLink from 'next/link'
import { ShopLayout } from "@/components/layouts"
import { Chip, Grid, Link, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridValueGetterParams } from "@mui/x-data-grid"

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100},
  { field: 'fullname', headerName: 'Nombre Completo', width: 300},
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muesta informacion si esta pagada o no',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return (
        params.row.paid
          ? <Chip color="success" label='Pagada' variant="outlined" />
          : <Chip color="error" label='No pagada' variant="outlined" />
      )
    }
  },
  {
    field: 'order',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} legacyBehavior>
          <Link underline='always'>
            Ver orden
          </Link>
        </NextLink>
      ) 
    },
  }
]

const rows: GridRowsProp = [
  { id: 1, paid: true, fullname: 'Sebastian Mena' },
  { id: 2, paid: true, fullname: 'Valentina Lozada' },
  { id: 3, paid: false, fullname: 'Luis Miguel Mena' },
  { id: 4, paid: true, fullname: 'Ana Victoria Mena' },
  { id: 5, paid: false, fullname: 'Ana Catalina Mena' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes del cliente'>
      <Typography variant="h1" component='h1'>Historial de ordenes</Typography>

      <Grid container>
        <Grid item xs={12} sx={{height: 650, width: '100%'}}>
          <DataGrid 
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 }
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage