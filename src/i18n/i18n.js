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
          "shares": "Shares",
          "courses": "Courses",
          "follow": "Follow",
          "followTwitter": "Follow me on Twitter",
          "followInstagram": "Follow me on Instagram",
          "followFacebook": "Follow me on Facebook",
          "vlogs": "Vlogs",
          "loginPageTitle": "A place to learn and share knowledge",
          "email": "Email",
          "password": "Password",
          "login": "Login",
          "featureInDevelop": "The feature is in development",
          "needHelp": "Need help?",
          "hereMyTeam": "Here is our team",
          "hoaDescription": "Needing to get married urgently, if you agree, you can get married at night",
          "toanDescription": "Single, whoever asks to go out is ok",
          "manhDescription": "Like Hoa hu hong, needing to get married urgently",
          "vlogsDescription": "We keep beautiful memories together, each experience will be a very beautiful memory",
          "vlogsQuestionTitle": "Why we have these experiences?",
          "manhNickname": "Mạnh mõm",
          "toanNickname": "Toàn bơm",
          "hoaNickname": "Hòa hư hỏng",
          "subscribeYoutube": "Subscribe with Youtube",
          "homePage": "Home page",
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
          "followFacebook": "Theo dõi tôi trên Facebook",
          "vlogs": "Vlogs",
          "loginPageTitle": "Nơi học tập và chia sẻ các kiến thức, trải nghiệm cuộc sống hàng ngày",
          "email": "Email",
          "password": "Mật khẩu",
          "login": "Đăng nhập",
          "featureInDevelop": "Tính năng đang trong giai đoạn phát triển",
          "needHelp": "Bạn cần trợ giúp?",
          "hereMyTeam": "Đây là team của tôi",
          "hoaDescription": "Đang cần lấy vợ gấp, nếu đồng ý có thể cưới ngay trong đêm",
          "toanDescription": "Độc thân vui vẻ, ai rủ đi chơi thì đi luôn :v",
          "manhDescription": "Như Hòa hư hỏng, cần lấy vợ gấp",
          "vlogsDescription": "Chúng tôi lưu giữ những kỷ niệm đẹp với nhau, mỗi trải nghiệm sau này sẽ là một phần ký ức rất đẹp",
          "vlogsQuestionTitle": "Tại sao lại có những trải nghiệm này?",
          "manhNickname": "Mạnh mõm",
          "toanNickname": "Toàn bơm",
          "hoaNickname": "Hòa hư hỏng",
          "subscribeYoutube": "Đăng ký với Youtube",
          "homePage": "Trang chủ",
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
