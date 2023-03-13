import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { LoginOut } from "../stores/stores"

const routerHistory = createWebHistory()

const router = createRouter({
  history: createWebHashHistory(),
  // history: routerHistory,
  routes: [
    // { path: '/:pathMatch(.*)', component: NotFoundComponent },
    {
      path: '/',
      name: 'home',
      component: () => import("../views/Index.vue"),
      meta: {
        keepAlive: true,
        needLogin: false,
        mainBG: true
      }
    },
    {
      // 確認樣式的頁面 確認完樣式後直接刪除
      path: '/QuestionnaireTest',
      name: 'QuestionnaireTest',
      component: () => import("../views/QuestionnaireTest.vue"),
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
    {
      path: '/ServiceContent',
      name: 'ServiceContent',
      component: () => import("../views/ServiceContent.vue"),
      meta: {
        keepAlive: true,
        needLogin: false,
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
        needLogin: false,
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
        needLogin: false,
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
        needLogin: false,
        mainBG: true
      }
    }
    ,
    {
      path: '/Questionnaire/:id',
      name: 'Questionnaire',
      component: () => import("../views/Questionnaire.vue"),
      meta: {
        keepAlive: true,
        needLogin: true,
        mainBG: true
      },
      children: [
        {
          path: ":IsApp",
          component: () => import("../views/Questionnaire.vue"),
          // 進入時判斷是否有帶app的參數
          beforeEnter: (to, from) => {
            if (to.params.IsApp === "1") {
              to.meta.keepAlive = false
            }
          },
          children: [
            {
              path: ":Uid",
              component: () => import("../views/Questionnaire.vue"),
              children: [
                {
                  path: ":AuthCode",
                  component: () => import("../views/Questionnaire.vue"),
                  children: [
                    {
                      path: ":Lang",
                      component: () => import("../views/Questionnaire.vue"),
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

//跳轉前驗證是否有登入
router.beforeEach(async (to, from, next) => {
  const store = LoginOut()
  let isLogin = false
  let needLogin = to.matched.some(match => match.meta.needLogin)
  let mainBG = to.matched.some(match => match.meta.mainBG)
  if ($cookies.isKey("random") == true) {
    isLogin = true
  }

  if (to.params.IsApp === "1") {
    //app瀏覽時不驗證網頁登入狀態
    needLogin = false
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
    document.querySelector('body').setAttribute('class', 'Main')

  } else {
    document.querySelector('body').setAttribute('class', 'NotMain')
  }
})



export default router
