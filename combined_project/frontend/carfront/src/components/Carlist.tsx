import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid"; // 데이터를 그리드 모양으로 나타내줌, 그리드의 컬럼명 지정
import { Snackbar } from '@mui/material';
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function Carlist() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars
  });

  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({queryKey: ['cars']});
    }, onError: (err) => {
          console.log(err);
        },
  });

  const columns : GridColDef[] = [
    {field: 'brand', headerName: "Brand", width: 200},
    {field: 'model', headerName: "Model", width: 200},
    {field: 'color', headerName: "Color", width: 200},
    {field: 'registrationNumber', headerName: "Reg.nr", width: 150},
    {field: 'modelYear', headerName: "Model Year", width: 150},
    {field: 'price', headerName: "Price", width: 150},
    {
      field: 'edit',
      headerName: '',
      width: 90,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <EditCar cardata={params.row} />
    },
    {
      field: 'delete',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <button onClick={() => {
          if(window.confirm(`${params.row.brand}의 ${params.row.model}을 삭제하시겠습니까?`)) {
            mutate(params.row._links.car.href)
          }
        }}>삭제❌</button>
    }
  ]


  if(!isSuccess) {
    return <span>Loading...</span>
  }
  else if(error) {
    return <span>⚠️자동차 데이터 가져오기 중 오류 발생⚠️</span>
  }
  else {
    return (
      <>
      <AddCar/>
    
      <DataGrid 
        rows={data}
        columns={columns}
        getRowId={row => row._links.self.href}
        // dispableRowSelectionOnClick={true}
      />

      <Snackbar 
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="자동차가 삭제되었습니다."
      />
      </>

    );
  }
}

export default Carlist;