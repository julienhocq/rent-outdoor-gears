import { BsPlusCircleDotted } from "react-icons/bs";
import styled, { keyframes } from "styled-components";

const LoadingPage = () => {
  const loadingAnimation = keyframes`

0% {
    transform: rotate(0) scale(1);
    color: aqua;
}
60% {
    transform: rotate(180deg) scale(1.2);
    color: green;
}

100% {
    transform: rotate(360deg) scale(1);
    color: aqua;
};
`;

  const LoadingContainer = styled.div`
    font-size: 100px;
    display: flex;
    max-width: 100px;
    animation: ${loadingAnimation} 1800ms infinite linear;
  `;
  const MainContainer = styled.div`
    padding-top: 100px;
    padding-left: 100px;
    display: flex;
    justify-content: center;
  `;

  return (
    <MainContainer>
      <LoadingContainer>
        <BsPlusCircleDotted />
      </LoadingContainer>
    </MainContainer>
  );
};

export default LoadingPage;
