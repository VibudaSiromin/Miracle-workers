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

const TableLauncher = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [data, setData] = useState({});

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
    const url='http://localhost:5000/launcher/';
    
    axios.post(url, {
      data
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

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
