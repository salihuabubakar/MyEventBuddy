import styled from "styled-components";

export const PopupContainer = styled.form`
  background-color: white;
  max-width: 422px;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;

 box-shadow: 1px 3px 33px -7px rgba(0,0,0,0.54);
-webkit-box-shadow: 1px 3px 33px -7px rgba(0,0,0,0.54);
-moz-box-shadow: 1px 3px 33px -7px rgba(0,0,0,0.54);
border-radius: 6px 6px 6px 6px;
-webkit-border-radius: 6px 6px 6px 6px;
-moz-border-radius: 6px 6px 6px 6px;

  header {
    background-color: #F3F4F6;
    height: 30px;

    div {
      display: flex;
      justify-content: flex-end;
      span {
        cursor: pointer;
        &:hover {
          color: red;
        }
        margin: 5px;
        img {
          width: 20px;
        }
      }
    }
  }

  .pop-card-content {
    padding: 1rem;

    div {
      /* width: 100%; */
      .filled {
        margin: 10px 0;
      }
      .filled-nth-child {
        width: 60%;
      }
      .first-child {
        margin-right: 1px;
      }
      .second-child {
        margin-left: 1px;
      }
    }
    .flex {
      display: flex;
    }
  }

  button {
    cursor: pointer;
    padding: 1%;
    border: none;
    background-color: #F3F4F6;
    img {
      width: 30px;
    }
  }
`;

export const PopupCardHeader = styled.div`
  background-color: #607087b3;
`;

export const PopupWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PopupOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: #607087b3;
`;
