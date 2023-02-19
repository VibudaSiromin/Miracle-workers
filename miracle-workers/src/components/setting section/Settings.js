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
import { Link } from "react-router-dom";
const Settings = () => {
  const commandHandler = (num) => {
    if (num === 1) {
      console.log("com");
    }
    if (num === 2) {
      console.log("brow");
    }
    if (num === 3) {
      console.log("brow");
    }
    if (num === 4) {
      console.log("brow");
    }
    if (num === 5) {
      console.log("brow");
    }
    if (num === 6) {
      console.log("brow");
    }
    if (num === 7) {
      console.log("brow");
    }
  };

  return (
    <Container>
      <Row>
        <Link to="/settings/commands">
          <SettingsItem
            title="Command"
            symbol={<BsCommand size={42} onClick={() => commandHandler(1)} />}
          />
        </Link>
        <Link to="/settings/browsers">
        <SettingsItem
          title="Browser"
          symbol={
            <MdOutlineOpenInBrowser
              size={42}
              onClick={() => commandHandler(2)}
            />
          }
        />
        </Link>
        <Link>
        <SettingsItem
          title="Test Type"
          symbol={<RiNumber2 size={42} onClick={() => commandHandler(3)} />}
        />
        </Link>

      </Row>
      <Row>
        <SettingsItem
          title="Status"
          symbol={<TbCircle size={42} onClick={() => commandHandler(4)} />}
        />
        <SettingsItem
          title="Yes/No"
          symbol={<GrStatusGood size={42} onClick={() => commandHandler(5)} />}
        />
        <SettingsItem
          title="Instruction"
          symbol={
            <MdOutlineIntegrationInstructions
              size={42}
              onClick={() => commandHandler(6)}
            />
          }
        />
      </Row>
      <Row>
        <SettingsItem
          title="Condition"
          symbol={
            <RiFileSearchLine size={42} onClick={() => commandHandler(7)} />
          }
        />
      </Row>
    </Container>
  );
};

export default Settings;
