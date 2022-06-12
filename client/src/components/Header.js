import styled from "styled-components";
import {GiExitDoor, GiSurfBoard} from "react-icons/gi"
import { FaUserLock } from "react-icons/fa";
import {AiFillHome} from "react-icons/ai";   // Home icon
import {RiMapPinAddFill} from "react-icons/ri";  //add icon

import { NavLink, Link, useLocation } from "react-router-dom";
import { OwnerContext } from "./context/Context";
import { useContext } from "react";



const Header = () => {
  const { owner, setOwner } = useContext(OwnerContext);

  const handleLogout = () => {
    setOwner(null);
  };

  console.log('owner', owner);
  // console.log('owner Id', owner[1]);

  return (
    <HeaderSection>
      <NavLinkStyled to="/">
        <LogoHeader>Rent Adventure</LogoHeader>
      </NavLinkStyled>
      <NavLinkStyled
        // if user is not logged in, then this link directs to login page. If user is logged in, then clicking here opens a drop down menu
        to={!owner && "/login"}
        // onClick={() => setToggleUserMenu(!toggleUserMenu)}
        // ref={userMenuRef}
      >
        {!owner ? (
        <>
           <FaUserLock size={30} color={"blue"} />
          <LoginDesign>LOGIN</LoginDesign>
          </>
        ) : (
          <>
          <NavLinkStyled to="/">
          <AiFillHome size={30} color={"blue"} />
          </NavLinkStyled>
          <NavLinkStyled to="/add-location">
          <RiMapPinAddFill size={30} color={"blue"} />
          </NavLinkStyled>
          <NavLinkStyled to={`/profile/${owner[1]}`}>
          <GiSurfBoard size={30} color={"blue"} />
          </NavLinkStyled>
          {/* <Greeting>Hi,{owner}</Greeting> */}
          <LogOutWrapper onClick={handleLogout}>
          <GiExitDoor size={30} color={"blue"} />
          <NavLinkStyled to="/">
          {/* <LoginDesign>LOGOUT</LoginDesign> */}
          </NavLinkStyled>
          </LogOutWrapper>
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
  margin-bottom: 20px;
  margin-top: 0px !important;
  color: white;
  background-color: #aeeaff;
  padding: 20px 20px;
`;

const LogoHeader = styled.h1`
  font-weight: 700;
  letter-spacing: 0.2em;
  font-size: 2.7em;
  color: black;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 10px;
`;

const Greeting = styled.div`
  font-weight: bold;
  text-decoration: none;
  color: blue;
`;

const LoginDesign = styled.span`
  color: blue;
  font-size: 1.2em;
  font-weight: 700;
`;

const Logout = styled.div`
`

const LogOutWrapper = styled.div`
`

export default Header;
