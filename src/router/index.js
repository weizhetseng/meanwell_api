import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Index.vue'
import { LoginOut } from "../stores/stores"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        keepAlive: true,
        needLogin: false,
        mainBG: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/LoginView.vue"),
      meta: {
        keepAlive: true,
        needLogin: false,
        mainBG: true
      }
    },
    {
      path: '/ForgotPassword',
      name: 'ForgotPassword',
      component: () => import("../views/ForgotPasswordView.vue"),
      meta: {
        keepAlive: true,
        needLogin: false,
        mainBG: true
      }
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import("../views/SignUpView.vue"),
      meta: {
        keepAlive: true,
        needLogin: false,
        mainBG: true
      }
    },
    {
      path: '/SignUpSetPassword',
      name: 'SignUpSetPassword',
      component: () => import("../views/SignUpSetPasswordView.vue"),
      meta: {
        keepAlive: true,
        needLogin: false,
        mainBG: true
      }
    },
    {
      path: '/MemberCenter',
      name: 'MemberCenter',
      component: () => import("../views/MemberCenter.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/PersonalInformation',
      name: 'PersonalInformation',
      component: () => import("../views/PersonalInformation.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/MemberInformationEditing',
      name: 'MemberInformationEditing',
      component: () => import("../views/MemberInformationEditing.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/LoginSettings',
      name: 'LoginSettings',
      component: () => import("../views/LoginSettings.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: () => import("../views/ChangePassword.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/MembershipManagementMeasures',
      name: 'MembershipManagementMeasures',
      component: () => import("../views/MembershipManagementMeasures.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/ActivityListOngoing',
      name: 'ActivityListOngoing',
      component: () => import("../views/ActivityListOngoing.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/ActivityListOver',
      name: 'ActivityListOver',
      component: () => import("../views/ActivityListOver.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/ActivityListCancelled',
      name: 'ActivityListCancelled',
      component: () => import("../views/ActivityListCancelled.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/ActivitiesOngoing/:id',
      name: 'ActivitiesOngoing',
      component: () => import("../views/ActivitiesOngoing.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/ActivitiesOver/:id',
      name: 'ActivitiesOver',
      component: () => import("../views/ActivitiesOver.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/ActivitiesCancelled/:id',
      name: 'ActivitiesCancelled',
      component: () => import("../views/ActivitiesCancelled.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/EventTicketing/:id',
      name: 'EventTicketing',
      component: () => import("../views/EventTicketing.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/CancelRegistration/:id',
      name: 'CancelRegistration',
      component: () => import("../views/CancelRegistration.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/VotesTaken',
      name: 'VotesTaken',
      component: () => import("../views/VotesTaken.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/Course',
      name: 'Course',
      component: '',
      children: [
        {
          path: 'Meeting/:id',
          name: 'Meeting',
          component: () => import("../views/Course_Meeting.vue"),
          meta: {
            keepAlive: true,
            needLogin: false,
            mainBG: false
          },
        },
        {
          path: 'Educate',
          name: 'Educate',
          component: () => import("../views/Course_Educate.vue"),
          meta: {
            keepAlive: true,
            needLogin: false,
            mainBG: false
          }
        },
        {
          path: 'Activity',
          name: 'Activity',
          component: () => import("../views/Course_Activity.vue"),
          meta: {
            keepAlive: true,
            needLogin: false,
            mainBG: false
          }
        },
        {
          path: 'CourseContent/:id',
          name: 'CourseContent',
          component: () => import("../views/CourseContent.vue"),
          meta: {
            keepAlive: true,
            needLogin: false,
            mainBG: false
          }
        },
        {
          path: 'RegistrationForm/:id',
          name: 'RegistrationForm',
          component: () => import("../views/RegistrationForm.vue"),
          meta: {
            keepAlive: true,
            needLogin: true,
            mainBG: true
          }
        }
        ,
        {
          path: 'RegistrationFormNext/:id',
          name: 'RegistrationFormNext',
          component: () => import("../views/RegistrationFormNext.vue"),
          meta: {
            keepAlive: true,
            needLogin: true,
            mainBG: true
          }
        }

      ]
    }
    ,

    ,
    {
      path: '/Course/RegistrationForm_ForeignGuests',
      name: 'RegistrationFormForeignGuests',
      component: () => import("../views/RegistrationForm_ForeignGuests.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }

    ,
    {
      path: '/ServiceContent',
      name: 'ServiceContent',
      component: () => import("../views/ServiceContent.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/MissionVision',
      name: 'MissionVision',
      component: () => import("../views/MissionVision.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/MembershipTermsofService',
      name: 'MembershipTermsofService',
      component: () => import("../views/MembershipTermsofService.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/Calendar',
      name: 'Calendar',
      component: () => import("../views/Calendar.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/CommonProblem',
      name: 'CommonProblem',
      component: () => import("../views/CommonProblem.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      }
    }
    ,
    {
      path: '/Questionnaire',
      name: 'Questionnaire',
      component: () => import("../views/Questionnaire.vue"),
      meta: {
        keepAlive: false,
        needLogin: true,
        mainBG: true
      }
    }
  ]
})

//??????????????????????????????
router.beforeEach(async (to, from, next) => {
  const store = LoginOut()
  let isLogin = false
  let needLogin = to.matched.some(match => match.meta.needLogin)
  let mainBG = to.matched.some(match => match.meta.mainBG)
  if ($cookies.isKey("random") == true) {
    isLogin = true
  }

  if (needLogin) {
    if (isLogin) {
      next()
    } else {
      next("/login")
    }
  }
  else {
    next()
  }


  if (mainBG) {
    document.querySelector('body').setAttribute('style', 'background: url(/src/assets/img/background_img.jpg) no-repeat center;background-size: cover')
  } else {
    document.querySelector('body').setAttribute('style', 'background: url(/src/assets/img/background_course_img.jpg) no-repeat center;background-size: cover')
  }
})



export default router
