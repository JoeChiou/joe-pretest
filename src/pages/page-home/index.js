import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { CustomInputNumber, RoomAllocation } from '../../component';
import { makeStyles } from '@material-ui/styles';

const STRINGS = {
  NUMBERINPUT: 'CustomInputNumber',
  ROOMALLOCATION: 'RoomAllocation',
};

const GUEST = 10;
const ROOMS = 3;

export const PageHome = () => {
  const [tabValue, setTavValue] = useState(0);
  const classes = useStyle();

  const HomeTabs = () => (
    <Tabs value={tabValue} onChange={(e, nextValue) => setTavValue(nextValue)} centered>
      <Tab label={STRINGS['NUMBERINPUT']} value={0} className={classes.tab} />
      <Tab label={STRINGS['ROOMALLOCATION']} value={1} className={classes.tab} />
    </Tabs>
  );

  return (
    <Box>
      <HomeTabs />
      <Box className={classes.box} sx={{ display: tabValue === 0 ? 'flex' : 'none' }}>
        <CustomInputNumber
          // max={}
          // min={}
          // step={}
          name={'CustomInputNumber'}
          // disabled={}
          // value={}
          // onChange={e => { }} 
          // onBlur={e => { }} 
        />
      </Box>
      <Box className={classes.box} sx={{ display: tabValue === 1 ? 'flex' : 'none' }}>
        <RoomAllocation
          guest={GUEST}
          room={ROOMS}
          // onChange={value => { }}
        />
      </Box>
    </Box>
  )
};

const useStyle = makeStyles({
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px',
    width: '100%',
    height: '100%'
  },
  tab: {
    '&.MuiTab-root': {
      textTransform: 'none',
    }
  }
})