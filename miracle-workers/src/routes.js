import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))
// const TestSuites = React.lazy(() => import('./views/testSuites'))

// Icons
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))


//testSuites
const TestSuites = React.lazy(() => import('./views/testJson/TestJson'))
//test junction
const TestJunction=React.lazy(() => import('./views/testJunction/TestJunction'))
//test json
const TestJson=React.lazy(() => import('./views/testJson/TestJson'))
//test manual
const TestManual=React.lazy(() => import('./views/testManual/TestManual'))
//data manual
const Data = React.lazy(() => import('./views/data/Data'))
//data excel
const DataExcel = React.lazy(() => import('./views/dataExcel/DataExcel'))
//data junction
const DataJunction=React.lazy(() => import('./views/dataJunction/DataJunction'))
//locator 
//locator
const Locator=React.lazy(() => import('./views/locator/Locator'))
//component
// const Component=React.lazy(() => import('./views/component/Component'))
//settings
const Settings=React.lazy(() => import('./views/settings/settings'))
//settings-browsers
const Browsers=React.lazy(() => import('./views/settings/browsers'))
//settings-commands
const Commands=React.lazy(() => import('./views/settings/commands'))
//settings-instructions
const Instructions=React.lazy(() => import('./views/settings/instructions'))
//settings-conditions
const Conditions=React.lazy(() => import('./views/settings/conditions'))
//settings-yesNo
const YesNo=React.lazy(() => import('./views/settings/yesNo'))
//settings-status
const Status=React.lazy(() => import('./views/settings/status'))
//settings-testTypes
const TestTypes=React.lazy(() => import('./views/settings/testTypes'))
const Dashbaord=React.lazy(() => import('./views/home-page/index'));

const loadFormJson=React.lazy(() => import('./components/loadFromJson/loadFromJson'));



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/testSuites/:tname', name: 'TestSuites', element: TestSuites },
  { path: '/dataJunction/data/:dname' , name:'Data', element:Data},
  { path: '/testJunction' , name:'TestJunction', element:TestJunction},
  { path: '/dataJunction' , name:'DataJunction', element:DataJunction},
  { path: '/dataJunction/dataExcel/:dname' , name:'DataExcel', element:DataExcel},
  { path: '/testJunction/testManual/:tname' , name:'TestManual', element:TestManual},  
  { path: '/locator/:lname' , name:'Locator' , element:Locator},
  { path: '/settings' , name:'Settings', element:Settings},
  { path: '/dashboard' , name:'Settings', element:Dashbaord},
  { path: '/loadFormJson' , name:'Settings', element:loadFormJson},
  { path: '/settings/browsers', name:'Browsers', element:Browsers},
  { path: '/settings/commands', name:'Commands', element:Commands},
  { path: '/settings/conditions', name:'Browsers', element:Conditions},
  { path: '/settings/instructions', name:'Browsers', element:Instructions},
  { path: '/settings/yes-no', name:'Browsers', element:YesNo},
  { path: '/settings/test-types', name:'Browsers', element:TestTypes},
  { path: '/settings/status', name:'Browsers', element:Status},
]

export default routes
