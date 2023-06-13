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
import { setTestType,setDataSheet } from "../../store";
import { useDispatch } from "react-redux";

const TableLauncher = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [data, setData] = useState({});
  const [isLauncherMount,setIsLauncherMount] = useState(false);

  const {tname}=useParams();
  const location=useLocation();
  const dispatch = useDispatch();

  const schema = yup
    .object({
      sheetName: yup.string().required("Name is required"),
      testCase: yup.string().required("Test Case is required"),
      browser: yup.string().required("Browser is required"),
      type: yup.string().required("Test Type is required"),
      status: yup.string().required("Status is required"),
      dataSheet: yup.string().required("Data sheet is required"),
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
    console.log('zambia',data);
    const testType= data.type;
    const dataSheet = data.dataSheet;

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



  useEffect(()=>{
    getDataFromStore();
  },[tname])

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
        <LauncherForm register={register} errors={errors} />
      </ModalComponent>
      <Table
        striped
        bordered
        hover
        style={{
          borderCollapse: "collapse",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <tbody style={{ border: "5px solid #04D9FF" }}>
          <tr>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left' }}>
              Sheet Name <PlayArrowIcon fontSize="11px" /> {data?.sheetName}
            </td>
            <td style={{ width: "25%", color: "black", fontWeight: "bold",textAlign:'left' }}>
              Test Case<PlayArrowIcon fontSize="11px" /> {data?.testCase}
            </td>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left' }}>
              Browser <PlayArrowIcon fontSize="11px" /> {data?.browser}
            </td>
            <td style={{textAlign:'center' }} rowSpan={3} >
              <IconButton aria-label="Example" onClick={() => showModal()}>
                <CreateIcon sx={{ color: "black", fontSize: "40px" }} />
              </IconButton>
            </td>
          </tr>
          <tr>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left' }}>
              Test Type <PlayArrowIcon fontSize="11px" /> {data?.type}
            </td>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left' }}>
              Status <PlayArrowIcon fontSize="11px" /> {data?.status}
            </td>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left' }}>
              Data Sheet <PlayArrowIcon fontSize="11px" /> {data?.dataSheet}
            </td>
          </tr>
          <tr>
            <td style={{ width: "", color: "black", fontWeight: "bold",textAlign:'left'}} colSpan={3}>
              Comment <PlayArrowIcon fontSize="11px" /> {data?.comment}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TableLauncher;
