import { Box, Button, Grid, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask, updateTask } from '../store/tasksSlice'


const dateformat = (date) => {
   var d = new Date(date)
   //d.setDate(d.getDate() + 1)
   return d.toISOString().split('T')[0]
}

export default function TaskForm(props) {

   useEffect(() => {
      //console.log(props?.task)
      if (props?.task) {
         setformValues(props.task)
         if (props.task.project) {
            let m = commonCodes.find(i => i.projectName == props.task.project)?.modules
            setmodules(m)
         }
      }
      if (props?.reportId) {
         setreportId(props?.reportId)
      }
      return () => {
      }
   }, [])

   const [formValues, setformValues] = useState({
      name: '', project: '', module: '', date: '', hours: '', notes: ''
   })
   const [errors, setformErrors] = useState({
      name: '', project: '', module: '', date: '', hours: '', notes: ''
   })
   const [reportId, setreportId] = useState(null)

   const commonCodes = useSelector((state) => state.storeData?.commonCodes)
   const [modules, setmodules] = useState([])

   const handleChageValue = (val, name) => {
      setformValues({ ...formValues, [name]: val })
   }

   const validateForm = values => {
      const errors = {};

      if (!values.name) {
         errors.name = 'Task name is required';
      } else if (values.name.length > 30) {
         errors.name = 'Must be 30 characters or less';
      }

      if (!values.project || values.project == '-') {
         errors.project = 'Project is required';
      }

      if (!values.module || values.module == '-') {
         errors.module = 'Module is required';
      }

      if (!values.date) {
         errors.date = 'Date is required';
      }

      if (!values.hours) {
         errors.hours = 'Hours is required';
      }

      return errors;
   }

   const dispatch = useDispatch()

   return (
      <div>
         <p className='blockheading' underlineThickness={1} >
            {props?.type} Task
         </p>
         <form onSubmit={(e) => {
            e.preventDefault()
            let errors = validateForm(formValues)
            setformErrors(errors)
            if (Object.keys(errors).length == 0) {
               let task = { reportId, obj: formValues }
               if (props?.type == "Add") {
                  dispatch(addTask(task))
               } else {
                  dispatch(updateTask(task))
               }
               console.log(formValues)
            }
         }}>

            <div className="form-group">
               <label className='formLabel'>Task</label>
               <input
                  name="name" type="text"
                  value={formValues.name} onChange={(e) => handleChageValue(e.target.value, e.target.name)}
                  className={(errors.name) ? 'form-control is-invalid' : 'form-control'}
               />
               {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className='row'>
               <div className="form-group col">
                  <label className='formLabel' >Project</label>
                  <select
                     name="project" value={formValues.project}
                     onChangeCapture={(e) => {
                        setmodules(commonCodes.find(i => i.projectName == e.target.value).modules)
                        setformValues({ ...formValues, project: e.target.value, module: '-' })
                     }}
                     className={(errors.project) ? 'form-control is-invalid' : 'form-control'}
                  >
                     <option value="-">-</option>
                     {commonCodes.map(i => {
                        return <option value={i.projectName}>{i.projectName}</option>
                     })}
                  </select>
                  {errors.project && <div className="invalid-feedback">{errors.project}</div>}
               </div>

               <div className="form-group col">
                  <label className='formLabel' >Module</label>
                  <select
                     name="module" value={formValues.module}
                     onChangeCapture={(e) => handleChageValue(e.target.value, e.target.name)}
                     className={(errors.module) ? 'form-control is-invalid' : 'form-control'}
                  >
                     <option value="-">-</option>
                     {modules?.map(i => {
                        return <option value={i}>{i}</option>
                     })}
                  </select>
                  {errors.module && <div className="invalid-feedback">{errors.module}</div>}
               </div>
            </div>
            <div className='row'>
               <div className="form-group col">
                  <label className='formLabel' >Date</label>
                  <input
                     name='date' type='date'
                     value={formValues.date} onChange={(e) => handleChageValue(e.target.value, e.target.name)}
                     className={(errors.date) ? 'form-control is-invalid' : 'form-control'}
                  />
                  {errors.date && <div className="invalid-feedback">{errors.date}</div>}
               </div>

               <div className="form-group col">
                  <label className='formLabel' >Hours</label>
                  <input
                     name='hours' type='number'
                     value={formValues.hours} onChange={(e) => handleChageValue(e.target.value, e.target.name)}
                     className={(errors.hours) ? 'form-control is-invalid' : 'form-control'}
                  />
                  {errors.hours && <div className="invalid-feedback">{errors.hours}</div>}
               </div>
            </div>

            <div className="form-group">
               <label className='formLabel' >Notes</label>
               <textarea
                  name='notes'
                  value={formValues.notes} onChange={(e) => handleChageValue(e.target.value, e.target.name)}
                  className={(errors.notes) ? 'form-control is-invalid' : 'form-control'}
               />
               {errors.notes && <div className="invalid-feedback">{errors.notes}</div>}
            </div>

            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
               <Button
                  type='submit'
                  style={{}}
                  variant="contained"
               >{props?.type == "Add" ? "Save" : "Update"}</Button>

               {props?.type == "Edit"
                  &&
                  <Button
                     onClick={() => {
                        let task = { reportId, obj: formValues }
                        dispatch(deleteTask(task))
                     }}
                     style={{ marginLeft: 30, }}
                     variant="contained"
                  >{"Delete"}</Button>
               }
            </div>
         </form>
      </div>
   )
}
