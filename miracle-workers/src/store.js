import { combineReducers, createStore } from 'redux';

const initialSideBarState = {
  sidebarShow: true,
};

const initialDataSheetState = {
  myFunctionCalledExcel: false,
  myFunctionCalledManual: false,
  initialRunningConditionForExcel: false,
  initialRunningConditionForManual: false,
};

const initialTestSheetState = {
  functionCalledJson: false,
  functionCalledManual: false,
  initialRunningConditionForJson: false,
  initialRunningConditionForManual: false,
  initialLauncherModalVisibilityState: false,
};

const editModalOneData = {
  group: '',
  instruction: '',
  command: '',
};

const editModalTwoData = {
  locator: '',
  locatorParameter: '',
  data: '',
  swapResult: '',
  branchSelection: '',
  action: '',
  comment: '',
  status: false,
};

const rerenderingLauncherSection = {
  launcherSectionStatus: false,
};

const initialTestPageNameState = {
  testPageName: 'King',
};

const alertVisibilityStatus = {
  alertVisibility: false,
};

const referredTestSheetName = {
  testSheetName: '',
};

const initialDataPageNameState = {
  dataPageName: '',
};

const renamedPageNameState = {
  renamedPageName: 'King',
};

const testAddBtnStatus = {
  status: false,
};

const rendeingNavBarStatus = {
  status: false,
};

const initEditModalOne = {
  initEditModal: false,
};

const initJSONGenerator = {
  initJSONGeneratorStatus: false,
};

const commandState = {
  command: 'cmd1',
};

const typeState = {
  testType: 'type',
};

const dataSheetState = {
  dataSheet: 'sheet',
};

export const setEditModalOneData = (modalOneDataSet) => {
  return {
    type: 'SET_EDIT_MODAL_ONE_DATA',
    payload: modalOneDataSet,
  };
};

export const setEditModalTwoData = (modalTwoDataSet) => {
  return {
    type: 'SET_EDIT_MODAL_TWO_DATA',
    payload: modalTwoDataSet,
  };
};

export const setAlertVisibity = (visibityStatus) => {
  return {
    type: 'SET_ALERT_VISIBITY',
    payload: visibityStatus,
  };
};

export const setReferredTestPageName = (testPageName) => {
  return {
    type: 'SET_REFERRED_TEST_PAGE_NAME',
    payload: testPageName,
  };
};

export const setTestAddBtnStatus = (status) => {
  return {
    type: 'SET_TEST_ADD_BTN_STATUS',
    payload: status,
  };
};

export const setDataSheetAtNameAssigner = (sheetName) => {
  return {
    type: 'SET_DATA_SHEET_NAME_AT_NAME_ASSIGNER',
    payload: sheetName,
  };
};

export const setDataSheet = (sheetName) => {
  return {
    type: 'SET_DATA_SHEET_NAME',
    payload: sheetName,
  };
};

export const setTestType = (type) => {
  return {
    type: 'SET_TEST_TYPE',
    payload: type,
  };
};

export const setCommand = (commandName) => {
  return {
    type: 'SET_COMMAND',
    payload: commandName,
  };
};

export const setTestPageName = (testPageName) => {
  return {
    type: 'SET_TEST_PAGE_NAME',
    payload: testPageName,
  };
};

export const setRenamedPageName = (renamedPageName) => {
  return {
    type: 'RENAME_PAGE_NAME',
    payload: renamedPageName,
  };
};

const nameAssignerState = {
  initiateNameAssigner: false,
};

const renameState = {
  initiateRenameModal: false, // modal used to rename the pagenames
};

const changeStateReducer = (state = initialSideBarState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

const addDataSheetNameReducer = (state = initialDataSheetState, action) => {
  console.log('nila kuru');
  switch (action.type) {
    case 'MY_FUNCTION_CALLED_EXCEL':
      return {
        ...state,
        myFunctionCalledExcel: !state.myFunctionCalledExcel,
        initialRunningConditionForExcel: true,
      };
    case 'MY_FUNCTION_CALLED_MANUAL':
      return {
        ...state,
        myFunctionCalledManual: !state.myFunctionCalledManual,
        initialRunningConditionForManual: true,
      };
    default:
      return state;
  }
};

const getEditModalOneDataReducer = (state = editModalOneData, action) => {
  switch (action.type) {
    case 'SET_EDIT_MODAL_ONE_DATA':
      return {
        ...state,
        group: action.payload.group,
        instruction: action.payload.instruction,
        command: action.payload.command,
      };
    default:
      return state;
  }
};

// 'locator',
// 'locatorParameter',
// 'data',
// 'swapResult',
// 'branchSelection',
// 'action',
// 'comment',

const getEditModalTwoDataReducer = (state = editModalTwoData, action) => {
  switch (action.type) {
    case 'SET_EDIT_MODAL_TWO_DATA':
      return {
        ...state,
        locator: action.payload.locator,
        locatorParameter: action.payload.locatorParameter,
        data: action.payload.data,
        swapResult: action.payload.swapResult,
        branchSelection: action.payload.branchSelection,
        action: action.payload.action,
        comment: action.payload.comment,
        status: !state.status,
      };
    default:
      return state;
  }
};

const addTestSheetNameReducer = (state = initialTestSheetState, action) => {
  switch (action.type) {
    case 'FUNCTION_CALLED_JSON':
      return {
        ...state,
        functionCalledJson: !state.functionCalledJson,
        initialRunningConditionForJson: true,
        initialLauncherModalVisibilityState:
          !state.initialLauncherModalVisibilityState,
      };
    case 'FUNCTION_CALLED_MANUAL':
      return {
        ...state,
        functionCalledManual: !state.functionCalledManual,
        initialRunningConditionForManual: true,
        initialLauncherModalVisibilityState:
          !state.initialLauncherModalVisibilityState,
      };
    default:
      return state;
  }
};

const getRenamedPageNameReducer = (state = renamedPageNameState, action) => {
  switch (action.type) {
    case 'RENAME_PAGE_NAME':
      return {
        ...state,
        renamedPageName: action.payload,
      };
    default:
      return state;
  }
};

const getTestSheetNameReducer = (state = initialTestPageNameState, action) => {
  switch (action.type) {
    case 'SET_TEST_PAGE_NAME':
      return {
        ...state,
        testPageName: action.payload,
      };
    default:
      return state;
  }
};

const getCommandReducer = (state = commandState, action) => {
  switch (action.type) {
    case 'SET_COMMAND':
      return {
        ...state,
        command: action.payload,
      };
    default:
      return state;
  }
};

const getTestTypeReducer = (state = typeState, action) => {
  switch (action.type) {
    case 'SET_TEST_TYPE':
      return {
        ...state,
        testType: action.payload,
      };
    default:
      return state;
  }
};

const getDataSheetNameReducer = (state = dataSheetState, action) => {
  switch (action.type) {
    case 'SET_DATA_SHEET_NAME':
      return {
        ...state,
        dataSheet: action.payload,
      };
    default:
      return state;
  }
};

const getDataSheetAtNameAssignerReducer = (
  state = initialDataPageNameState,
  action
) => {
  switch (action.type) {
    case 'SET_DATA_SHEET_NAME_AT_NAME_ASSIGNER':
      return {
        ...state,
        dataPageName: action.payload,
      };
    default:
      return state;
  }
};

const getTestAddBtnStatusReducer = (state = testAddBtnStatus, action) => {
  switch (action.type) {
    case 'SET_TEST_ADD_BTN_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

const getAlertVisibityStatusReducer = (
  state = alertVisibilityStatus,
  action
) => {
  switch (action.type) {
    case 'SET_ALERT_VISIBITY':
      return {
        ...state,
        alertVisibility: action.payload,
      };
    default:
      return state;
  }
};

const getReferredTestSheetNameReducer = (
  state = referredTestSheetName,
  action
) => {
  switch (action.type) {
    case 'SET_REFERRED_TEST_PAGE_NAME':
      return {
        ...state,
        testSheetName: action.payload,
      };
    default:
      return state;
  }
};

const nameAssignerReducer = (state = nameAssignerState, action) => {
  switch (action.type) {
    case 'INITIATE_NAME_ASSIGNER':
      return {
        ...state,
        initiateNameAssigner: !state.initiateNameAssigner,
      };
    default:
      return state;
  }
};

const rerenderingLauncherSectionReducer = (
  state = rerenderingLauncherSection,
  action
) => {
  switch (action.type) {
    case 'RE_RENDER_LAUNCHER_SECTION':
      return {
        ...state,
        launcherSectionStatus: !state.launcherSectionStatus,
      };
    default:
      return state;
  }
};

const renameModalReducer = (state = renameState, action) => {
  switch (action.type) {
    case 'INITIATE_RENAME_MODAL':
      return {
        ...state,
        initiateRenameModal: !state.initiateRenameModal,
      };
    default:
      return state;
  }
};

const initiateEditModalReducer = (state = initEditModalOne, action) => {
  switch (action.type) {
    case 'INITIATE_EDIT_MODAL':
      return {
        ...state,
        initEditModal: !state.initEditModal,
      };
    default:
      return state;
  }
};

const initiateJSONGeneratorReducer = (state = initJSONGenerator, action) => {
  switch (action.type) {
    case 'INITIATE_JSON_GENERATOR':
      return {
        ...state,
        initJSONGenerator: !state.initJSONGenerator,
      };
    default:
      return state;
  }
};

const renderingNavBarReducer = (state = rendeingNavBarStatus, action) => {
  switch (action.type) {
    case 'RENDERING_NAV_BAR':
      return {
        ...state,
        status: !state.status,
      };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  changeState: changeStateReducer,
  addDataSheetName: addDataSheetNameReducer,
  addTestSheetName: addTestSheetNameReducer,
  getTestSheetName: getTestSheetNameReducer,
  getRenamedPageName: getRenamedPageNameReducer,
  nameAssigner: nameAssignerReducer,
  renameModal: renameModalReducer,
  getCommand: getCommandReducer,
  getTestType: getTestTypeReducer,
  getDataSheetName: getDataSheetNameReducer,
  getDataSheetAtNameAssigner: getDataSheetAtNameAssignerReducer,
  getTestAddBtnStatus: getTestAddBtnStatusReducer,
  getEditModalOneData: getEditModalOneDataReducer,
  initiateEditModal: initiateEditModalReducer,
  getEditModalTwoData: getEditModalTwoDataReducer,
  rerenderingLauncherSection: rerenderingLauncherSectionReducer,
  getAlertVisibityStatus: getAlertVisibityStatusReducer,
  initiateJSONGenerator: initiateJSONGeneratorReducer,
  renderingNavBar: renderingNavBarReducer,
  getReferredTestSheetName: getReferredTestSheetNameReducer,
});

const store = createStore(rootReducer);
export default store;
