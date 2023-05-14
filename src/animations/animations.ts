import {
  animate,
  animateChild,
  group,
  query,
  sequence,
  stagger,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export const routeAuthHouseAnimamtion = trigger('routeAnimations', [
  transition('register => connect', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ opacity: 1, left: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ opacity: 0, left: '100%' }))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ opacity: 1, left: '0%' }))
      ])
    ]),
    query(':enter', animateChild()),
  ]),

  transition('connect => register', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ opacity: 1, right: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ opacity: 0, right: '100%' }))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ opacity: 1, right: '0%' }))
      ])
    ]),
    query(':enter', animateChild()),
  ])
]);




export const routeAnimationFade = trigger('routeAnimationsFade', [
  transition('* <=> *', [
    query(':enter',
      [
        style({ opacity: 0 })
      ],
    ),

    query(':leave',
      [
        style({ position: 'absolute', opacity: 1, width: '100%'}),
        animate('5s', style({ opacity: 0 }))
      ],
      { optional: true }
    ),

    query(':enter',
      [
        style({ position: 'absolute', opacity: 0, width: '100%', height:'100%' }),
        animate('.1s', style({ opacity: 1 }))
      ],
      { optional: true }
    )
    /*
    query(':enter, :leave', [
      style({
        opacity: 0
      })
    ]),
    query(':enter', [
      style({ opacity: 1 })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ opacity: 1}))
      ])
    ]),
    query(':enter', animateChild()),

     */
  ])
]);




export const fadeAnimation = trigger('fade', [
  // ...
  state('open', style({
    opacity: 1
  })),
  state('closed', style({
    opacity: 0
  })),
  transition('open => closed', [
    animate('3s')
  ]),
  transition('closed => open', [
    animate('3.5s')
  ]),
])

export const navAnimation = trigger('nav', [
  // ...
  state('open', style({
    zIndex: 6,
    opacity: 1,
    left: '0'

  })),
  state('closed', style({
    opacity: 0,
    zIndex: -1,
    left: '-100%'
  })),
  transition('open => closed', [
    animate('300ms ease-out', ),
  ]),
  transition('closed => open', [
    animate('200ms ease-out')
  ]),

])

export const navButtonAnimation = trigger('navButton', [
  // ...
  state('open', style({
    left: '85px',
    zIndex: 6
  })),
  state('closed', style({
    left: 0
  })),
  transition('open => closed', [
    animate('200ms ease-out')
  ]),
  transition('closed => open', [
    animate('200ms ease-out')
  ]),
])

export const bgAnimation = trigger('bg', [
  // ...

  state('open', style({
    zIndex: 1,
    opacity: 0.5
  })),
  state('closed', style({
    zIndex: -1,
    opacity: 0,

  })),

  transition('open => closed', [
    style({
      display: 'none'
    }),
    animate('200ms ease-out')
  ]),
  transition('closed => open', [
    animate('200ms ease-out')
  ]),

])

export const upAnimation = trigger('upAnimation', [
  // ...
  state('up', style({
    position: 'absolute',
    top: '20%'
  })),
  state('normal', style({

  })),
  transition('normal => up', [
    animate('150ms ease-out')
  ]),
])

export const upAddAnimation = trigger('up', [
  // ...
  state('open', style({
    zIndex: 6,
    opacity: 1,
    bottom: '-1px',
  })),
  state('closed', style({
    opacity: 0,
    bottom: '-300px',

  })),
  transition('open => closed', [
    animate('1000ms cubic-bezier(0,.92,.51,1.01)')
  ]),
  transition('closed => open', [
    animate('300ms cubic-bezier(0,.92,.51,1.01)')
  ]),

])

export const windowAnimation = trigger('windowAnimation', [

  transition(':enter', [
    group([
      sequence([

        query(".container-course",[
          style({
            height: 0,
            width: 0,
            opacity: 0
          }),
          animate('450ms cubic-bezier(.65,.3,.24,1.64)', style({
            height: '100%',
            width: '100%',
            opacity: 1
          })),
        ])
      ])
    ])

  ]),

])

export const fadeItemRemoveAnimation = trigger('fadeItemRemove', [
  transition(':enter', [
    group([
        query(".l-item-house",[
          style({
            opacity: 0
          }),
          animate('550ms cubic-bezier(.65,.3,.24,1.64)', style({
            opacity: 1,
          })),
        ]),

    ])
  ])
])

export const popAnimation = trigger('pop', [
  transition(':enter', [
    group([
        query(".pop",[
          style({
            transform: 'translateY(-50%)',
            opacity: 0,
          }),
          animate('450ms cubic-bezier(.65,.3,.24,1.64)', style({
            opacity: 1,
            zIndex: 3,
            transform: 'translateY(0)'

          })),
        ])
    ])

  ]),
  transition(':leave', [
      query(".pop",[
        animate('450ms cubic-bezier(.74,-0.78,.45,.93)', style({
          transform: 'translateY(-50%)',
          opacity: 0
        })),
      ])
  ])

])

export const navBoardAnimation = trigger('nav', [
  transition(':enter', [
    group([
      query(".nav-section", [
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        }),
        animate('450ms cubic-bezier(.65,.3,.24,1.64)', style({
          opacity: 1,
          zIndex: 3,
          transform: 'translateX(0)'

        })),
      ],
        { optional: true })
    ])

  ]),
  transition(':leave', [
    query(".nav-section",[
      animate('450ms cubic-bezier(.74,-0.78,.45,.93)', style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
    ])
  ])

])


export const advancedFadeAnimation = trigger('fade', [
  transition(':enter', [
    group([
      query(".fade",[
        style({
          opacity: 0,
        }),
        animate('450ms cubic-bezier(.65,.3,.24,1.64)', style({
          opacity: 1,
        })),
      ])
    ])

  ]),
  transition(':leave', [
    query(".fade",[
      animate('450ms cubic-bezier(.74,-0.78,.45,.93)', style({
        opacity: 0
      })),
    ])
  ])

])

export const slideInAnimation =
  trigger('routeAnimations', [

    transition('dashboard => station', [
      query(':enter .parent, :enter .bg', [
        style({
          position: 'absolute',
          top: 0,
          left: '200%',
          width: '100%'
        })
      ]),
      query(':leave .parent, .nav-section', [
        style({ left: '0' })
      ]),
      query(':leave .parent, .nav-section', animateChild()),
      group([
        query(':leave .parent, .nav-section', [
          animate('450ms cubic-bezier(.74,-0.78,.45,.93)', style({ left: '-100%', opacity: 0 }))
        ]),
        query(':enter .parent, :enter .bg', [
          animate('450ms cubic-bezier(.74,-0.78,.45,.93)', style({ left: '0%' }))
        ]),
        query('@*', animateChild(), { optional: true })
      ]),
    ]),

    transition('station => dashboard', [
      query(':enter .parent, .nav-section', [
        style({
          position: 'fixed',
          top: 0,
          left: '-100%',
        })
      ]),
      query(':leave .parent, :leave .bg', [
        style({ left: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave .parent, :leave .bg', [
          animate('450ms cubic-bezier(.74,-0.78,.45,.93)', style({ left: '200%', opacity: 0 }))
        ]),
        query(':enter .parent, .nav-section', [
          animate('450ms cubic-bezier(.74,-0.78,.45,.93)', style({ left: '0%' }))
        ]),
        query('@*', animateChild(), { optional: true })
      ]),
    ])
  ]);
