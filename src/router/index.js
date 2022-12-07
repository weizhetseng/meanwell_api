import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: '/ForgotPassword',
      name: 'ForgotPassword',
      component: () => import("../views/ForgotPasswordView.vue"),
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: '/SignUpSetPassword',
      name: 'SignUpSetPassword',
      component: () => import("../views/SignUpSetPasswordView.vue"),
    },
    {
      path: '/MemberCentre',
      name: 'MemberCentre',
      component: () => import("../views/MemberCentre.vue"),
    }
    ,
    {
      path: '/PersonalInformation',
      name: 'PersonalInformation',
      component: () => import("../views/PersonalInformation.vue"),
    }
    ,
    {
      path: '/MemberInformationEditing',
      name: 'MemberInformationEditing',
      component: () => import("../views/MemberInformationEditing.vue"),
    }
    ,
    {
      path: '/LoginSettings',
      name: 'LoginSettings',
      component: () => import("../views/LoginSettings.vue"),
    }
    ,
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: () => import("../views/ChangePassword.vue"),
    }
    ,
    {
      path: '/MembershipManagementMeasures',
      name: 'MembershipManagementMeasures',
      component: () => import("../views/MembershipManagementMeasures.vue"),
    }
    ,
    {
      path: '/ActivityListOngoing',
      name: 'ActivityListOngoing',
      component: () => import("../views/ActivityListOngoing.vue"),
    }
    ,
    {
      path: '/ActivityListOver',
      name: 'ActivityListOver',
      component: () => import("../views/ActivityListOver.vue"),
    }
    ,
    {
      path: '/ActivityListCancelled',
      name: 'ActivityListCancelled',
      component: () => import("../views/ActivityListCancelled.vue"),
    }
    ,
    {
      path: '/ActivitiesOngoing/:id',
      name: 'ActivitiesOngoing',
      component: () => import("../views/ActivitiesOngoing.vue"),
    }
    ,
    {
      path: '/ActivitiesOver/:id',
      name: 'ActivitiesOver',
      component: () => import("../views/ActivitiesOver.vue"),
    }
    ,
    {
      path: '/ActivitiesCancelled/:id',
      name: 'ActivitiesCancelled',
      component: () => import("../views/ActivitiesCancelled.vue"),
    }
    ,
    {
      path: '/EventTicketing',
      name: 'EventTicketing',
      component: () => import("../views/EventTicketing.vue"),
    }
    ,
    {
      path: '/CancelRegistration',
      name: 'CancelRegistration',
      component: () => import("../views/CancelRegistration.vue"),
    }
    ,
    {
      path: '/VotesTaken',
      name: 'VotesTaken',
      component: () => import("../views/VotesTaken.vue"),
    }
    ,
    {
      path: '/Course',
      name: 'Course',
      component: '',
      children: [
        {
          path: 'Meeting',
          name: 'Meeting',
          component: () => import("../views/Course_Meeting.vue"),
        },
        {
          path: 'Educate',
          name: 'Educate',
          component: () => import("../views/Course_Educate.vue"),
        },
        {
          path: 'Activity',
          name: 'Activity',
          component: () => import("../views/Course_Activity.vue"),
        },
        {
          path: 'CourseContent/:id',
          name: 'CourseContent',
          component: () => import("../views/CourseContent.vue"),
        }
      ]
    }    
    ,
    {
      path: '/Course/RegistrationForm',
      name: 'RegistrationForm',
      component: () => import("../views/RegistrationForm.vue"),
    }
    ,
    {
      path: '/Course/RegistrationForm_ForeignGuests',
      name: 'RegistrationFormForeignGuests',
      component: () => import("../views/RegistrationForm_ForeignGuests.vue"),
    }
    ,
    {
      path: '/Course/RegistrationFormNext',
      name: 'RegistrationFormNext',
      component: () => import("../views/RegistrationFormNext.vue"),
    }
    ,
    {
      path: '/ServiceContent',
      name: 'ServiceContent',
      component: () => import("../views/ServiceContent.vue"),
    }
    ,
    {
      path: '/MissionVision',
      name: 'MissionVision',
      component: () => import("../views/MissionVision.vue"),
    }
    ,
    {
      path: '/MembershipTermsofService',
      name: 'MembershipTermsofService',
      component: () => import("../views/MembershipTermsofService.vue"),
    }
    ,
    {
      path: '/Calendar',
      name: 'Calendar',
      component: () => import("../views/Calendar.vue"),
    }
    ,
    {
      path: '/CommonProblem',
      name: 'CommonProblem',
      component: () => import("../views/CommonProblem.vue"),
    }
    ,
    {
      path: '/Questionnaire',
      name: 'Questionnaire',
      component: () => import("../views/Questionnaire.vue"),
    }
  ]
})

export default router
