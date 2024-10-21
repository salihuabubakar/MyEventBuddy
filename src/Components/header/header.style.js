import styled from "styled-components";
const customMediaQuery = (maxWidth) => `@media (max-width: ${maxWidth}px)`;

export const media = {
  smallScreenLaptop: customMediaQuery(1024),
  tablet: customMediaQuery(768),
  bigMobile: customMediaQuery(623),
  mobile: customMediaQuery(576),
};

const { smallScreenLaptop, mobile, tablet, bigMobile } = media;



export const InnerHeaderContainer = styled.div`
  .show {
    display: flex !important;
  }
`; 

export const Span = styled.span`
@import url('https://fonts.googleapis.com/css2?family=Bungee+Spice&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&family=Roboto:wght@300&display=swap');

  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  margin: 0 2px;
`;

export const Header = styled.div`

  display: flex;

  justify-content: space-between;

  .left {
    display: flex;
    justify-content: space-between;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    margin: 0;
    .shift-btn {
      /* padding-top: 2.5;
      padding-bottom: 2.5; */
      max-width: 150px;
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 5px;
      margin: 0;

      img {
        width: 17px;
      }
    }
  }
`;

export const Controls = styled.div`
  border-radius: 8px;
  margin: 0;
  padding: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(24, 88, 177, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  ${bigMobile} {
    z-index: 6;
  }
`;