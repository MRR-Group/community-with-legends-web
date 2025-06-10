import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import commonEn from "../../locals/en/common.en.json";
import loginEn from "../../locals/en/login.en.json";
import registerEn from "../../locals/en/register.en.json";
import forgotPasswordEn from "../../locals/en/forgotPassword.en.json";
import resetPasswordEn from "../../locals/en/resetPassword.en.json";
import setPasswordTwitchEn from "../../locals/en/setPasswordTwitch.en.json";
import navigationBarEn from "../../locals/en/navigationBar.en.json";
import feedPageEn from "../../locals/en/feedPage.en.json";
import postPageEn from "../../locals/en/postPage.en.json";
import profilePageEn from "../../locals/en/profilePage.en.json";
import commonPl from "../../locals/pl/common.pl.json";
import loginPl from "../../locals/pl/login.pl.json";
import registerPl from "../../locals/pl/register.pl.json";
import forgotPasswordPl from "../../locals/pl/forgotPassword.pl.json";
import resetPasswordPl from "../../locals/pl/resetPassword.pl.json";
import setPasswordTwitchPl from "../../locals/pl/setPasswordTwitch.pl.json";
import navigationBarPl from "../../locals/pl/navigationBar.pl.json";
import feedPagePl from "../../locals/pl/feedPage.pl.json";
import postPagePl from "../../locals/pl/postPage.pl.json";
import profilePagePl from "../../locals/pl/profilePage.pl.json";

export function InitTranslation() {
  i18n.use(initReactI18next).init({
    lng:'en',
    fallback:'en',
    ns: ['common', 'login', 'register', 'forgotPassword', 'resetPassword', 'setPasswordTwitch', 'navigationBar', 'feedPage', 'postPage', 'profilePage'],
    defaultNS: "common",
    debug:true,
    resources:{
      en: {
        common: commonEn,
        login: loginEn,
        register: registerEn,
        forgotPassword: forgotPasswordEn,
        resetPassword: resetPasswordEn,
        setPasswordTwitch: setPasswordTwitchEn,
        navigationBar: navigationBarEn,
        feedPage: feedPageEn,
        postPage: postPageEn,
        profilePage: profilePageEn,
      },
      pl:{
        common: commonPl,
        login: loginPl,
        register: registerPl,
        forgotPassword: forgotPasswordPl,
        resetPassword: resetPasswordPl,
        setPasswordTwitch: setPasswordTwitchPl,
        navigationBar: navigationBarPl,
        feedPage: feedPagePl,
        postPage: postPagePl,
        profilePage: profilePagePl,
      },
    },
  } as any)
}
