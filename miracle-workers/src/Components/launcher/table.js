import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import { Table } from "react-bootstrap";
import ModalComponent from "../common/modal";
import LauncherForm from "./launcher-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from 'axios'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { setTestType,setDataSheet,setTestAddBtnStatus,setTestPageName } from "../../store";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";


const TableLauncher = (props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [data, setData] = useState({});
  const [isLauncherMount,setIsLauncherMount] = useState(false);
  const [isMount,setIsMount] = useState(false);
  const [isMountTwo,setIsMountTwo] = useState(false);
  const [isDataDriven,setIsDataDriven] = useState(false);

  const {tname}=useParams();
  const location=useLocation();
  const dispatch = useDispatch();

  console.log('drum',props.testPageName);

  
  useEffect(()=>{
    if(isMount){
      //const data=data;
      //Object.keys(data).length===0
      // if(Object.keys(data).length===0){
      //   dispatch(setTestAddBtnStatus(false));
      // }else{
      //   dispatch(setTestAddBtnStatus(true))
      // }
    }else{
      setIsMount(true)
    }
  },[data])


  const testTypeHandler = (testType) => {
    if(testType==='Data Driven'){
      setIsDataDriven(true);
    }else{
      setIsDataDriven(false);
    }
  }

  const schema = yup
    .object({
      // sheetName: yup.string().required("Name is required"),
      testCase: yup.string().required("Test Case is required"),
      browser: yup.string().required("Browser is required"),
      type: yup.string().required("Test Type is required"),
      status: yup.string().required("Status is required"),
      dataSheet: yup.string().when('type',{
        is:'Data Driven',
        then:(schema) => schema.required("Data sheet is required"),
        otherwise:(schema) => schema.notRequired()
      })
      //dataSheet: yup.string().required("Data sheet is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sheetName: "",
      testCase:"",
      browser: "",
      type: "",
      status: "",
      dataSheet: "",
    },
  });
  const onSubmit = (data) => {
    data['sheetName']=props.testPageName;
    console.log('zambia',data);
    const testType= data.type;
    const dataSheet = data.dataSheet;
    dispatch(setTestAddBtnStatus(true));

    dispatch(setTestType(testType));
    dispatch(setDataSheet(dataSheet));
    reset();
    setData(data);
    saveData(data);
    setIsShowModal(false);
  };

  const saveData=(data) => {
    const currentURL=location.pathname;
   
    if(currentURL==='/testJunction/testManual/'+tname){
      console.log("LMG");
      axios
      .post('http://localhost:5000/testJunction/testManual/'+tname+'/editLauncher',{
        editedData:data,
        type:"Manual"
      })
      .then(()=>{

      })
      .catch((err)=>{
        console.log(err);
      })
    }

  }

  // const getDataFromStore = () => {
  //   axios
  //   .get('http://localhost:5000/testJunction/testManual/'+tname+'/getLauncherContent',{
  //     params:{
  //       testPageName:tname+"M"
  //     }
  //   })
  //   .then((res)=>{
  //     console.log(res);
  //     const launcherDetails=res.data.getLauncherDetails;
  //     setData(launcherDetails);
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }

  // const getData = async () => {
  //   const response = await axios.get(
  //     `https://famous-quotes4.p.rapidapi.com/random`
  //   );
  // };

  const getDataFromStore =async () => {
    console.log('banana2',tname);
    try{
      const response= await axios.get(
        `http://localhost:5000/launcher/getLauncherContent`,
        {
          params:{
                   testPageName:tname+"M"
                 }
        }
      )
      const launcherDetails=response.data.getLauncherDetails;
      setData(launcherDetails);
      dispatch(setTestPageName(launcherDetails.sheetName));
      console.log('arial',launcherDetails);
      if(launcherDetails===undefined){
        dispatch(setTestAddBtnStatus(false));
      }else{
        dispatch(setTestAddBtnStatus(true));
      }
      
    }catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }else if(err.request){
        // The client never received a response, and the request was never left
        console.log(err.request);
      }else{
        // Anything else
        console.log('Error', err.message);
      }
    }
    
  }

  const rerenderLauncherSection = async () => {
    const renamedTestPageName = props.renamedTestPageName;
    console.log('T34',renamedTestPageName);
    try{
      const response= await axios.get(
        `http://localhost:5000/launcher/getLauncherContent`,
        {
          params:{
                   testPageName:renamedTestPageName+"M"
                 }
        }
      )
      const launcherDetails=response.data.getLauncherDetails;
      setData(launcherDetails);
      dispatch(setTestPageName(launcherDetails.sheetName));
      console.log('arial',launcherDetails);
      if(launcherDetails===undefined){
        dispatch(setTestAddBtnStatus(false));
      }else{
        dispatch(setTestAddBtnStatus(true));
      }
      
    }catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }else if(err.request){
        // The client never received a response, and the request was never left
        console.log(err.request);
      }else{
        // Anything else
        console.log('Error', err.message);
      }
    }
  }

  const rerenderingStatusOfLauncherSection = useSelector((state)=>state.rerenderingLauncherSection.launcherSectionStatus);

  useEffect(()=>{
    
    getDataFromStore();
  },[tname])

  useEffect(()=>{
    if(isMountTwo){
      console.log('banana',rerenderingStatusOfLauncherSection);
      rerenderLauncherSection();
    }else{
      setIsMountTwo(true);
    }
  },[rerenderingStatusOfLauncherSection])

  const onCancel = () => {
    reset();
    setIsShowModal(false);
  };

  const showModal = () => {
    if (data) {
      reset(data);
    }
    setIsShowModal(true);
  };

  const showModalInitially = () => {
    setIsShowModal(true);
  }


  // useEffect(()=>{
  //   is
  // },[])

  const calledFromJsonTest = useSelector((state) => state.addTestSheetName.initialLauncherModalVisibilityState);
  

  const calledFromManualTest = useSelector((state) => state.addTestSheetName.initialLauncherModalVisibilityState);
  console.log("proStreet",calledFromManualTest);

  console.log('galaxy',isLauncherMount);
  useEffect(() => {
    console.log('wolf tooth');
    if(isLauncherMount){
      showModalInitially(); 
    }else{
      setIsLauncherMount(true);
    }
      
  }, [calledFromJsonTest]);

  useEffect(() => {
    console.log('Wolf warrior');
    if(isLauncherMount){
      showModalInitially(); 
      console.log('Wolf');
    }else{
      setIsLauncherMount(true);
    } 
  }, [calledFromManualTest]);


  return (
    <>
      <ModalComponent
        isShowModal={isShowModal}
        title="Create A New Test Case"
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        saveButtonText="Feed"
      >
        <LauncherForm register={register} errors={errors} testPageName={props.testPageName} testTypeHandler={testTypeHandler}/>
      </ModalComponent>
      <Table
        striped
        bordered
        hover
        style={{
          borderCollapse: "collapse",
          borderRadius: "5px",
          overflow: "hidden",
          color:"white"
        }}
      >
        <tbody style={{ border: "5px solid #04D9FF" }}>
          <tr>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left',color:'white' }}>
              Sheet Name <PlayArrowIcon fontSize="11px" /> {data?.sheetName}
            </td>
            <td style={{ width: "25%", color: "black", fontWeight: "bold",textAlign:'left',color:'white' }}>
              Test Case<PlayArrowIcon fontSize="11px" /> {data?.testCase}
            </td>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left',color:'white' }}>
              Browser <PlayArrowIcon fontSize="11px" /> {data?.browser}
            </td>
            <td style={{textAlign:'center' }} rowSpan={3} >
              <IconButton aria-label="Example" onClick={() => showModal()}>
                <CreateIcon sx={{ color:"04D9FF", fontSize: "40px" }} />
              </IconButton>
            </td>
          </tr>
          <tr>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left',color:'white' }}>
              Test Type <PlayArrowIcon fontSize="11px" /> {data?.type}
            </td>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left' ,color:'white'}}>
              Status <PlayArrowIcon fontSize="11px" /> {data?.status}
            </td>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left' ,color:'white'}}>
              Data Sheet <PlayArrowIcon fontSize="11px" /> {data?.dataSheet}
            </td>
          </tr>
          <tr>
            <td style={{ width: "", color: "black", fontWeight: "bold",textAlign:'left',color:'white'}} colSpan={3}>
              Comment <PlayArrowIcon fontSize="11px" /> {data?.comment}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};


const mapStateToProps = (state) => {
  return{
    testPageName: state.getTestSheetName.testPageName,
    renamedTestPageName:state.getRenamedPageName.renamedPageName
  }
};

export default connect(mapStateToProps)(TableLauncher);

//export default TableLauncher;
