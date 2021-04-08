import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          "language": "Language",
          "websiteDescription": "This is Toan's demo website",
          "forFuture": "For future",
          "profile": "Profile",
          "posts": "Post",
          "shares": "Share(s)",
          "courses": "Courses",
          "follow": "Follow",
          "followTwitter": "Follow me on Twitter",
          "followInstagram": "Follow me on Instagram",
          "followFacebook": "Follow me on Facebook",
        }
      },
      vn: {
        translations: {
          "language": "Ngôn ngữ",
          "websiteDescription": "Đây là website demo của Toàn",
          "forFuture": "Vì tương lai",
          "profile": "Hồ sơ",
          "posts": "Bài viết",
          "shares": "Chia sẻ",
          "courses": "Khóa học",
          "follow": "Theo dõi",
          "followTwitter": "Theo dõi tôi trên Twitter",
          "followInstagram": "Theo dõi tôi trên Instagram",
          "followFacebook": "Theo dõi tôi trên Facebook"
        }
      }
    },
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ','
    },

    react: {
      wait: true
    }
  });

export default i18n;
