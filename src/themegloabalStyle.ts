import colors from "./colors";

export const themegloabalStyle = {
  margin: {
    // 네비게이션 헤더에서 타이틀 까지
    headerToTitle: 16,
    horizontal: 24,
  },
  padding: {
    // 공통 padding 값
    horizontal: 24,
    vertical: 20,

    // 버튼에서 바닥까지
    //   buttonToEnd: Platform.OS === 'ios' ? 32 : 24,
  },
  size: {
    // 제목 글자 크기
    titleFont: 23,
    // 소제목 글자 크기
    subTitleFont: 18,
    // NavigationHeader의 Icon size
    headerIcon: 27,
    // 기기 가로 길이
    // deviceWidth: Dimensions.get("window").width,
    // // 기기 가로 길이
    // screenWidth: Dimensions.get("window").width - 24 * 2,
    // // 기기 세로 길이
    // deviceHeight: Dimensions.get("window").height,
    // // 기기 세로 길이 아이템길이
    // itemHeight: (Dimensions.get("window").height / 100) * 14,
    // itemWidth: (Dimensions.get("window").width / 375) * 327,
  },
  fontFamily: {
    normal: "NotoSansKR-Black",
    light: "NotoSansKR-Light",
    medium: "NotoSansKR-Medium",
    regular: "NotoSansKR-Regular",
    bold: "NotoSansKR-Bold",
    semiBold: "NotoSansKR-Medium",
  },
  // 제목
  title: {
    fontFamily: "NotoSansKR-Medium",
    fontSize: 23,
    color: colors.TXT_01,
    letterSpacing: -1.38,
  },
  // 소제목 fontSize 18
  subTitle_18: {
    fontFamily: "NotoSansKR-Light",
    fontSize: 18,
    color: colors.TXT_01,
    letterSpacing: -0.9,
  },
  // 소제목 fontSize 16 or Header Text
  subTitle_16: {
    fontFamily: "NotoSansKR-Light",
    fontSize: 16,
    color: colors.TXT_01,
    letterSpacing: -0.8,
  },

  // 소제목 fontSize 16 or Header Text
  subTitle_16_medium: {
    fontFamily: "NotoSansKR-Medium",
    fontSize: 16,
    color: colors.TXT_01,
    letterSpacing: -0.8,
  },
  // 화면 안내
  description: {
    fontFamily: "NotoSansKR-Light",
    fontSize: 18,
    color: colors.TXT_02,
    letterSpacing: -0.9,
  },
  button_text: {
    fontFamily: "NotoSansKR-Medium",
    color: colors.TXT_01,
    letterSpacing: -0.8,
    fontSize: 16,
  },
  // 글자용 light
  text_light: {
    fontFamily: "NotoSansKR-Light",
    color: colors.TXT_01,
    letterSpacing: -0.7,
  },
  // 글자용 regular
  text_regular: {
    fontFamily: "NotoSansKR-Regular",
    color: colors.TXT_01,
    letterSpacing: -0.7,
  },
  // 글자용 medium
  text_medium: {
    fontFamily: "NotoSansKR-Medium",
    color: colors.TXT_01,
    letterSpacing: -0.7,
  },
  // 글자용 bold
  text_bold: {
    fontFamily: "NotoSansKR-Bold",
    color: colors.TXT_01,
    letterSpacing: -0.7,
  },
  // 하단 버튼 primary
  button_primary: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2c2c2c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  // 하단 버튼 white
  button_white: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.BG_02,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2c2c2c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  // 하단 버튼 disabled
  button_disabled: {
    height: 50,
    backgroundColor: colors.button_none,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  shadow_01: {
    shadowColor: "#2c2c2c",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  shadow_02: {
    shadowColor: "#2c2c2c",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 15,
  },
  shadow_03: {
    shadowColor: "#2c2c2c",
    shadowOffset: {
      width: -1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  finishedImage: {
    marginLeft: 24,
    marginTop: 68,
    marginBottom: 16,
  },
};

// const styles = StyleSheet.create({
//   normal: {
//     fontFamily: 'NotoSansKR-Black',
//   },
//   light: {
//     fontFamily: Platform.select({
//       ios: 'NotoSansKR-Light',
//       android: 'NotoSansKR-Medium',
//     }),
//   },
//   regular: {
//     fontFamily: Platform.select({
//       ios: 'NotoSansKR-Regular',
//       android: 'NotoSansKR-Medium',
//     }),
//   },
//   medium: {
//     fontFamily: 'NotoSansKR-Medium',
//   },
//   semiBold: {
//     fontFamily: 'NotoSansKR-Medium',
//   },
//   bold: {
//     fontFamily: 'NotoSansKR-Bold',
//   },
// });

export default themegloabalStyle;
