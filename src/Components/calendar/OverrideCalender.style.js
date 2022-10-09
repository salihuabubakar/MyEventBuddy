import styled from "styled-components";


export const Container = styled.body`
  @import url("https://fonts.googleapis.com/css2?family=Bungee+Spice&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&family=Roboto:wght@300&display=swap");

  .rbc-date-cell {
    text-align: center;
    padding: 0.5%;
  }

  .rbc-calendar {
    font-family: "Raleway", sans-serif;
    font-weight: 400;
  }

  height: 98vh;

  .rbc-current {
    color: ${(props) => (props.currentDate ? "#fff" : "")};
    position: relative;
    bottom: 10px;
  }

  .rbc-current::before {
    ${({ currentDate }) =>
      currentDate &&
      `
      background-color: #1A73E8;
      content: "";
      width: 25px;
      height: 25px;
      border-radius: 50px;
      box-sizing: border-box;
      position: relative;
      display: inline-flex;
      left: 19.5px;
      top: 9px;
      z-index: -1;
    `}
  }

  .rbc-today {
    font-weight: 900;
    color: #1a73e8;
  }

  .rbc-month-row {
  }

  .rbc-row-content {
  }

  .rbc-current-time-indicator {
    background-color: #ea4335;
  }

  .rbc-current-time-indicator-shape {
  }

  .rbc-row {
    font-size: 1rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
`;
