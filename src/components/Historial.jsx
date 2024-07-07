import { useEffect, useState } from "react";
import Header from "./Header";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../bd/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from '@mui/material/Avatar';
import SaveAltTwoToneIcon from '@mui/icons-material/SaveAltTwoTone';


export default function Historial() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "base64Firestore");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "¿Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    try {
      const userDoc = doc(db, "base64Firestore", id);
      await deleteDoc(userDoc);
      Swal.fire("Eliminado", "El archivo ha sido eliminado.", "success");
      getUsers();
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
    
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getUsers();
    }
  };

  const downloadFile = (id, name) => {
    try {
      console.log(id)
    const info = document.getElementById(id).textContent
     // Insert a link that allows the user to download the PDF file
    let link = document.createElement('a');
    link.innerHTML = 'Download PDF file';
    link.download =  name;
    link.href = 'data:application/octet-stream;base64,' + info;
    //document.body.appendChild(link);
    link.click();
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      title: "Archivo descargado",
      showConfirmButton: false,
      timer: 1500
    });

    } catch (error) {
      Swal.fire({
        title: 'Error en descargar',
        text: error,
        icon: "error"
      });
    }
    };

  return (
    <>
    <Header></Header>
      {rows.length > 0 && (
        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
          <Typography
            
            component="div"
            sx={{ padding: "10px" }}
          >
           
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Buscar Archivos" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
          {/*  <Button variant="contained" endIcon={<AddCircleIcon />}>
              Add
            </Button>
              */}
          </Stack>
          <Box height={10} />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    PDF Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Descripcion
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Creado
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Descargar
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    let date1 = row.createdAt.toDate()
                    let formattedDate = date1.toLocaleString()
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                      
                        <TableCell align="left" id={row.name}>{row.name}</TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="left">{formattedDate}</TableCell>
                        <TableCell align="left">
                        <Avatar sx={{ m: 1, bgcolor: 'error.main' }}
                         onClick={() => {
                          downloadFile(row.id, row.name);
                          console.log(row.id)
                         }}
                          >
                            <SaveAltTwoToneIcon />
                          </Avatar>
                          <p style={{display: 'none'}} id={row.id}> {row.pdf}</p>
                          {/*row.pdf */}
                          </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                          { /*  <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              // onClick={() => editUser(row.id)}
                            />
                            */}
                            <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "white",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                                console.log(row.id)
                              }}
                            />
                             </Avatar>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}
