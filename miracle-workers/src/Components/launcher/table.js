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

const TableLauncher = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [data, setData] = useState({});
  const [isLauncherMount,setIsLauncherMount] = useState(false);

  const {tname}=useParams();
  const location=useLocation();

  const schema = yup
    .object({
      name: yup.string().required("Name is required"),
      browser: yup.string().required("Browser is required"),
      test_type: yup.string().required("Test Type is required"),
      status: yup.string().required("Status is required"),
      data_sheet: yup.string().required("Data sheet is required"),
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
      name: "",
      browser: "",
      test_type: "",
      status: "",
      data_sheet: "",
    },
  });
  const onSubmit = (data) => {
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

  const getDataFromStore = () => {
    axios
    .get('http://localhost:5000/testJunction/testManual/'+tname+'/getLauncherContent',{
      params:{
        testPageName:tname+"M"
      }
    })
    .then((res)=>{
      console.log(res);
      const launcherDetails=res.data.getLauncherDetails;
      setData(launcherDetails);
    })
    .catch((err)=>{
      console.log(err)
    })
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
              Name <PlayArrowIcon fontSize="11px" /> {data?.name}
            </td>
            <td style={{ width: "25%", color: "black", fontWeight: "bold",textAlign:'left' }}>
              Browser <PlayArrowIcon fontSize="11px" /> {data?.browser}
            </td>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left' }}>
              Test Type <PlayArrowIcon fontSize="11px" /> {data?.test_type}
            </td>
            <td rowSpan={"2"}>
              <IconButton aria-label="Example" onClick={() => showModal()}>
                <CreateIcon sx={{ color: "black", fontSize: "40px" }} />
              </IconButton>
            </td>
          </tr>
          <tr>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left' }}>
              Status <PlayArrowIcon fontSize="11px" /> {data?.status}
            </td>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left' }}>
              Data Sheet <PlayArrowIcon fontSize="11px" /> {data?.data_sheet}
            </td>
            <td style={{ width: "35%", color: "black", fontWeight: "bold",textAlign:'left' }}>
              Comment <PlayArrowIcon fontSize="11px" /> {data?.comment}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TableLauncher;
