import { Button } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { utils, writeFile } from 'xlsx';
import apiClient from '../config/api';
import { logout } from '../store/tasksSlice';

export default function AdminDashboard() {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {

    })()
  }, [])
  const dispatch = useDispatch()

  const [formValues, setformValues] = useState({
    startDate: '', endDate: ''
  })
  const [errors, setformErrors] = useState({
    startDate: '', endDate: ''
  })

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button
          onClick={() => {

            if (rows.length > 0) {
              // Create a new Workbook
              var wb = utils.book_new()
              const grouped = _.groupBy(rows, row => row.username);
              for (const [key, value] of Object.entries(grouped)) {
                let binaryWS = utils.json_to_sheet(value,
                  { header: ['index', 'project', 'username', 'name', 'date', 'hours', 'notes'], })
                utils.sheet_add_aoa(binaryWS, [['Index', 'Project', 'Username', 'Task', 'Date', 'Hours', 'Notes']]);
                utils.book_append_sheet(wb, binaryWS, key)
              }
              // export your excel
              writeFile(wb, 'FullReport.xlsx');
            }

          }}
          variant="text">Export xlsx</Button>
      </GridToolbarContainer>
    );
  }

  const handleChageValue = (val, name) => {
    setformValues({ ...formValues, [name]: val })
  }

  const validateForm = values => {
    const errors = {};
    if (!values.startDate) {
      errors.startDate = 'Start Date is required';
    }
    if (!values.endDate) {
      errors.endDate = 'End Date is required';
    }
    return errors;
  }

  return (
    <div>
      <div className='p-3'>
        <div className='d-flex align-items-center justify-content-between mb-2'>
          <h2>AdminDashboard</h2>
          <Button variant="contained"
            color='error'
            onClick={() => {
              dispatch(logout())
            }}
          >Logout</Button>
        </div>
        <div className='row align-items-center p-3'>
          <div className="form-group col">
            <label >Start Date</label>
            <input
              name='startDate' type='date'
              value={formValues.startDate} onChange={(e) => handleChageValue(e.target.value, e.target.name)}
              className={(errors.startDate) ? 'form-control is-invalid' : 'form-control'}
            />
            {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
          </div>

          <div className="col">
            <label>End Date</label>
            <input
              name='endDate' type='date'
              value={formValues.endDate} onChange={(e) => handleChageValue(e.target.value, e.target.name)}
              className={(errors.endDate) ? 'form-control is-invalid' : 'form-control'}
            />
            {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
          </div>

          <div className="form-group col">
            <Button
              onClick={() => {
                let errors = validateForm(formValues)
                setformErrors(errors)
                if (Object.keys(errors).length == 0) {
                  let req = {
                    "startDate": formValues.startDate,
                    "endDate": formValues.endDate
                  }
                  apiClient.post("/user/getTasksBetweenDates", req)
                    .then(res => {
                      let indexed = res.data.map((item, index) => Object.assign(item, { index: index + 1 }))
                      setRows(indexed)
                    }).catch(e => {
                      console.log(e)
                      alert("Failed to getTask")
                    })
                }
              }}
              variant="outlined">Go</Button>
          </div>
        </div>

        <div style={{ height: 500, marginTop: 10 }}>
          <DataGrid
            rows={rows}
            columns={[
              { field: "index", headerName: "Index" },
              { field: "project", headerName: "Project", },
              { field: "username", headerName: "User", },
              { field: "name", headerName: "Task", },
              { field: "date", headerName: "Date", },
              { field: "hours", headerName: "Hours", },
              { field: "notes", headerName: "Notes", }
            ]}
            getRowId={(row) => row.index}

            disableSelectionOnClick
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
      </div>
    </div>
  )
}
