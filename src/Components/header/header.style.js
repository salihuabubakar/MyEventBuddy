import styled from "styled-components";



export const Span = styled.span`
@import url('https://fonts.googleapis.com/css2?family=Bungee+Spice&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&family=Roboto:wght@300&display=swap');

  font-size: 1rem;
  /* font-family: 'Poppins', sans-serif; */
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  margin: 0 2px;
`;

export const Header = styled.div`
  display: flex;

  justify-content: space-between;


  .btn {
    border: 2px solid #ddd;
    color: #000000;
    padding-top: 2.5%;
    padding-bottom: 2.5%;
    width: 100%;
    background-color: transparent;
    outline: none;

    &:hover {
      outline: none;
      background-color: transparent;
    }
  }

  .select {
    border: 2px solid #ddd;
    outline: none;
  }

  .left {
    display: flex;
    justify-content: space-between;
  }

  .left, .right {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 520px;
    width: 100%;
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

  /* box-shadow: -1px -1px 5px 3px rgba(0,0,0,0.75);
-webkit-box-shadow: -1px -1px 5px 3px rgba(0,0,0,0.75);
-moz-box-shadow: -1px -1px 5px 3px rgba(0,0,0,0.75); */

`;