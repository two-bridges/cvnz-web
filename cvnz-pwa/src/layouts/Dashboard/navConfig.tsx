
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
export interface NavItemType {
  key: number;
  orgAdminOnly: boolean;
  title?: string;
  items?: NavItemType[];
  icon?: any;
  href?: string;
  label?: string;

};
// every item needs a unique key (href is not necessarily unique, so we'll use an auto-increment)
let rootNavItem: NavItemType = {
  key: getItemKey(),
  orgAdminOnly: false,
  items: [
    //As per the design
    {
      title: 'Projects',
      href: '/projects',
      key: getItemKey(),
      icon: FolderIcon,
      orgAdminOnly: true,
      items: [
        {
          title: 'Add',
          href: '/project/new',
          key: getItemKey(),
          orgAdminOnly: true,
        },
        {
          title: 'Search',
          href: '/:organisation/projects',
          key: getItemKey(),
          orgAdminOnly: true,
        },
      ]
    },
    {
      title: 'Field Notes',
      href: '/fieldNotes',
      icon: EventNoteIcon,
      key: getItemKey(),
      orgAdminOnly: false,
      items: [
        {
          title: 'Add',
          href: '/:organisation/project/new/fieldNote/new',
          key: getItemKey(),
          orgAdminOnly: false,
        },
        {
          title: 'Search',
          href: '/organisation/:organisation/fieldNoteLists',
          key: getItemKey(),
          orgAdminOnly: false,
        },

      ]
    },
    {
      title: 'Reports',
      href: '/organisation/:organisation/reports',
      icon: BarChartIcon,
      key: getItemKey(),
      orgAdminOnly: true,
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: PersonIcon,
      key: getItemKey(),
      orgAdminOnly: false,
      items: [
        {
          title: 'Admin Contact',
          href: '/profile/:organisation/details',
          key: getItemKey(),
          orgAdminOnly: false,
        },
        {
          title: 'Users',
          href: '/profile/:organisation/users',
          key: getItemKey(),
          orgAdminOnly: true,
        },
        {
          title: 'Goals',
          href: '/profile/:organisation/goals',
          key: getItemKey(),
          orgAdminOnly: true,
        },
        // {
        //   title: 'Scripts',
        //   href: '/scripts',
        //   key: getItemKey(),
        //   orgAdminOnly: true,
        // },
        {
          // DG: todo - add a new attribute here, such as, 'fnGuard'.  
          // It is a callback that check if the navigation is allowed
          //    * return true to navigate
          //    * return false to cancel navigation
          title: 'Sign Out',
          href: '/auth/:organisation/login',
          key: getItemKey(),
          orgAdminOnly: false,
        },
      ]
    },
  ]
};
export default rootNavItem;
