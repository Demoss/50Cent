export const routes = {
  layout: {
    absolute: () => '/',
  },
  home: {
    absolute: () => '/home',
  },
  login: {
    absolute: () => '/login',
    registration: {
      absolute: () => '/login/registration',
      relative: () => 'registration',
    },
    confirmTypes: {
      phoneAbsolute: () => '/login/confirm?type=phone',
      emailAbsolute: () => '/login/confirm?type=email',
      otpAbsolute: () => '/login/confirm?type=otp',
    },
    registrationOtp: {
      absolute: () => '/login/registration/otp',
    },
    confirmOtp: {
      absolute: () => '/login/registration/otp/confirm',
    },
  },

  admin: {
    absolute: () => '/admin',
  },

  investor: {
    absolute: () => '/investor',
    relative: () => 'cabinet',
    registration: {
      absolute: () => '/investor/registration',
      relative: () => 'registration',
    },
  },

  consumer: {
    absolute: () => '/consumer',
    //// CABINET LINK IS NEEDED ///////
    // relative: () => 'cabinet',
    registration: {
      absolute: () => '/consumer/registration',
      relative: () => 'registration',
    },
  },

  credit: {
    absolute: () => '/credit',
  },

  obtain: {
    absolute: () => '/obtain',
  },
} as const;
