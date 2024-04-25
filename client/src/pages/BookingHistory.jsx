import React, { useState, useEffect } from 'react'
import UserSidebar from '../components/common/UserSidebar';
import { Typography } from '@mui/material';
import uiConfigs from '../configs/ui.config';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import customerApi from "../api/modules/customer.api";
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
     [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#fff",
          color: 'primary.main',
     },
     [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
     },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
     '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
     },
     // hide last border
     '&:last-child td, &:last-child th': {
          border: 0,
     },
}));

function createData(name, calories, fat, carbs, protein) {
     return { name, calories, fat, carbs, protein };
}
const rows = [
     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
     createData('Eclair', 262, 16.0, 24, 6.0),
     createData('Cupcake', 305, 3.7, 67, 4.3),
     createData('Gingerbread', 356, 16.0, 49, 3.9),
];



const BookingHistoryPage = () => {
     const [bookings, setBookings] = useState([]);
     const { user } = useSelector(state => state.user);

     useEffect(() => {
          const getBookings = async () => {
               const { response, err } = await customerApi.getBookings(user.id);
               if (response) {
                    setBookings(response);
               }
          }
          getBookings();
     }, []);



     return (
          <UserSidebar>
               <Typography sx={{
                    ...uiConfigs.style.typoLines(1, 'left'),
                    fontSize: '1rem',
                    color: 'primary.headerColor',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    bgcolor: '#172149',
                    padding: '1rem',
                    borderRadius: '10px',
                    border: '2px solid rgba(255,255,255,0.1)',
                    textTransform: 'capitalize',
               }}>Lịch sử đặt lịch </Typography>

               <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }} aria-label="customized table">
                         <TableHead>
                              <TableRow>
                                   <StyledTableCell align='center'>Thợ Chụp Ảnh</StyledTableCell>
                                   <StyledTableCell align="left">Địa Điểm</StyledTableCell>
                                   <StyledTableCell align="left">Thời gian</StyledTableCell>
                                   <StyledTableCell align="left">Combo</StyledTableCell>
                                   <StyledTableCell align="left">Trạng Thái</StyledTableCell>
                                   <StyledTableCell align="left">Tổng Tiền</StyledTableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {bookings.map((row) => (
                                   <StyledTableRow key={row.name}>
                                        <StyledTableCell align='left' component="th" scope="row">
                                             <Link to={`/photos/${row.photo}`}
                                                  style={{ ...uiConfigs.style.typoLines(2, "left"), fontSize: '0.9rem' }}>
                                                  {row.photographerName}
                                             </Link>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{row.location}</StyledTableCell>
                                        <StyledTableCell align="left">{moment(row.booking_date).format("dddd, MMMM YYYY HH:MM")}</StyledTableCell>
                                        <StyledTableCell align="left">{row.servicePackageName}</StyledTableCell>
                                        <StyledTableCell
                                             align="left"
                                             style={{
                                                  color: row.status === 'PENDING' ? '#ffdc48' : 'green',
                                                  textTransform: 'uppercase', 
                                                  textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
                                             }}
                                        >
                                             {row.status}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{
                                             row.total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                        }</StyledTableCell>
                                   </StyledTableRow>
                              ))}
                         </TableBody>
                    </Table>
               </TableContainer>



          </UserSidebar >
     )
}

export default BookingHistoryPage
