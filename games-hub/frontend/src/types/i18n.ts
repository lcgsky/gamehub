export type Language = 'en' | 'zh' | 'ja' | 'ko';

export interface AuthTranslations {
  login: string;
  register: string;
  email: string;
  email_placeholder: string;
  username: string;
  username_placeholder: string;
  password: string;
  password_placeholder: string;
  password_min_length: string;
  confirm_password: string;
  confirm_password_placeholder: string;
  submit_login: string;
  submit_register: string;
  no_account: string;
  register_now: string;
  have_account: string;
  login_now: string;
  social_login: string;
  social_register: string;
  login_failed: string;
  register_failed: string;
  social_login_failed: string;
  social_register_failed: string;
  password_mismatch: string;
}

export interface Translations {
  auth: AuthTranslations;
  [key: string]: any;
} 