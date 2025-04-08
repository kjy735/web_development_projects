import { CarResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getCars } from "../api/carapi";
import { DataGrid, GridColDef } from "@mui/x-data-grid"; // 데이터를 그리드 모양으로 나타내줌, 그리드의 컬럼명 지정

function Carlist() {

  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars
  });

  const columns : GridColDef[] = [
    {field: 'brand', headerName: "Brand", width: 200},
    {field: 'model', headerName: "Model", width: 200},
    {field: 'color', headerName: "Color", width: 200},
    {field: 'registrationNumber', headerName: "Reg.nr", width: 150},
    {field: 'modelYear', headerName: "Model Year", width: 150},
    {field: 'price', headerName: "Price", width: 150},
  ]


  if(!isSuccess) {
    return <span>Loading...</span>
  }
  else if(error) {
    return <span>⚠️자동차 데이터 가져오기 중 오류 발생⚠️</span>
  }
  else {
    return (
    <DataGrid 
      rows={data}
      columns={columns}
      getRowId={row => row._links.self.href}
      />
    );
  }
}

export default Carlist;