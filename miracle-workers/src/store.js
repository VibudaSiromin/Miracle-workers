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
  initialRunningConditionForManual:false,
  initialLauncherModalVisibilityState:false,
}

const initialTestPageNameState = {
  testPageName:'King'
}

const renamedPageNameState = {
  renamedPageName:'King'
}

const userState={
  username:"",
  email:"",
  userType:""
}

const initialUserType={
  userType:"User"
}

export const setTestPageName = (testPageName) => {
  return{
    type: 'SET_TEST_PAGE_NAME',
    payload: testPageName,
  } 
}

export const setRenamedPageName = (renamedPageName) => {
  return{
    type: 'RENAME_PAGE_NAME',
    payload: renamedPageName
  }
}

const nameAssignerState = {
  initiateNameAssigner:false
}

const initialTestSuiteValidation={
    "group":false,
    "instruction":false,
    "command":false,
    "locator":false,
    "locatorParameter":false,
    "data":false,
    "swapResult":false,
    "branchSelection":false,
    "action":false,
    "comment":false
}
const renameState = {
  initiateRenameModal:false// modal used to rename the pagenames
}

const userTypeReducer=(state=initialUserType,action)=>{
  switch(action.type){
    case "SET_ADMIN":{
      return {
        ...state,
        userType:"Admin"
      }
    }
    default:
      return state;
  }
}


const userReducer=(state = userState, action)=>{
  switch(action.type){
    case "GET_USER_DETAILS":return{
      username:action.payload.username,
      email:action.payload.email,
      userType:action.payload.userType
    }
    default:
      return state; 
  }
}

const testSuiteValidator=(state=initialTestSuiteValidation,action)=>{
  switch(action.type){
    case "GROUP_VALID":return{
      ...state,
      "group":true
    }
    case "GROUP_INVALID":return{
      ...state,
      "group":false
    }
    default:
      return state;  
  }
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
        initialRunningConditionForManual:true,
        
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
        initialRunningConditionForJson:true,
        initialLauncherModalVisibilityState: !state.initialLauncherModalVisibilityState
      };
    case "FUNCTION_CALLED_MANUAL":
      return {
        ...state,
        functionCalledManual: !state.functionCalledManual,
        initialRunningConditionForManual:true,
        initialLauncherModalVisibilityState: !state.initialLauncherModalVisibilityState
      };
    default:
      return state;
  }
}

const getRenamedPageNameReducer = (state = renamedPageNameState, action) => {
  switch (action.type) {
    case "RENAME_PAGE_NAME":
      return {
        ...state,
        renamedPageName:action.payload,
      };
    default:
      return state;
  }
}

const getTestSheetNameReducer = (state = initialTestPageNameState, action) => {
  switch (action.type) {
    case "SET_TEST_PAGE_NAME":
      return {
        ...state,
        testPageName:action.payload,
      };
    default:
      return state;
  }
}

const nameAssignerReducer = (state = nameAssignerState, action) => {
  switch(action.type){
    case "INITIATE_NAME_ASSIGNER":
      return{
        ...state,
        initiateNameAssigner:!state.initiateNameAssigner
      };
      default:
        return state;
  }
}

const renameModalReducer = (state = renameState, action) => {
  switch(action.type){
    case "INITIATE_RENAME_MODAL":
      return{
        ...state,
        initiateRenameModal:!state.initiateRenameModal
      };
      default:
        return state;
  }
}

const rootReducer = combineReducers({
    changeState:changeStateReducer,
    addDataSheetName:addDataSheetNameReducer,
    addTestSheetName:addTestSheetNameReducer,
    getTestSheetName:getTestSheetNameReducer,
    getRenamedPageName:getRenamedPageNameReducer,
    nameAssigner:nameAssignerReducer,
    renameModal:renameModalReducer,
    userDetails:userReducer,
    userTypeReducer:userTypeReducer
})

const store = createStore(rootReducer)
export default store
