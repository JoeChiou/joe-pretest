import React, { useState } from "react"
import { Box, Button, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/styles"
import styled from "@emotion/styled";
import { Add, Remove } from '@mui/icons-material';

const NumberButton = styled(Button)({
  height: '48px',
  width: '48px',
  fontSize: '16px',
  padding: 0,
  minHeight: 0,
  minWidth: 0,
})

export const CustomInputNumber = ({
  min = 0, max = 100, step = 1, value = 0,
  name = '',
  disabled = false,
  onChange = () => { },
  onBlur = () => { }
}) => {
  const classes = useStyle();
  const [textValue, setTextValue] = useState(value)
  const [tid, setTid] = useState();

  const onButtonClick = (type) => {
    switch (type) {
      case '+':
        if (!!max && textValue > max) return;
        setTextValue(textValue + 1);
        return;
      case '-':
        if (!!min && textValue < min) return;
        setTextValue(textValue - 1);
        return;
    }
  }

  const onButtonDown = (type) => {
    if (type === '+')
      setTid(setInterval(() => {
        setTextValue((preValue) => preValue + step)
      }, [200]))

    if (type === '-')
      setTid(setInterval(() => {
        setTextValue((preValue) => preValue - step)
      }, [200]))
  }

  const onButtonUp = () => {
    clearInterval(tid);
  }

  return (
    <Box className={classes.box} name={name} >
      <NumberButton
        variant='outlined'
        disabled={(!!min && textValue <= min) || disabled}
        onClick={() => onButtonClick('-')}
        onMouseDown={() => onButtonDown('-')}
        onMouseUp={() => onButtonUp()}>
        <Remove />
      </NumberButton>
      <TextField
        disabled={disabled}
        type={'number'}
        className={classes.textField}
        value={textValue}
        onChange={(event) => setTextValue(parseInt(event.currentTarget.value))} />
      <NumberButton
        variant='outlined'
        disabled={(!!max && textValue >= max) || disabled}
        onClick={() => onButtonClick('+')}
        onMouseDown={() => onButtonDown('+')}
        onMouseUp={() => onButtonUp()}>
        <Add />
      </NumberButton>
    </Box>
  )
};

const useStyle = makeStyles({
  box: {
    display: 'flex',
    maxWidth: 'fit-content',
    border: '2px dashed grey',
    padding: '10px',
    gap: '8px',
  },
  textField: {
    '& ::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& ::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& .MuiOutlinedInput-input': {
      height: '48px',
      width: '48px',
      padding: 0,
      textAlign: 'center'
    },
    fontSize: '16px',
    minWidth: '0',
    minHeight: '0',
  },
  buttons: {
    '&.MuiButton-outlined': {
      display: 'inline-block',
      height: '48px',
      width: '48px',
      fontSize: '16px',
      padding: 0,
      minHeight: 0,
      minWidth: 0,
    }
  }
})