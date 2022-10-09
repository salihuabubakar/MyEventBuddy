import styled from "styled-components";
import {media} from "../header/header.style"
const {mobile} = media

export const PopupContainer = styled.form`
  background-color: white;
  max-width: 422px;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;

  font-family: "Raleway", sans-serif;
  font-weight: 400;

  ${mobile} {
    width: 95%;
  }

  box-shadow: 1px 3px 33px -7px rgba(0, 0, 0, 0.54);
  -webkit-box-shadow: 1px 3px 33px -7px rgba(0, 0, 0, 0.54);
  -moz-box-shadow: 1px 3px 33px -7px rgba(0, 0, 0, 0.54);
  border-radius: 6px 6px 6px 6px;
  -webkit-border-radius: 6px 6px 6px 6px;
  -moz-border-radius: 6px 6px 6px 6px;

  header {
    background-color: #f3f4f6;
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

  button {
    cursor: pointer;
    padding: 1%;
    border: none;
    background-color: #f3f4f6;
    img {
      width: 30px;
    }
  }
`;

export const PopCardContentWrapper = styled.div`
  padding: 0.5rem;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  .filled {
    margin: 10px 0;
  }
`;

export const SelectWrapper = styled.div`
  
`;

export const DateWrapper = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;

  .dateContainer {
    display: flex;
    flex-direction: column;

    .start, .end {
      width: 100%;
    }

    label {
      display: block;
      color: gray;
    }
  }
  .start-time,
  .end-time {
    margin: 5px 0;
  }

  .start-time {
    margin-bottom: 10px;
  }

  .end-time {
  }
`;

export const CheckToCompleteWrapper = styled.div`
  .completed {
    color: gray;
  }
`;

export const ColorWrapper = styled.div`
  cursor: default;
  .c0 {
    input[type="radio"] {
      border: 2px solid #251607;
    }

    input[type="radio"]:checked {
      background-color: #251607;
    }
  }
  .c1 {
    input[type="radio"] {
      border: 2px solid #4f9153;
    }

    input[type="radio"]:checked {
      background-color: #4f9153;
    }
  }
  .c2 {
    input[type="radio"] {
      border: 2px solid #fc8eac;
    }

    input[type="radio"]:checked {
      background-color: #fc8eac;
    }
  }
  .c3 {
    input[type="radio"] {
      border: 2px solid #f5ac70;
    }

    input[type="radio"]:checked {
      background-color: #f5ac70;
    }
  }
  .c4 {
    input[type="radio"] {
      border: 2px solid #555555;
    }

    input[type="radio"]:checked {
      background-color: #555555;
    }
  }
  .c5 {
    input[type="radio"] {
      border: 2px solid #326872;
    }

    input[type="radio"]:checked {
      background-color: #326872;
    }
  }
  .c6 {
    input[type="radio"] {
      border: 2px solid #6f2da8;
    }

    input[type="radio"]:checked {
      background-color: #6f2da8;
    }
  }
  .c7 {
    input[type="radio"] {
      border: 2px solid #829f82; 
    }

    input[type="radio"]:checked {
      background-color: #829f82;
    }
  }

  .c0, .c1, .c2, .c3, .c4, .c5, .c6, .c7 {
    input[type="radio"] {
      border-radius: 50%;
      background-clip: content-box;
      padding: 3px;
      appearance: none;
      width: 30px;
      height: 30px;
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

export const EventContainer = styled.span`
  text-decoration: ${(props) => (props.isComplete ? 'line-through' : 'none')};
`;
