import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AppState } from './store'
import { DBDataModel, DBQueryData } from '../data/models'
import apiService from '../network/apiService'


export interface QueryDataModelState {
  queryData: DBQueryData | undefined
  dataModel: DBDataModel | undefined
  isFetchingData: boolean
  isFetchingModel: boolean
}

const initialState: QueryDataModelState = {
  queryData: undefined,
  dataModel: undefined,
  isFetchingData: false,
  isFetchingModel: false
}

export const getDBDataInDataModel = createAsyncThunk(
  'dataModel/getDBDataInDataModel',
  async (payload: any, { rejectWithValue }: any) => {
    const { dbConnectionId, schemaName, name, queryLimit, queryOffset, fetchCount, queryFilter, querySort } = payload
    const result = await apiService.getDBDataInDataModel(dbConnectionId, schemaName, name, queryLimit, queryOffset, fetchCount, queryFilter, querySort)
    if (result.success) {
      return {
        data: result.data
      }
    } else {
      return rejectWithValue(result.error)
    }
  },
  {
    condition: (_, { getState }: any) => {
      const { isFetchingData } = getState()['dataModel'] as QueryDataModelState
      if (isFetchingData) {
        return false
      }
      return true
    }
  }
)

export const getSingleDataModel = createAsyncThunk(
  'dataModel/getSingleDataModel',
  async (payload: any, { rejectWithValue }: any) => {
    const { dbConnectionId, schemaName, name } = payload
    const result = await apiService.getDBSingleDataModelByConnectionId(dbConnectionId, schemaName, name)
    if (result.success) {
      return {
        data: result.data
      }
    } else {
      return rejectWithValue(result.error)
    }
  }
)

export const addDBData = createAsyncThunk(
  'dataModel/addDBData',
  async (payload: any, { }: any) => {
    const { dbConnectionId, schemaName, name, data } = payload
    const result = await apiService.addDBData(dbConnectionId, schemaName, name, data)
    return result
  }
)

export const updateDBSingleData = createAsyncThunk(
  'dataModel/updateDBSingleData',
  async (payload: any, { getState, rejectWithValue }: any) => {
    const { dbConnectionId, schemaName, name, id, columnName, newValue } = payload
    const result = await apiService.updateDBSingleData(dbConnectionId, schemaName, name, id, columnName, newValue)
    return result
  }
)


export const deleteDBData = createAsyncThunk(
  'dataModel/deleteDBData',
  async (payload: any, { }: any) => {
    const { dbConnectionId, schemaName, name, selectedIDs } = payload
    const result = await apiService.deleteDBData(dbConnectionId, schemaName, name, selectedIDs)
    return result
  }
)


export const addDBDataModelField = createAsyncThunk(
  'dataModel/addDBDataModelField',
  async (payload: any, { }: any) => {
    const { dbConnectionId, schemaName, name, fieldName, dataType } = payload
    const result = await apiService.addDBSingleDataModelField(dbConnectionId, schemaName, name, fieldName, dataType)
    return result
  }
)

export const deleteDBDataModelField = createAsyncThunk(
  'dataModel/deleteDBDataModelField',
  async (payload: any, { }: any) => {
    const { dbConnectionId, schemaName, name, fieldName } = payload
    const result = await apiService.deleteDBSingleDataModelField(dbConnectionId, schemaName, name, fieldName)
    return result
  }
)

export const addDBDataModelIndex = createAsyncThunk(
  'dataModel/addDBDataModelIndex',
  async (payload: any, { }: any) => {
    const { dbConnectionId, schemaName, name, indexName, fieldNames, isUnique } = payload
    const result = await apiService.addDBSingleDataModelIndex(dbConnectionId, schemaName, name, indexName, fieldNames, isUnique)
    return result
  }
)

export const deleteDBDataModelIndex = createAsyncThunk(
  'dataModel/deleteDBDataModelIndex',
  async (payload: any, { }: any) => {
    const { dbConnectionId, schemaName, name, indexName } = payload
    const result = await apiService.deleteDBSingleDataModelIndex(dbConnectionId, schemaName, name, indexName)
    return result
  }
)

export const dataModelSlice = createSlice({
  name: 'dataModel',
  initialState,
  reducers: {
    reset: () => initialState,
    setQueryData: (state, { payload }: { payload: DBQueryData | undefined }) => {
      state.queryData = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDBDataInDataModel.pending, (state) => {
        state.isFetchingData = true
      })
      .addCase(getDBDataInDataModel.fulfilled, (state, action: any) => {
        state.isFetchingData = false
        state.queryData = action.payload.data
      })
      .addCase(getSingleDataModel.pending, (state) => {
        state.isFetchingModel = true
      })
      .addCase(getSingleDataModel.fulfilled, (state, action: any) => {
        state.isFetchingModel = false
        state.dataModel = action.payload.data
      })
  },
})

export const { reset, setQueryData } = dataModelSlice.actions

export const selectQueryData = (state: AppState) => state.dataModel.queryData

export const selectIsFetchingQueryData = (state: AppState) => state.dataModel.isFetchingData

export const selectSingleDataModel = (state: AppState) => state.dataModel.dataModel

export default dataModelSlice.reducer