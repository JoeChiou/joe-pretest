import React, { useEffect, useRef, useState } from "react"
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
});

export const CustomInputNumber = ({
  min = 0, max = 100, step = 1, value = 0,
  name = '',
  disabled = false,
  onChange,
  onBlur
}) => {
  const classes = useStyle();
  const [textValue, setTextValue] = useState(value);
  const inputRef = useRef(null);

  const textValueHandle = (type) => {
    if (type === '+') {
      setTextValue((preValue) => max != undefined && preValue >= max ? preValue : preValue + step);
    }
    if (type === '-') {
      setTextValue((preValue) => min < step && preValue <= min ? min : preValue - step);
    }
  };
  const onButtonClick = (type) => {
    textValueHandle(type);
  };
  const onButtonDown = (type) => {
    clearTimer();
    setInterval(() => {
      textValueHandle(type)
    }, [100])
  };
  const clearTimer = () => {
    for (var i = 1; i < 99999; i++)
      clearInterval(i);
  };
  const onChangeInput = (text) => {
    if (text === '') {
      setTextValue(0);
      return;
    }
    const number = parseInt(text);
    if (max != undefined && number >= max)
      setTextValue(max);
    else if (min != undefined && number <= min)
      setTextValue(min);
    else
      setTextValue(number);
  };

  useEffect(() => {
    if (textValue === min || textValue === max)
      clearTimer();
    inputRef.current.dispatchEvent(
      new Event("input", {
        detail: {
          newValue: textValue,
        },
        bubbles: true,
        cancelable: true,
      })
    );
  }, [textValue]);

  return (
    <Box className={classes.box} onMouseLeave={() => {
      inputRef.current.focus();
      inputRef.current.blur();
    }}>
      <NumberButton
        variant='outlined'
        disabled={(min != undefined && textValue <= min) || disabled}
        onClick={() => onButtonClick('-')}
        onMouseDown={() => onButtonDown('-')}
        onMouseUp={() => clearTimer()}
        onMouseLeave={() => clearTimer()}>
        <Remove />
      </NumberButton>
      <TextField
        name={name}
        disabled={(max != undefined && textValue >= max && min != undefined && textValue <= min) || disabled}

        className={classes.textField}
        value={textValue}
        inputProps={{
          ref: inputRef,
          type: 'number',
          onInput: e => parseInt(e.currentTarget.value) <= max && parseInt(e.currentTarget.value) >= min && onChange(e),
          onBlur: e => parseInt(e.currentTarget.value) <= max && parseInt(e.currentTarget.value) >= min && onBlur(e)
        }}
        onChange={e => onChangeInput(e.currentTarget.value)} />
      <NumberButton
        variant='outlined'
        disabled={(max != undefined && textValue >= max) || disabled}
        onClick={() => onButtonClick('+')}
        onMouseDown={() => onButtonDown('+')}
        onMouseUp={() => clearTimer()}
        onMouseLeave={() => clearTimer()}>
        <Add />
      </NumberButton>
    </Box >
  )
};

const useStyle = makeStyles({
  box: {
    display: 'flex',
    maxWidth: 'fit-content',
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