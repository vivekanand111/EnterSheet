import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../config/api"
import setAuthToken from "../utils/setAuthToken";

export const loadUser = createAsyncThunk('user/authenticate', async () => {
   const res = await apiClient.get("/user/authenticate")
   //console.log(res.data)
   return res.data;
})

export const getReports = createAsyncThunk('user/getReports', async (userId) => {
   const res = await apiClient.get("/user/" + userId + "/reports")
   //console.log(res.data)
   return res.data;
})

export const getCommonCodes = createAsyncThunk('/commonCodes/getProjectsWithModules', async () => {
   const res = await apiClient.get("/commonCodes/getProjectsWithModules")
   //console.log(res.data)
   return res.data;
})

export const addTask = createAsyncThunk('/task/addTask', async (task) => {
   const res = await apiClient.post("/task/" + task.reportId + "/addTaskToReport", task.obj)
   //console.log(res.data)
   return { data: res.data, reportId: task.reportId };
})

export const updateTask = createAsyncThunk('/task/updateTask', async (task) => {
   const res = await apiClient.put("/task/updateTask", task.obj)
   console.log(res.data)
   return { data: res.data, reportId: task.reportId };
})

export const deleteTask = createAsyncThunk('/task/deleteTask', async (task) => {
   const res = await apiClient.delete("/task/" + task.obj.id + "/deleteTask")
   console.log(res.data)
   return { data: task.obj, res: res.data, reportId: task.reportId };
})

const initialState = {
   dataLoaded: false,
   updated: false,
   auth: null,
   user: null
}
export const tasksSlice = createSlice({
   name: 'reports',
   initialState: initialState,
   reducers: {
      setCurrentReport(state, action) {
         state.currentReport = action.payload
      },
      setAuth(state, action) {
         state.auth = action.payload
         setAuthToken(action.payload.token)
      },
      logout: () => initialState,

   },
   extraReducers: (builder) => {
      builder
         .addCase(loadUser.fulfilled, (state, action) => {
            state.user = action.payload
         })
         .addCase(getReports.pending, (state, action) => {
            state.loading = true
         })
         .addCase(getReports.fulfilled, (state, action) => {
            state.loading = false
            state.reports = action.payload
            state.dataLoaded = true
         })
         .addCase(getReports.rejected, (state, action) => {
            state.loading = false
         })
         .addCase(getCommonCodes.fulfilled, (state, action) => {
            state.commonCodes = action.payload
         })
         .addCase(addTask.fulfilled, (state, action) => {
            let rindex = state.reports.findIndex(i => i.id == action.payload.reportId)
            state.reports[rindex].tasks.push(action.payload.data)
            state.updated = !state.updated
         })
         .addCase(updateTask.fulfilled, (state, action) => {
            let rindex = state.reports.findIndex(i => i.id == action.payload.reportId)
            let taskIndex = state.reports[rindex].tasks.findIndex(i => i.id == action.payload.data.id)
            state.reports[rindex].tasks[taskIndex] = action.payload.data
            state.updated = !state.updated
         })
         .addCase(deleteTask.fulfilled, (state, action) => {
            alert(action.payload.res)
            let rindex = state.reports.findIndex(i => i.id == action.payload.reportId)
            const taskId = parseInt(action.payload.data.id)
            let j = state.reports[rindex].tasks.findIndex(i => i.id === parseInt(taskId))
            state.reports[rindex].tasks.splice(j, 1)
            state.updated = !state.updated
         })

   }
})

export const tasksReducer = tasksSlice.reducer
export const { setAuth, logout } = tasksSlice.actions