import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { CustomInputNumber, RoomAllocation } from '../../component';
import { makeStyles } from '@material-ui/styles';

const STRINGS = {
  NUMBERINPUT: 'CustomInputNumber',
  ROOMALLOCATION: 'RoomAllocation',
}

export const PageHome = () => {
  const [tabValue, setTavValue] = useState(1);
  const classes = useStyle();
  const HomeTabs = () => (
    <Tabs value={tabValue} onChange={(e, nextValue) => setTavValue(nextValue)} centered>
      <Tab label={STRINGS['NUMBERINPUT']} value={0} />
      <Tab label={STRINGS['ROOMALLOCATION']} value={1} />
    </Tabs>
  );

  return (
    <Box>
      <HomeTabs />
      <Box className={classes.box} sx={{ display: tabValue === 0 ? 'flex' : 'none' }}>
        <CustomInputNumber onChange={(e) => { }} onBlur={(e) => { }} name={'CustomInputNumber'} />
      </Box>
      <Box className={classes.box} sx={{ display: tabValue === 1 ? 'flex' : 'none' }}>
        <RoomAllocation guest={10} room={4} onChange={value => { }} />
      </Box>
    </Box>)
};

const useStyle = makeStyles({
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px',
    width: '100%',
    height: '100%'
  }
})