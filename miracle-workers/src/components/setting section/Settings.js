import React from "react";
import SettingsItem from "./SettingsItem";
import { RiNumber2 } from "react-icons/ri";
import { BsCommand } from "react-icons/bs";
import { MdOutlineOpenInBrowser } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { TbCircle } from "react-icons/tb";
import { RiFileSearchLine } from "react-icons/ri";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Settings = () => {
  return (
    <Container>
      <Row>
        <SettingsItem title="Command" symbol={<BsCommand size={42} />} />
        <SettingsItem
          title="Browser"
          symbol={<MdOutlineOpenInBrowser size={42} />}
        />
        <SettingsItem title="Test Type" symbol={<RiNumber2 size={42} />} />
      </Row>
      <Row>
        <SettingsItem title="Status" symbol={<TbCircle size={42} />} />
        <SettingsItem title="Yes/No" symbol={<GrStatusGood size={42} />} />
        <SettingsItem
          title="Instruction"
          symbol={<MdOutlineIntegrationInstructions size={42} />}
        />
      </Row>
      <Row>
        <SettingsItem
          title="Condition"
          symbol={<RiFileSearchLine size={42} />}
        />
      </Row>
    </Container>
  );
};

export default Settings;
