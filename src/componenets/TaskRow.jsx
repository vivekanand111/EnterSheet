import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Collapse, IconButton, styled, Table, TableCell, tableCellClasses, TableHead, TableRow, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskForm from "./TaskForm";

export default function TaskRow(props) {
   const { row } = props;
   const [open, setOpen] = useState(false);
   const updated = useSelector(state => state.storeData.updated)
   useEffect(() => {
      setOpen(false)
   }, [updated])

   return (
      <>
         <TableRow style={{ backgroundColor: props?.index % 2 ? "whitesmoke" : "white" }} sx={{ '& > *': { borderBottom: 'unset' } }}>

            <TableCell >{row.name}</TableCell>
            <TableCell >{moment(row.date).format('DD-MM-YYYY')}</TableCell>
            <TableCell >{row?.hours}</TableCell>
            <TableCell >{row.project}</TableCell>
            <TableCell>
               <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => {
                     setOpen(!open)
                     //props?.closeOthers()
                  }}
               >
                  {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
               </IconButton>
            </TableCell>
         </TableRow>

         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                     <TaskForm type={"Edit"} task={row} reportId={props?.reportId} />
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>

      </>
   );
}