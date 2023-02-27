import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Collapse, IconButton, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskRow from '../componenets/TaskRow'
import { getCommonCodes, getReports, logout } from '../store/tasksSlice'
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import TaskForm from '../componenets/TaskForm'
import { utils, writeFile } from 'xlsx'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


export default function UserDashboard() {

  const dispatch = useDispatch()
  const reports = useSelector((state) => state.storeData.reports)
  const updated = useSelector(state => state.storeData.updated)
  const user = useSelector(state => state.storeData.user)
  useEffect(() => {
    let uid = user?.id
    if (uid) {
      dispatch(getReports(uid))
      dispatch(getCommonCodes())
    }
    return () => {
    }
  }, [user])
  useEffect(() => {
    console.log("updated")
    setOpenAddTask(false)
  }, [updated])

  const [selectedReport, setSelectedReport] = useState(null)
  const [openAddTask, setOpenAddTask] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <div className='d-flex align-items-center justify-content-between mb-2'>
        <h2>User dashboard</h2>
        <Button variant="contained"
          color='error'
          onClick={() => {
            dispatch(logout())
          }}
        >Logout</Button>
      </div>
      <div>
        {reports?.map(each => {

          return <Accordion
            key={each.id}
            style={{
              color: "red",
              backgroundColor: "#ADD8E6"
              //"rgba(144,238,144,0.5)"
            }}
            expanded={each.id == selectedReport?.id}
            onChange={(e) => {
              if (selectedReport?.id == each.id) {
                setSelectedReport(null)
              } else {
                setSelectedReport(each)
              }
              setOpenAddTask(false)
              e.preventDefault()
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0, color: 'text.secondary' }}>Week start</Typography>
              <Typography sx={{}}> {each.week_start}</Typography>
            </AccordionSummary>

            <TableContainer component={Paper} color="red">
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>

                    <StyledTableCell>Task</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Hours</StyledTableCell>
                    <StyledTableCell>Project</StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        style={{ color: 'white' }}
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenAddTask(!openAddTask)}
                      >
                        {openAddTask ? <CancelIcon /> : <AddBoxIcon />}
                      </IconButton>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={selectedReport?.id == each.id && openAddTask} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <TaskForm type={"Add"} reportId={each.id} />
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                  {each?.tasks.map((row, index) => (
                    <TaskRow key={row.id} row={row} index={index} reportId={each.id} />
                  ))}
                  <TableRow>
                    <TableCell>
                      <Button
                        onClick={() => {
                          // array of objects to save in Excel
                          let binary_univers = each?.tasks
                          let binaryWS = utils.json_to_sheet(binary_univers);
                          // Create a new Workbook
                          var wb = utils.book_new()
                          // Name your sheet
                          utils.book_append_sheet(wb, binaryWS, 'Report')
                          // export your excel
                          writeFile(wb, 'Report.xlsx');
                        }}
                        style={{ backgroundColor: "green" }}
                        variant="contained"
                      >{"Download"}</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Accordion>
        })
        }
      </div>
    </div>

  )
}
