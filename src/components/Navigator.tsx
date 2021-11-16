import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { PageContent } from './PageContent';
import { useMainPageStore } from '../state/MainPageStore';



const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const categories = [
    {
      id: 'Build',
      children: [
        {
          id: 'DOL Models',
          icon: <BackupTableIcon />,
          pageContent: PageContent.DOL_MODEL_PAGE,
        },
        { id: 'Data Sources', icon: <DnsRoundedIcon />,
          pageContent: PageContent.DATA_SOURCES_PAGE},
        { id: 'Queries', icon: <QueryStatsIcon /> },
      ],
    },
    {
      id: 'Quality',
      children: [
        { id: 'Analytics', icon: <SettingsIcon /> },
        { id: 'Performance', icon: <TimerIcon /> },
        { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
      ],
    },
  ];

  const { ...other } = props;
  const [currIndex, setCurrIndex] = React.useState([0,0]);

  const setContent = useMainPageStore(state => state.setContent);

  const handleItemClick = (catIndex: number, childIndex: number) => {
    console.log(`Settings stuff: ${catIndex} ${childIndex}`);

    setCurrIndex([catIndex, childIndex]);

    const newObj = categories[catIndex].children[childIndex];

    if (newObj.pageContent) {
      setContent(newObj.pageContent);
    }
  }

  const checkIfActive = (catIndex: number, childIndex: number) => {
    return catIndex === currIndex[0] && childIndex === currIndex[1];
  }

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          ScryingEngine
        </ListItem>
        {categories.map(({ id, children }, catIndex) => (
          <Box key={id} >
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon }, childIndex) => (
              <ListItem disablePadding key={childId} onClick={() => handleItemClick(catIndex, childIndex)}>
                <ListItemButton selected={checkIfActive(catIndex, childIndex)} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}