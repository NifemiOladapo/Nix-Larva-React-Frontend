import React from "react";
import "../Styles/Header.css";
import {
  ChatBubbleOutline,
  ChatOutlined,
  ChildFriendlySharp,
  Group,
  GroupOutlined,
  PersonAddOutlined,
  SearchOutlined,
  VideoCallOutlined,
  VideocamSharp,
} from "@material-ui/icons";
import { Avatar } from "@material-ui/core";

const Header = () => {
  return (
    <div className="header">
      <div className="left__header">
        <h2>Nix</h2>
        <div className="search__div">
          <SearchOutlined className="search__icon" />
          search Nix-Larva
        </div>
      </div>
      <div className="center__header">
        <ChatOutlined className="icons" />
        <GroupOutlined className="icons" />
        <VideoCallOutlined className="icons" />
        <PersonAddOutlined className="icons" />
      </div>
      <div className="right__header">
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
