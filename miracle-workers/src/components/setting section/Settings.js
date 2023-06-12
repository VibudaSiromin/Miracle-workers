import React ,{useEffect} from "react";
import SettingsItem from "./SettingsItem";
import { RiNumber2 } from "react-icons/ri";
import { BsCommand } from "react-icons/bs";
import { MdOutlineOpenInBrowser } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { TbCircle } from "react-icons/tb";
import { RiFileSearchLine } from "react-icons/ri";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { Grid } from "@material-ui/core";

const Settings = () => {

  return (
    <Grid container spacing={5}>
      <Grid item sm={4} xs={6}>
        <SettingsItem
          title="Command"
          symbol={<BsCommand size={42}/>}
        />
      </Grid>

      <Grid item sm={4} xs={6}>
        <SettingsItem
          title="Browser"
          symbol={
            <MdOutlineOpenInBrowser
              size={42}
            />
          }
        />
      </Grid>
      <Grid item sm={4} xs={6}>
        <SettingsItem
          title="TestType"
          symbol={<RiNumber2 size={42}/>}
        />
      </Grid>
      <Grid item sm={4} xs={6}>
        <SettingsItem
          title="Status"
          symbol={<TbCircle size={42}/>}
        />
      </Grid>
      <Grid item sm={4} xs={6}>
        <SettingsItem
          title="Yes/No"
          symbol={<GrStatusGood size={42}/>}
        />
      </Grid>
      <Grid item sm={4} xs={6}>
        <SettingsItem
          title="Instruction"
          symbol={
            <MdOutlineIntegrationInstructions
              size={42}
        />
          }
        />
      </Grid>
      <Grid item sm={4} xs={6}>
        <SettingsItem
          title="Condition"
          symbol={
            <RiFileSearchLine size={42}/>
          }
        />
      </Grid>
    </Grid>
  );
};

export default Settings;
