import { combineReducers, createStore } from 'redux'

const initialSideBarState = {
  sidebarShow: true,
}

const initialDataSheetState = {
  myFunctionCalledExcel: false,
  myFunctionCalledManual: false,
  initialRunningConditionForExcel:false,
  initialRunningConditionForManual:false
}

const initialTestSheetState = {
  functionCalledJson: false,
  functionCalledManual: false,
  initialRunningConditionForJson:false,
  initialRunningConditionForManual:false
}

const changeStateReducer = (state = initialSideBarState, { type, ...rest }) => {
  console.log('sirimath');
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const addDataSheetNameReducer = (state = initialDataSheetState, action) => {
  console.log('nila kuru');
  switch (action.type) {
    case "MY_FUNCTION_CALLED_EXCEL":
      return {
        ...state,
        myFunctionCalledExcel: !state.myFunctionCalledExcel,
        initialRunningConditionForExcel:true
      };
    case "MY_FUNCTION_CALLED_MANUAL":
      return {
        ...state,
        myFunctionCalledManual: !state.myFunctionCalledManual,
        initialRunningConditionForManual:true
      };
    default:
      return state;
  }
}

const addTestSheetNameReducer = (state = initialTestSheetState, action) => {
  console.log('nila kuru');
  switch (action.type) {
    case "FUNCTION_CALLED_JSON":
      return {
        ...state,
        functionCalledJson: !state.functionCalledJson,
        initialRunningConditionForJson:true
      };
    case "FUNCTION_CALLED_MANUAL":
      return {
        ...state,
        functionCalledManual: !state.functionCalledManual,
        initialRunningConditionForManual:true
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
    changeState:changeStateReducer,
    addDataSheetName:addDataSheetNameReducer,
    addTestSheetName:addTestSheetNameReducer
})

const store = createStore(rootReducer)
export default store
