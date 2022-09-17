import React, { useState, useEffect } from 'react';
import { Box, Typography, Alert, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { CustomInputNumber } from '../custom-number-input';

const STRINGS = {
  COMSTOMER_NUMER: '住客人數: [NUMBER] 人',
  ROOM_NUMBER: '[NUMBER] 房',
  UNASSIGNED: '尚未分配人數: [NUMBER] 人',
  ROOM: '房間: [NUMBER] 人',
  ADULT: '大人',
  AGE_HINT: '年齡 20+',
  CHILDREN: '小孩'
}

const ROOM_CAN_LIVE = 4;

export const RoomAllocation = ({ guest, room, onChange = (e) => { } }) => {
  const classes = useStyle();
  const [assigned, setAssigned] = useState(guest - room);
  const [rooms, setRooms] = useState(new Array(room).fill({ adult: 1, child: 0 }));
  const unassigned = guest - assigned;
  const isDisableInput = room === guest;

  const setChanges = (room, index, key, changes) => {
    if (!key) return;
    let nextRoom = { ...room };
    let nextRooms = [...rooms];
    nextRoom[key] = parseInt(changes);
    nextRooms.splice(index, 1, nextRoom);
    setRooms(nextRooms);
  }

  const getRoomTotal = (room) => Object.values(room).reduce((a, b) => a + b)

  const getMax = (room, type) => {
    if (type != 'adult' && type != 'child') return;
    const total = getRoomTotal(room);
    switch (type) {
      case 'adult':
        if (unassigned + total >= ROOM_CAN_LIVE)
          return ROOM_CAN_LIVE - room.child;
        else if (unassigned < ROOM_CAN_LIVE)
          return unassigned + room.adult;
        else if (total >= ROOM_CAN_LIVE)
          return room.adult;
      case 'child':
        if (unassigned + total >= ROOM_CAN_LIVE)
          return ROOM_CAN_LIVE - room.adult;
        else if (unassigned < ROOM_CAN_LIVE)
          return unassigned + room.child;
        else if (total >= ROOM_CAN_LIVE)
          return room.child;
    }
  }

  useEffect(() => {
    let assignedPeople = 0;
    rooms.forEach((room) => assignedPeople += getRoomTotal(room))
    setAssigned(assignedPeople)
    onChange(assignedPeople)
  }, [...rooms])

  return (
    <Box className={classes.container} >
      <Typography variant='h6'>
        {STRINGS['COMSTOMER_NUMER'].replace('[NUMBER]', guest)}
        &ensp;{'/'}&ensp;
        {STRINGS['ROOM_NUMBER'].replace('[NUMBER]', room)}
      </Typography>
      <Box visibility={unassigned > 0 ? 'visible' : 'hidden'}>
        <Alert severity="info">
          {unassigned > 0 ? STRINGS['UNASSIGNED'].replace('[NUMBER]', unassigned) : ''}
        </Alert>
      </Box>
      <Box className={classes.list}>
        {
          rooms.map((room, index) =>
            <Box key={index} className={classes.listItem}>
              <Typography variant='h6'>{STRINGS['ROOM'].replace('[NUMBER]', getRoomTotal(room))}</Typography>
              <Box className={classes.gridContainer}>
                <Grid container>
                  <Grid item xs={6} sm={6} md={6} >
                    <Typography variant='subtitle1' >{STRINGS['ADULT']}</Typography>
                    <Typography variant='caption' className={classes.ageHint}>{STRINGS['AGE_HINT']}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} className={classes.inputGrid}>
                    <CustomInputNumber
                      name={'room' + index + 'adult'}
                      value={room.adult}
                      min={1}
                      max={getMax(room, 'adult')}
                      disabled={isDisableInput}
                      onChange={(e) => setChanges(room, index, 'adult', e.target.value)}
                      onBlur={(e) => setChanges(room, index, 'adult', e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} sm={6} md={6} >
                    <Typography variant='subtitle1'>{STRINGS['CHILDREN']}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} className={classes.inputGrid}>
                    <CustomInputNumber
                      name={'room' + index + 'child'}
                      value={room.child}
                      max={getMax(room, 'child')}
                      disabled={isDisableInput}
                      onChange={(e) => setChanges(room, index, 'child', e.target.value)}
                      onBlur={(e) => setChanges(room, index, 'child', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
      </Box>
    </Box >
  )
};

const useStyle = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '50%',
    gap: '16px'
  },
  list: {
    display: 'flex',
    padding: '0 0 16px',
    flexDirection: 'column',
    gap: '16px'
  },
  listItem: {
    position: 'relative',
    rowGap: '16px',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: '2.5%',
      bottom: '-8px',
      height: '1px',
      width: '95%',
      borderBottom: '1px solid #F5F5F5'
    },
    '&:last-child': {
      borderBottom: 'none',
      '&::after': { borderBottom: 'none' }
    },
  },
  gridContainer: {
    gap: '16px',
    display: 'flex',
    flexDirection: 'column'
  },
  ageHint: {
    color: '#a5a5a5'
  },
  inputGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  listAdults: {
    display: 'flex',
    justifyContent: 'space-between',
  }
})