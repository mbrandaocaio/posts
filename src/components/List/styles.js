import { createStyles, makeStyles } from "@material-ui/core";
import styled from "styled-components";



export const Container = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;

 width: 1170px;
`;

export const Table = styled.table`
  width: 100%;
  margin-bottom: 40px;
`;


export const TR = styled.tr`
  border:1px solid gray;
`;

export const TD = styled.td`
  border:1px solid gray;
  width: 30px;
  text-align: center;


`;
export const TDBTN = styled.td`
  border:1px solid gray;
 // width:330px;
`;

export const Button = styled.button`
    border: 1px solid ${props => props.color};
    background-color: ${props => props.color};
    color: #fff;
    font-size: 20px;
    padding: 10px 10px;
    text-decoration: none;
    margin: 10px 10px;
    border-radius: 10px;

    &:hover{
        background-color: ${props => props.color === 'blue' ? '#0329FF' : props.color === 'green' ? '#2FAC00' : '#FF3503'};
    }
`;



export const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 800,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

