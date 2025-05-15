// security
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_KEY_VAL;
export const REACT_APP_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const BASE_URL=import.meta.env.VITE_BACKEND_BASE_URL;

export const EMAIL_VERIFY_FORM = 'EMAIL_VERIFY_FORM';
export const OTP_VERIFY_FORM = 'OTP_VERIFY_FORM';
export const ROLES = {
    'User' : 501,
    'Admin': 502,
}

//url
export const LOGIN_URL=`/auth/signin`;
export const REGISTER_URL = "/auth/signup";
export const REFRESH_TOKEN_URL='/auth/refresh_token';
export const ALL_CATEGORY_URL =`category/all`;
export const CHANGE_PASSWORD_URL = "/forgotpassword/change_password";
export const UPDATE_POST_URL = '/post/update';
export const CREATE_POST_URL = '/post/create';
export const FILE_UPLOAD_URL = '/file/upload';
export const VERIFY_EMAIL_URL = "/forgotpassword/verify_email";
export const VERIFY_OTP_URL = "/forgotpassword/verify_otp";
export const GET_USER_DETAILS_URL = "/user";
export const UPDATE_USER_DETAILS_URL = "/user/update";
export const GET_PUBLISHED_BLOGS_URL = "/post/published/false";
export const GET_DRAFTED_BLOGS_URL = "/post/published/true";
export const GET_BLOGS_URL = "/post/page";
export const SUBSCRIBE_TOPIC_URL = '/user/subscribe';
export const FETCH_BLOGS_URL = '/post/category';



export const VALID_EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
export const VALID_PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

//editor
export const WAITING_TIME_FOR_AUTO_SAVE = 100
export const PAGE_SIZE = 10


