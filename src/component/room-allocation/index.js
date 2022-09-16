import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Alert, Divider, ListItem, List, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { CustomInputNumber } from '../custom-number-input';

const STRINGS = {
  COMSTOMER_NUMER: '住客人數: [NUMBER]',
  ROOM_NUMBER: '[NUMBER] 房',
  UNASSIGNED: '尚未分配人數: [NUMBER] 人',
  ROOM: '房間: [NUMBER] 人',
  PER_PERSON: '人',
  ADULT: '大人',
  AGE_HINT: '年齡 20+',
  CHILDREN: '小孩'
}

const ROOM_CAN_LIVE = 4;

export const RoomAllocation = ({ guest, room, onChange }) => {
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

  useEffect(() => {
    let assignedPeople = 0;
    rooms.forEach((room) => assignedPeople += Object.values(room).reduce((a, b) => a + b))
    setAssigned(assignedPeople)
    onChange(assignedPeople)
  }, [rooms])
  return (
    <Box className={classes.container} >
      <Typography variant='h6'>
        {STRINGS['COMSTOMER_NUMER'].replace('[NUMBER]', guest)}
        &ensp;/&ensp;
        {STRINGS['ROOM_NUMBER'].replace('[NUMBER]', room)}
      </Typography>
      <Box visibility={unassigned > 0 ? 'visible' : 'hidden'}>
        <Alert severity="info">
          {unassigned > 0 ? STRINGS['UNASSIGNED'].replace('[NUMBER]', unassigned) : ''}
        </Alert>
      </Box>
      <Box className={classes.list}>
        {
          rooms.map((room, index) => {
            const total = Object.values(room).reduce((a, b) => a + b);
            //total <=4 && total <= unassigned
            const adultMax = (() => {
              if (unassigned >= 0 && unassigned >= ROOM_CAN_LIVE)
                return ROOM_CAN_LIVE - room.child;
              if (unassigned >= 0 && unassigned < ROOM_CAN_LIVE)
                //the number unassigned+room.adult-total;
                return unassigned + room.adult ;
            })();
            const childMax = (() => { })();
            return (
              <Box key={index} className={classes.listItem} >
                <Typography variant='subtitle1'>{STRINGS['ROOM'].replace('[NUMBER]', total)}</Typography>
                <Box className={classes.gridContainer}>
                  <Grid container>
                    <Grid item md={6}>
                      <Typography variant='subtitle2' >{STRINGS['ADULT']}</Typography>
                      <Typography variant='caption'>{STRINGS['AGE_HINT']}</Typography>
                    </Grid>
                    <Grid item md={6} className={classes.inputGrid}>
                      <CustomInputNumber
                        name={'room' + index}
                        value={room.adult}
                        min={1}
                        max={adultMax}
                        disabled={isDisableInput}
                        onChange={(e) => setChanges(room, index, 'adult', e.target.value)}
                        onBlur={(e) => setChanges(room, index, 'adult', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={6}>
                      <Typography>{STRINGS['CHILDREN']}</Typography>
                    </Grid>
                    <Grid item md={6} className={classes.inputGrid}>
                      <CustomInputNumber
                        name={'room' + index}
                        value={room.child}
                        max={childMax}
                        disabled={isDisableInput}
                        onChange={(e) => setChanges(room, index, 'child', e.target.value)}
                        onBlur={(e) => setChanges(room, index, 'child', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>)
          }
          )
        }
      </Box>
    </Box >
  )
};

const useStyle = makeStyles({
  container: {
    minWidth: '50%'
  },
  list: {
    display: 'flex',
    padding: '16px 0 16px',
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
  inputGrid: {
    display: 'flex',
    justifyContent: 'end'
  },
  listAdults: {
    display: 'flex',
    justifyContent: 'space-between',
  }
})