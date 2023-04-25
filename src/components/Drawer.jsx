import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {MdMenuOpen} from 'react-icons/md'
import RightNavBar from './RightNavBar';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const anchor="right"
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 450 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{"backgroundColor":"black"}}
    >
    <div className="ok" style={{"height":"100vh","overflowY":"scroll","borderLeft":"1px solid grey","backgroundColor":"hsla(0, 0%, 2%, 0.8)","boxShadow": "0 0 1px 1px hsla(0, 0%, 100%, 0.5 )"
}}>

      <RightNavBar/>
    </div>
    </Box>
  );

  return (
    <div >
    
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{         <MdMenuOpen className='right-draw-icon'/>
}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}