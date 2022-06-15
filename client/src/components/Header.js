import styled from "styled-components";
import { GiExitDoor } from "react-icons/gi";
import { FaUserLock } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai"; // Home icon
import { RiMapPinAddFill } from "react-icons/ri"; //add icon
import { GiNinjaHead } from "react-icons/gi";

import { NavLink } from "react-router-dom";
import { OwnerContext } from "./context/Context";
import { useContext } from "react";

const Header = () => {
  const { owner, setOwner } = useContext(OwnerContext);

  const handleLogout = () => {
    localStorage.clear();
    setOwner(null);
  };

  return (
    <HeaderSection>
      <NavLinkStyled to="/">
        <LogoHeader>Rent Adventure</LogoHeader>
      </NavLinkStyled>
      <NavLinkStyled
        // if user is not logged in, then this link directs to login page. If user is logged in, then clicking here opens a drop down menu
        to={!owner && "/login"}
      >
        {!owner ? (
          <>
            <FaUserLock size={30} color={"white"} />
            <LoginDesign>LOGIN</LoginDesign>
          </>
        ) : (
          <>
            <NavLinkStyled to="/">
              <AiFillHome size={40} color={"#0045F2"} />
            </NavLinkStyled>
            <NavLinkStyled to="/add-location">
              <RiMapPinAddFill size={40} color={"#D97652"} />
            </NavLinkStyled>
            <NavLinkStyled to="/">
              <LogOutWrapper onClick={handleLogout}>
                <GiExitDoor size={40} color={"#0045F2"} />
              </LogOutWrapper>
            </NavLinkStyled>
            <NavLinkStyled to={`/profile/${owner[1]}`}>
              <AvatarWrapper>
                {owner[2] === "" ? (
                  <GiNinjaHead size={70} />
                ) : (
                  <AvatarImg src={owner[2]}></AvatarImg>
                )}
              </AvatarWrapper>
            </NavLinkStyled>
          </>
        )}
      </NavLinkStyled>
    </HeaderSection>
  );
};

const HeaderSection = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0px !important;
  color: white;
  /* background-color: #aeeaff; */
  background-color: #6bbef2;
  padding: 10px 40px;
`;

const LogoHeader = styled.h1`
  font-family: monospace;

  font-weight: 700;
  letter-spacing: 0.3em;
  font-size: 2.7em;
  color: white;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 20px;
`;

const LoginDesign = styled.span`
  color: white;
  font-size: 1.2em;
  font-weight: 700;
`;

const LogOutWrapper = styled.div``;

const AvatarWrapper = styled.div`
  border-radius: 50%;
  display: flex;
  padding: 0 10px;
  height: 80px;
  width: 80px;
`;

const AvatarImg = styled.img`
  border-radius: 50%;
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border: 2px solid white;
`;

export default Header;
