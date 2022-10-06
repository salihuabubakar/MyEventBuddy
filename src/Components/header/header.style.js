import styled from "styled-components";
const customMediaQuery = (maxWidth) => `@media (max-width: ${maxWidth}px)`;

export const media = {
  smallScreenLaptop: customMediaQuery(1024),
  tablet: customMediaQuery(768),
  bigMobile: customMediaQuery(623),
  mobile: customMediaQuery(576),
};

const { smallScreenLaptop, mobile, tablet, bigMobile } = media;

export const HeaderContainer = styled.div`
  .sidebar-button {
    display: none;
  }

  ${bigMobile} {
    .sidebar-button {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 8px;
      right: 10px;

      padding: 3.5% 4%;
      height: 25px;
      color: #000;
      border: 2px solid #ddd;
      width: 23%;
    }
  }

  @media screen and (max-width: 452px) {
    .sidebar-button {
      width: 26%;
    }
  }

  @media screen and (max-width: 400px) {
    .sidebar-button {
      width: 30%;
    }
  }

  @media screen and (max-width: 372px) {
    .sidebar-button {
      width: 33%;
    }
  }

  @media screen and (max-width: 330px) {
    .sidebar-button {
      width: 40%;
    }
  }
`;

export const EmptySpace = styled.div`
  ${bigMobile} {
    margin: 11% 0;
  }
`;

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
  ${bigMobile} {
    display: none;
    position: fixed;
    left: 0;
    right: 0;
    padding-left: 20px;
    margin: auto;
    margin-top: 30%;
    z-index: 9;
    width: 90%;
    border-radius: 5px;
    padding: 5px 0;
    flex-direction: column;
    background-color: #fff;
  }

  display: flex;

  justify-content: space-between;

  .btn {
    border: 2px solid #ddd;
    padding-top: 2.5%;
    padding-bottom: 2.5%;
    width: 100%;
    color: #000;
    background-color: transparent;
    outline: none;

    &:hover {
      outline: none;
      background-color: transparent;
    }
  }

  .btn-today {
    ${bigMobile} {
      width: 50%;
      margin-top: 10px;
    }
  }

  .select {
    margin-left: 10px;
    outline: none;
  }

  .left {
    display: flex;
    justify-content: space-between;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile} {
      flex-direction: column;
      margin: 5px 0;
    }
  }

  .right {
    display: flex;
    justify-content: flex-end;
    .shift-btn {
      padding-top: 2.5;
      padding-bottom: 2.5;
      max-width: 150px;
      width: 100%;
    }
  }
`;

export const Controls = styled.div`
  border: 2px solid #ddd;
  border-radius: 8px;
  margin: 0 3%;
  padding: 2%;
  display: flex;
  align-items: center;
  justify-content: center;

  .control-btn {
    border: none;
  }

  label {
    width: 120px;
    text-align: center;
  }
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