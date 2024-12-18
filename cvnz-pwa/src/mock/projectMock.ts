
import uuid from 'uuid/v1';
import moment from 'moment';
import { colors, Theme } from '@mui/material';
import mock from '../utils/mock';

mock.onGet('/api/projects').reply(200, {
  projects: [
    {
      id: uuid(),
      title: 'Mella Full Screen Slider',
      author: {
        name: 'Anje Keizer',
        avatar: '/images/avatars/avatar_5.png'
      },
      price: '12,500',
      currency: '$',
      type: 'Full-Time',
      location: 'Europe',
      members: 5,
      tags: [
        {
          text: 'Weeding',
          color: colors.red[600]
        }
      ],
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(24, 'minutes')
    },
    {
      id: uuid(),
      title: 'Dashboard Design',
      author: {
        name: 'Emilee Simchenko',
        avatar: '/images/avatars/avatar_9.png'
      },
      price: '15,750',
      currency: '$',
      type: 'Full-Time',
      location: 'Europe',
      members: 3,
      tags: [
        {
          text: 'Release',
          color: colors.grey[600]
        }
      ],
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(1, 'hour')
    },
    {
      id: uuid(),
      title: 'Ten80 Web Design',
      author: {
        name: 'Kwak Seong-Min',
        avatar: '/images/avatars/avatar_10.png'
      },
      price: '15,750',
      currency: '$',
      type: 'Full-Time',
      location: 'Europe',
      members: 8,
      tags: [
        {
          text: 'Monitor',
          color: colors.indigo[600]
        }
      ],
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(16, 'hour')
    },
    {
      id: uuid(),
      title: 'Neura e-commerce UI Kit',
      author: {
        name: 'Shen Zhi',
        avatar: '/images/avatars/avatar_11.png'
      },
      price: '12,500',
      currency: '$',
      type: 'Full-Time',
      location: 'Europe',
      members: 10,
      tags: [
        {
          text: 'Planting',
          color: colors.green[600]
        }
      ],
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(3, 'days')
    },
    {
      id: uuid(),
      title: 'Administrator Dashboard',
      author: {
        name: 'Cao Yu',
        avatar: '/images/avatars/avatar_3.png'
      },
      price: '15,750',
      currency: '$',
      type: 'Full-Time',
      location: 'Europe',
      members: 2,
      tags: [
        {
          text: 'Weeding',
          color: colors.red[600]
        },
        {
          text: 'Release',
          color: colors.grey[600]
        }
      ],
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(7, 'days')
    },
    {
      id: uuid(),
      title: 'Kalli UI Kit',
      author: {
        name: 'Anje Keizer',
        avatar: '/images/avatars/avatar_5.png'
      },
      price: '15,750',
      currency: '$',
      type: 'Full-Time',
      location: 'Europe',
      members: 12,
      tags: [
        {
          text: 'Planting',
          color: colors.green[600]
        }
      ],
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(8, 'days')
    }
  ]
});

mock.onGet('/api/projectDetails').reply(200, {
  projectDetails: [
    {
      projectId: 1,
      projectImage: '/images/covers/cover_1.png',
      projectName: 'Yellingbo Conservation Area',
      status: 'active',
      projectInfoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      projectType: 'ProjectType 1',
      address: 'Giles Road',
      city: 'Yellingbo',
      state: 'VIC',
      primaryContact: 'Justin Foster',
      phone: '04123222178',
      goals: [
        {
          goalName: 'goal11',
          goalUnit: ['Area(m2)'],
          goalAmount: '2000',
          goalStartTime: moment(),
          goalEndTime: moment().add(8, 'days')
        },
        {
          goalName: 'goal12',
          goalUnit: ['Area(m2)'],
          goalAmount: '2000',
          goalStartTime: moment(),
          goalEndTime: moment().add(8, 'days')
        }
      ],
      activities: [
        {
          id: 1,
          title: 'Mella Full Screen Slider',
          author: {
            name: 'Anje Keizer',
            avatar: '/images/avatars/avatar_5.png'
          },
          tags: [
            {
              text: 'Weeding',
              color: colors.red[600]
            }
          ],
          start_date: moment(),
          end_date: moment(),
          updated_at: moment().subtract(24, 'minutes')
        },
        {
          id: 2,
          title: 'Dashboard Design',
          author: {
            name: 'Emilee Simchenko',
            avatar: '/images/avatars/avatar_9.png'
          },
          tags: [
            {
              text: 'Release',
              color: colors.grey[600]
            }
          ],
          start_date: moment(),
          end_date: moment(),
          updated_at: moment().subtract(1, 'hour')
        }]
    },
    {
      projectId: 2,
      projectImage: '/images/covers/cover_2.jpg',
      projectName: 'East Warburton',
      status: 'active',
      projectInfoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      projectType: 'ProjectType 2',
      address: 'Giles Road',
      city: 'Yellingbo',
      state: 'VIC',
      primaryContact: 'Justin Foster',
      phone: '04123222178',
      goals: []
    },
    {
      projectId: 3,
      projectImage: '/images/covers/cover_2.jpg',
      projectName: 'Healsville',
      status: 'active',
      projectInfoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      projectType: 'ProjectType 3',
      address: 'Giles Road',
      city: 'Yellingbo',
      state: 'VIC',
      primaryContact: 'Justin Foster',
      phone: '04123222178',
      goals: []
    },
    {
      projectId: 1,
      projectImage: '/images/covers/cover_1.png',
      projectName: 'Yellingbo Conservation Area',
      status: 'onhold',
      projectInfoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      projectType: 'ProjectType 1',
      address: 'Giles Road',
      city: 'Yellingbo',
      state: 'VIC',
      primaryContact: 'Justin Foster',
      phone: '04123222178',
      goals: []
    },
    {
      projectId: 2,
      projectImage: '/images/covers/cover_2.jpg',
      projectName: 'East Warburton',
      status: 'onhold',
      projectInfoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      projectType: 'ProjectType 2',
      address: 'Giles Road',
      city: 'Yellingbo',
      state: 'VIC',
      primaryContact: 'Justin Foster',
      phone: '04123222178',
      goals: []
    },
    {
      projectId: 3,
      projectImage: '/images/covers/cover_2.jpg',
      projectName: 'Healsville',
      status: 'onhold',
      projectInfoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      projectType: 'ProjectType 3',
      address: 'Giles Road',
      city: 'Yellingbo',
      state: 'VIC',
      primaryContact: 'Justin Foster',
      phone: '04123222178',
      goals: []
    },
    {
      projectId: 1,
      projectImage: '/images/covers/cover_1.png',
      projectName: 'Yellingbo Conservation Area',
      status: 'archived',
      projectInfoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      projectType: 'ProjectType 1',
      address: 'Giles Road',
      city: 'Yellingbo',
      state: 'VIC',
      primaryContact: 'Justin Foster',
      phone: '04123222178',
      goals: []
    },
    {
      projectId: 2,
      projectImage: '/images/covers/cover_2.jpg',
      projectName: 'East Warburton',
      status: 'archived',
      projectInfoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      projectType: 'ProjectType 2',
      address: 'Giles Road',
      city: 'Yellingbo',
      state: 'VIC',
      primaryContact: 'Justin Foster',
      phone: '04123222178',
      goals: []
    },
    {
      projectId: 3,
      projectImage: '/images/covers/cover_2.jpg',
      projectName: 'Healsville',
      status: 'archived',
      projectInfoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      projectType: 'ProjectType 3',
      address: 'Giles Road',
      city: 'Yellingbo',
      state: 'VIC',
      primaryContact: 'Justin Foster',
      phone: '04123222178',
      goals: []
    }
  ]
});

mock.onGet('/api/goals').reply(200, {
  goals: [
    {
      id: 1,
      projectId: 1,
      goalName: 'goal1',
      goalUnit: ['Area(m2)'],
      goalAmount: 2000,
      goalStartTime: moment(),
      goalEndTime: moment().add(8, 'days')
    },
    {
      id: 2,
      projectId: 2,
      goalName: 'goal2',
      goalUnit: ['Area(m2)'],
      goalAmount: '2000',
      goalStartTime: moment(),
      goalEndTime: moment().add(8, 'days')
    },
    {
      id: 3,
      projectId: 3,
      goalName: 'goal3',
      goalUnit: ['Area(m2)'],
      goalAmount: '2000',
      goalStartTime: moment(),
      goalEndTime: moment().add(8, 'days')
    }
  ]
});
mock.onGet('/api/records').reply(200, {
  records: [
    {
      id: 1,
      projectId: 1,
      activityId: 1,
      createdDate: moment(),
      modifiedDate: moment(),
      meetingPoint: 'test meeting point1',
      notes: 'test meeting point notes',
      numberOfStaff: 10,
      staffHours: 60,
      numberOfVolunteers: 20,
      volunteersHours: 120,
      dataRecorded: [
        {
          id: 1,
          type: 'weeding',
          number: 100
        },
        {
          id: 2,
          type: 'planting',
          number: 100
        }
      ]
    },
    {
      id: 2,
      projectId: 2,
      activityId: 2,
      createdDate: moment(),
      modifiedDate: moment(),
      meetingPoint: 'test meeting point2',
      notes: 'test meeting point notes',
      numberOfStaff: 10,
      staffHours: 60,
      numberOfVolunteers: 20,
      volunteersHours: 120,
    }

  ]
});

mock.onGet('/api/records1').reply(200, {
  records: [
    {
      id: 1,
      projectId: 1,
      activityId: 1,
      createdDate: moment(),
      modifiedDate: moment(),
      meetingPoint: 'test meeting point',
      notes: 'test meeting point notes',
      numberOfStaff: 10,
      staffHours: 60,
      numberOfVolunteers: 20,
      volunteersHours: 120,
      staff: [
        {
          id: 1,
          Name: 'test staff 1',
          Email: 'teststaff1@gmail.com',
          IsAttending: true
        }
      ],
      volunteers: [
        {
          id: 1,
          Name: 'test volunteer 1',
          Email: 'testvolunteer1@gmail.com',
          IsAttending: true
        },
        {
          id: 2,
          Name: 'test volunteer 2',
          Email: 'testvolunteer2@gmail.com',
          IsAttending: true
        },
        {
          id: 3,
          Name: 'test volunteer 3',
          Email: 'testvolunteer3@gmail.com',
          IsAttending: true
        }
      ],
      data: [
        {
          id: 1,
          type: 'weeding',
          number: 100
        }
      ],
      risk: [
        {
          id: 1,
          type: 'site',
          description: 'test risk description',
          likelihood: 'low',
          severity: 'low',
          Actions: ['']

        }
      ],
    },
    {
      id: 2,
      projectId: 2,
      activityId: 2,
      createdDate: moment(),
      modifiedDate: moment(),
      meetingPoint: 'test meeting point',
      notes: 'test meeting point notes',
      numberOfStaff: 10,
      staffHours: 60,
      numberOfVolunteers: 20,
      volunteersHours: 120,
      staff: [
        {
          id: 1,
          Name: 'test staff 1',
          Email: 'teststaff1@gmail.com',
          IsAttending: true
        }
      ],
      volunteers: [
        {
          id: 1,
          Name: 'test volunteer 1',
          Email: 'testvolunteer1@gmail.com',
          IsAttending: true
        },
        {
          id: 2,
          Name: 'test volunteer 2',
          Email: 'testvolunteer2@gmail.com',
          IsAttending: true
        },
        {
          id: 3,
          Name: 'test volunteer 3',
          Email: 'testvolunteer3@gmail.com',
          IsAttending: true
        }
      ],
      data: [
        {
          id: 1,
          type: 'weeding',
          number: 100
        }
      ],
      risk: [
        {
          id: 1,
          type: 'site',
          description: 'test risk description',
          likelihood: 'low',
          severity: 'low',
          Actions: ['']

        }
      ],
    }
  ]
});

mock.onGet('/api/activities').reply(200, {
  activities: [
    {
      id: 1,
      projectId: 1,
      title: 'Mella Full Screen Slider',
      author: {
        name: 'Anje Keizer',
        avatar: '/images/avatars/avatar_5.png'
      },
      tags: [
        {
          text: 'Weeding',
          color: colors.red[600]
        }
      ],
      start_date: moment(),
      end_date: moment().add(4, 'hours'),
      updated_at: moment().subtract(24, 'minutes'),
      address: 'address line1',
      address2: 'address line 2',
      city: 'example - melbourne',
      state: 'example-vic',
      coordinates: '1.2345, 2.3456',
      notes: 'test notes',
      activityTypes: ['weeding', 'planting'],
      isSafteyChecked: true
    },
    {
      id: 2,
      projectId: 2,
      title: 'Dashboard Design',
      author: {
        name: 'Emilee Simchenko',
        avatar: '/images/avatars/avatar_9.png'
      },
      tags: [
        {
          text: 'Release',
          color: colors.grey[600]
        }
      ],
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(1, 'hour'),
      address: 'address line1',
      address2: 'address line 2',
      city: 'example - melbourne',
      state: 'example-vic',
      coordinates: '1.2345, 2.3456'
    },
    {
      id: 3,
      title: 'Ten80 Web Design',
      author: {
        name: 'Kwak Seong-Min',
        avatar: '/images/avatars/avatar_10.png'
      },
      tags: [
        {
          text: 'Monitor',
          color: colors.indigo[600]
        }
      ],
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(16, 'hour')
    },
    {
      id: 4,
      title: 'Neura e-commerce UI Kit',
      author: {
        name: 'Shen Zhi',
        avatar: '/images/avatars/avatar_11.png'
      },
      tags: [
        {
          text: 'Planting',
          color: colors.green[600]
        }
      ],
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(3, 'days')
    },
    {
      id: 5,
      title: 'Administrator Dashboard',
      author: {
        name: 'Cao Yu',
        avatar: '/images/avatars/avatar_3.png'
      },
      tags: [
        {
          text: 'Weeding',
          color: colors.red[600]
        },
        {
          text: 'Release',
          color: colors.grey[600]
        }
      ],
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(7, 'days')
    },
    {
      id: 6,
      title: 'Kalli UI Kit',
      author: {
        name: 'Anje Keizer',
        avatar: '/images/avatars/avatar_5.png'
      },
      tags: [
        {
          text: 'Planting',
          color: colors.green[600]
        }
      ],
      start_date: moment(),
      end_date: moment(),
      updated_at: moment().subtract(8, 'days')
    }
  ]
});

mock.onGet('/api/projects/1').reply(200, {
  project: {
    title: 'Develop a PDF Export App',
    author: {
      name: 'Emilee Simchenko',
      avatar: '/images/avatars/avatar_9.png',
      bio: 'We build beautiful functional themes for web professionals'
    },
    brief: `
#### TL;DR

The primary aim of the product is to convert survery responses into PDF reports, these reports are generated on to what we call templates. This product is designer to work with 3rd party survery providers. The first MVP will integrate with TypeForm, because the's no direct way to convert results to PDF from the form people create in TypeForm and then ask users to fill out.

#### Background information

Design files are attachedin the files tab.

Develop the web app screens for our product called "PDFace". Please look at the wireframes, system activity workflow and read the section above to understand what we're trying to archive.

There's not many screens we need designed, but there will be modals and various other system triggered evenets that will need to be considered.

The project has benn created in Sketch so let me know if there are any problmes opening this project and I'll try to convert into a usable file.

I have attached a chat with our users most used devices.

#### Goals:
  - Maintainable Code
  - Easy UX
  - Readable Code
  - No Redux
    `,
    price: '12,500',
    currency: 'USD',
    tags: [
      {
        text: 'Monitor',
        color: colors.indigo[600]
      }
    ],
    members: [
      {
        id: uuid(),
        name: 'Ekaterina Tankova',
        avatar: '/images/avatars/avatar_2.png',
        bio: 'Front End Developer'
      },
      {
        id: uuid(),
        name: 'Cao Yu',
        avatar: '/images/avatars/avatar_3.png',
        bio: 'UX Designer'
      },
      {
        id: uuid(),
        name: 'Anje Keizer',
        avatar: '/images/avatars/avatar_5.png',
        bio: 'Copyright'
      }
    ],

    files: [
      {
        id: uuid(),
        name: 'example-project1.jpg',
        url: '/images/projects/project_2.jpg',
        mimeType: 'image/png',
        size: 1024 * 1024 * 3
      },
      {
        id: uuid(),
        name: 'docs.zip',
        url: '#',
        mimeType: 'application/zip',
        size: 1024 * 1024 * 25
      },
      {
        id: uuid(),
        name: 'example-project2.jpg',
        url: '/images/projects/project_1.jpg',
        mimeType: 'image/png',
        size: 1024 * 1024 * 2
      }
    ],
    activities: [
      {
        id: uuid(),
        subject: 'Project owner',
        subject_type: 'user',
        action_type: 'upload_file',
        action_desc: 'has uploaded a new file',
        created_at: moment().subtract(23, 'minutes')
      },
      {
        id: uuid(),
        subject: 'Adrian Stefan',
        subject_type: 'user',
        action_type: 'join_team',
        action_desc: 'joined team as a Front-End Developer',
        created_at: moment().subtract(2, 'hours')
      },
      {
        id: uuid(),
        subject: 'Alexandru Robert',
        action_type: 'join_team',
        action_desc: 'joined team as a Full Stack Developer',
        created_at: moment().subtract(9, 'hours')
      },
      {
        id: uuid(),
        subject: 'Project owner',
        subject_type: 'user',
        action_type: 'price_change',
        action_desc: 'raised the project budget',
        created_at: moment().subtract(2, 'days')
      },
      {
        id: uuid(),
        subject: 'Contest',
        subject_type: 'project',
        action_type: 'contest_created',
        action_desc: 'created',
        created_at: moment().subtract(4, 'days')
      }
    ],
    subscribers: [
      {
        id: uuid(),
        name: 'Yellingbo Conservation Area',
        avatar: '/images/avatars/avatar_2.png',
        cover: '/images/covers/cover_1.png',
        common_connections: 12,
        status: 'active',
        labels: ['Planting', 'Weeding', 'Monitor'],
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: uuid(),
        name: 'East Warburton',
        avatar: '/images/avatars/avatar_3.png',
        cover: '/images/covers/cover_2.jpg',
        common_connections: 5,
        status: 'active',
        labels: ['Planting', 'Weeding', 'Monitor'],
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: uuid(),
        name: 'Healsville',
        avatar: '/images/avatars/avatar_6.png',
        cover: '/images/covers/cover_2.jpg',
        common_connections: 17,
        status: 'active',
        labels: ['Planting', 'Weeding', 'Monitor'],
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: uuid(),
        name: 'Yellingbo Conservation Area_',
        avatar: '/images/avatars/avatar_2.png',
        cover: '/images/covers/cover_1.png',
        common_connections: 12,
        status: 'onhold',
        labels: ['Planting', 'Weeding', 'Monitor'],
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: uuid(),
        name: 'East Warburton_',
        avatar: '/images/avatars/avatar_3.png',
        cover: '/images/covers/cover_2.jpg',
        common_connections: 5,
        status: 'onhold',
        labels: ['Planting', 'Weeding', 'Monitor'],
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: uuid(),
        name: 'Healsville_',
        avatar: '/images/avatars/avatar_6.png',
        cover: '/images/covers/cover_2.jpg',
        common_connections: 17,
        status: 'onhold',
        labels: ['Planting', 'Weeding', 'Monitor'],
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: uuid(),
        name: 'Yellingbo Conservation Area_archived',
        avatar: '/images/avatars/avatar_2.png',
        cover: '/images/covers/cover_1.png',
        common_connections: 12,
        status: 'archived',
        labels: ['Planting', 'Weeding', 'Monitor'],
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: uuid(),
        name: 'East Warburton_archived',
        avatar: '/images/avatars/avatar_3.png',
        cover: '/images/covers/cover_2.jpg',
        common_connections: 5,
        status: 'archived',
        labels: ['Planting', 'Weeding', 'Monitor'],
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: uuid(),
        name: 'Healsville_archived',
        avatar: '/images/avatars/avatar_6.png',
        cover: '/images/covers/cover_2.jpg',
        common_connections: 17,
        status: 'archived',
        labels: ['Planting', 'Weeding', 'Monitor'],
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    ],
    deadline: moment().add(7, 'days'),
    updated_at: moment().subtract(23, 'minutes')
  }
});
