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

const rootReducer = combineReducers({
    changeState:changeStateReducer,
    addDataSheetName:addDataSheetNameReducer
})

const store = createStore(rootReducer)
export default store
