declare namespace Api {
  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      userId: string;
      userName: string;
      roles: string[];
      buttons: string[];
    }
  }

  namespace adminAuth {
    interface LoginParams {
      account: string;
      pwd: string;
      captchaType: string;
      captchaVerification: string;
    }
    interface LoginResponse {
      token: string;
      expires_time: number;
      menus: MenuItem[];
      unique_auth: string[];
      user_info: UserInfo;
      logo: string;
      version: string;
      newOrderAudioLink: string;
    }

    interface MenuItem {
      path: string;
      title: string;
      icon: string;
      header: string;
      is_header: number;
      children?: MenuItem[];
    }

    interface UserInfo {
      id: number;
      account: string;
      head_pic: string;
      division_id: number;
    }
  }
}
