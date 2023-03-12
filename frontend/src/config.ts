export const Config = {
  API_BASEURL: process.env['REACT_APP_API_BASEURL'] || '',
  GOOGLE_CLIENT_ID: process.env['REACT_APP_GOOGLE_CLIENT_ID'] || '860518552470-3sjs8lgm3do80ajlv98ld5b2is6r2824.apps.googleusercontent.com',
  FACEBOOK_CLIENT_ID: process.env['REACT_APP_FACEBOOK_CLIENT_ID'] || '',
  GITHUB_CLIENT_ID: process.env['REACT_APP_GITHUB_CLIENT_ID'] || '',
  REDIRECT_URI: process.env['REACT_APP_REDIRECT_URI'] || '/login/userType',
};
