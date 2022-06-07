import styled from "styled-components";
import { FaUserLock } from "react-icons/fa";

const Header = () => {
  return (
    <HeaderSection>
      <LogoHeader>Rent Adventure</LogoHeader>

      <FaUserLock size={30} color={"blue"} />
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
  background-color: #AEEAFF;
  padding: 20px 20px;
`;

const LogoHeader = styled.h1`
  font-weight: 700;
  letter-spacing: 0.2em;
  font-size: 2.7em;
  color: black;
`;

export default Header;
