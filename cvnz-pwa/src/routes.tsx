
import React, { lazy } from 'react';

import AuthLayout from './layouts/Auth';
import DashboardLayout from './layouts/Dashboard';
import ErrorLayout from './layouts/Error';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';
import AdminDashboard from './layouts/AdminDashboard';
export var routeConfig: RouteConfig[] = [

  // auth (login)
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/admin/login',
        exact: true,
        component: lazy(() => import('./customviews/Admin/AdminLogin'))
      },
      // todo: make this a org selection page.  ie. users can come to one commnon login page and then find the role they want...
      // {
      //   path: '/auth/login',
      //   exact: true,
      //   component: lazy(() => import('./views/Login'))
      // },
      {
        path: '/auth/:organisation/login',
        exact: true,
        component: lazy(() => import('./views/Login'))
      },
      {
        path: '/auth/:organisation/reset',
        exact: true,
        component: lazy(() => import('./views/PasswordReset'))
      },
      // {
      //   path: '/auth/:organisation/register',
      //   exact: true,
      //   component: lazy(() => import('./views/Register'))
      // },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  // admin
  {
    path: '/admin',
    component: AdminDashboard,
    routes: [
      {
        path: '/admin/organisation',
        exact: true,
        component: lazy(() => import('./customviews/Admin/Organisation'))
      },
      {
        path: '/admin/organisations',
        exact: true,
        component: lazy(() => import('./customviews/Admin/Organisations'))
      },
      {
        path: '/admin/organisation/:orgId',
        exact: true,
        component: lazy(() => import('./customviews/Admin/Organisation'))
      },
      {
        path: '/admin/organisation/:orgId/users',
        exact: true,
        component: lazy(() => import('./customviews/Admin/Organisations/OrganisationUserList'))
      },
      // {
      //   path: '/admin/user',
      //   exact: true,
      //   component: lazy(() => import('./customviews/Admin/User'))
      // },
      // {
      //   path: '/admin/users',
      //   exact: true,
      //   component: lazy(() => import('./customviews/Admin/Users'))
      // },
      // {
      //   path: '/admin/user/:userId',
      //   exact: true,
      //   component: lazy(() => import('./customviews/Admin/User'))
      // },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  // errors
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('./views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('./views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('./views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  // organisation
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/scripts',
        exact: true,
        component: lazy(() => import('./customviews/Scripts/index'))
      },
      {
        path: '/:organisation/projects',
        exact: true,
        component: lazy(() => import('./customviews/Projects/ProjectsPage')),
      },
      {
        path: '/:organisation/project/new/isSave=true',
        exact: true,
        component: lazy(() => import('./customviews/Projects/Create'))
      },
      {
        path: '/project/new',
        exact: true,
        component: lazy(() => import('./customviews/Projects/Create'))
      },
      {
        path: '/:organisation/project/:id',
        exact: true,
        component: lazy(() => import('./customviews/Projects/Create'))
      },
      // {
      //   path: '/goals',
      //   exact: true,
      //   component: lazy(() => import('./customviews/Projects/ProjectGoals/Goals'))
      // },
      {
        path: '/activities',
        exact: true,
        component: lazy(() => import('./customviews/Activities'))
      },
      {
        path: '/activities/create',
        exact: true,
        component: lazy(() => import('./customviews/Activities/ActivityCreate'))
      },
      {
        path: '/activitymanage/:id',
        exact: true,
        component: lazy(() => import('./customviews/Activities/ActivityCreate'))
      },
      {
        path: '/activities/create/:id',
        exact: true,
        component: lazy(() => import('./customviews/Activities/ActivityCreate'))
      },
      {
        path: '/activities/createForProject/:projectId',
        exact: true,
        component: lazy(() => import('./customviews/Activities/ActivityCreate'))
      },
      {
        path: '/organisation/:organisation/fieldNoteLists',
        exact: true,
        component: lazy(() => import('./customviews/FieldNotes/Components/FieldNoteList/FieldNotesList'))

      },
      {
        path: '/record/create',
        exact: true,
        component: lazy(() => import('./customviews/Record/RecordCreate'))
      },
      {
        path: '/record/:id',
        exact: true,
        component: lazy(() => import('./customviews/Record/RecordCreate'))
      },
      {
        path: '/organisation/:organisation/reports',
        exact: true,
        component: lazy(() => import('./customviews/OrganisationReport/index'))
      },

      {
        path: '/profile/:orgId/details',
        exact: true,
        component: lazy(() => import('./customviews/Profile/General'))
      },
      {
        path: '/profile/:orgId/goals',
        exact: true,
        component: lazy(() => import('./customviews/Profile/General/goals/OrganisationGoals'))
      },
      {
        path: '/profile/:orgId/users',
        exact: true,
        component: lazy(() => import('./customviews/Admin/Organisations/OrganisationUserList'))
      },
      {
        path: '/organisation',
        exact: true,
        component: lazy(() => import('./customviews/Organisations/index'))
      },
      // {
      //   path: '/newUser',
      //   exact: true,
      //   component: lazy(() => import('./customviews/AddUser/index'))
      // },
      {
        path: '/:organisation/project/:projectId/fieldNote/:fieldNoteId',
        exact: true,
        component: lazy(() => import('./customviews/FieldNotes/Stepper/index'))
      },
    ]
  }
];

export default routeConfig;
