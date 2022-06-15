import styled from "styled-components";
import { GiBookCover, GiCatapult } from "react-icons/gi";

const ErrorMessage = () => {
  return (
    <ErrorContainer>
      <IconTop>
        <GiCatapult />
      </IconTop>
      <TextError>An unknown error has occured</TextError>
      <DetailError>
        Please try refreshing the page. Otherwise go enjoy the great outdoor!
      </DetailError>
      <IconBottom>
        <GiBookCover />
      </IconBottom>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;
const IconTop = styled.div`
  color: blue;
  font-size: 200px;
  padding-bottom: 20px;
`;
const TextError = styled.h2`
  font-size: 2em;
  font-weight: 700;
  padding-bottom: 40px;
`;
const DetailError = styled.p`
  font-size: 1.2em;
  padding-bottom: 20px;
`;
const IconBottom = styled.div`
  color: purple;
  font-size: 160px;
`;

export default ErrorMessage;
