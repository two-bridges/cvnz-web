
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors, Theme } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';

var menuKey = 0;
function getItemKey() {
  return ++menuKey;
}
// every item needs a unique key (href is not necessarily unique, so we'll use an auto-increment)
var rootNavItem = {
  key: getItemKey(),
  items: [
    //As per the design
    {
      title: 'Organisations',
      href: '/admin/organisations',
      key: getItemKey(),
      icon: FolderIcon,
      items: [
        {
          title: 'Add',
          href: '/admin/organisation',
          key: getItemKey(),
        },
        {
          title: 'Search',
          href: '/admin/organisations',
          key: getItemKey(),
        },
      ]
    },
  ]
};
export default rootNavItem;
