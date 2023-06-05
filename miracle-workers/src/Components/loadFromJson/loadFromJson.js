import React from "react";
import axios from "axios";

export default function LoadFromJson() {
  const handleJsonUpload = (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const file = e.target.result;
        const url = `http://localhost:5000/json/upload`;
       
        axios
          .post(url, { file })
          .then((res) => {
            console.log("uploaded");
          })
          .catch((err) => {
            console.log(err);
          });
      };
      reader.readAsText(file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleJsonUpload} />
    </div>
  );
}

