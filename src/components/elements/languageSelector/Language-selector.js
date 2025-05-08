import React from "react";
import { useEffect, useState, useRef } from "react";
import LanguageArrowDownBlack from "../../../assets/images/language Selector SVGs/Language_ArrowDown.svg";
import LanguageArrowUpBlack from "../../../assets/images/language Selector SVGs/Language_ArrowUp.svg";
import LanguageArrowDown from "../../../assets/images/language Selector SVGs/LanguaugeSelector_Down.svg";
import LanguageArrowUp from "../../../assets/images/language Selector SVGs/LanguaugeSelector_Up.svg";
import LanguageBlack from "../../../assets/images/language Selector SVGs/Language_Black.svg";
import LanguageIcon from "../../../assets/images/language Selector SVGs/Language_White.svg";
import styles from "./Language-selector.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSystemLanguageMainApi,
  setLastSelectedLanguageMainApi,
} from "../../../store/Actions/LanguageActions";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { languageLoader } from "../../../store/ActionsSlicers/LanguageSlicer";

const LanguageSelector = () => {
  const languageref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  console.log(
    "LanguageSelector",
    moment.locale(localStorage.getItem("currentLanguage"))
  );
  const LanguageReducer = useSelector(
    (state) => state.LanguageReducer.getSystemLanguage
  );
  const state = useSelector((state) => state);

  console.log(state.LanguageReducer, "LanguageReducerLanguageReducer");

  // for last language reducer
  const lastLanguageData = useSelector(
    (state) => state.LanguageReducer.lastLanguageData
  );
  console.log(
    lastLanguageData,
    "SetLanguageDataSetLanguageDataSetLanguageData"
  );
  let currentLanguage = localStorage.getItem("currentLanguage");

  let currentUserID = localStorage.getItem("userID");

  const [languageDropdown, setLanguageDropdown] = useState(false);
  console.log(currentLanguage, "currentLanguagecurrentLanguagecurrentLanguage");
  const location = useLocation();
  const [language, setLanguage] = useState("en");

  const [selectedLanguage, setSelectedLanguage] = useState({
    systemSupportedLanguageID: 1,
    languageTitle: t("English"),
    code: "en",
  });

  const [languages, setLanguages] = useState([]);
  console.log(languages, "languageslanguageslanguages");
  useEffect(() => {
    try {
      if (
        LanguageReducer === null ||
        LanguageReducer === undefined ||
        LanguageReducer.length === 0
      ) {
        dispatch(getSystemLanguageMainApi({ navigate, t }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (
      LanguageReducer !== null &&
      LanguageReducer !== undefined &&
      LanguageReducer.length !== 0
    ) {
      console.log(
        LanguageReducer,
        "LanguageReducerLanguageReducerLanguageReducer"
      );
      const newValues = LanguageReducer.map((langValues) => ({
        languageTitle:
          langValues.systemSupportedLanguageID === 1
            ? t("English")
            : langValues.systemSupportedLanguageID === 2
            ? t("Arabic")
            : "",
        systemSupportedLanguageID: langValues.systemSupportedLanguageID,
        code:
          langValues.systemSupportedLanguageID === 1
            ? "en"
            : langValues.systemSupportedLanguageID === 2
            ? "ar"
            : "",
      })).filter((langValues) => langValues.systemSupportedLanguageID !== 3);
      console.log(newValues, "newValuesnewValuesnewValues");
      setLanguages(newValues);
    }
  }, [LanguageReducer]);

  useEffect(() => {
    if (lastLanguageData !== null) {
      try {
      } catch (error) {}
      const { result } = lastLanguageData;
      let getCode =
        result.systemSupportedLanguageID === 1
          ? "en"
          : result.systemSupportedLanguageID === 2
          ? "ar"
          : "en";
      setSelectedLanguage({
        languageTitle:
          result.systemSupportedLanguageID === 2
            ? t("Arabic")
            : result.systemSupportedLanguageID === 1
            ? t("English")
            : "",
        systemSupportedLanguageID: result.systemSupportedLanguageID,
        code: getCode,
      });

      i18n.changeLanguage(getCode);
      localStorage.setItem("currentLanguage", getCode);
      moment.locale(getCode);
      setTimeout(() => {
        // window.location.reload()
        i18n.changeLanguage(getCode);
      }, 100);
    }
  }, [lastLanguageData]);

  const handleChangeLocale = (lang) => {
    console.log(lang, "handleChangeLocalehandleChangeLocalehandleChangeLocale");
    setLanguageDropdown(false);
    // setLanguage(lang)
    let data = {
      UserID: JSON.parse(currentUserID),
      SystemSupportedLanguageID: lang,
    };
    dispatch(languageLoader(true));
    if (currentUserID !== null) {
      dispatch(setLastSelectedLanguageMainApi({ data, navigate, t }));
    }
    if (lang === 1) {
      setSelectedLanguage({
        languageTitle: t("English"),
        systemSupportedLanguageID: 1,
        code: "en",
      });
      i18n.changeLanguage("en");
      localStorage.setItem("currentLanguage", "en");
      moment.locale("en");
      setTimeout(() => {
        // window.location.reload()
        i18n.changeLanguage("en");
      }, 100);
    } else if (lang === 2) {
      setSelectedLanguage({
        languageTitle: t("Arabic"),
        systemSupportedLanguageID: 2,
        code: "ar",
      });
      localStorage.setItem("currentLanguage", "ar");
      moment.locale("ar");
      setTimeout(() => {
        // window.location.reload()
        i18n.changeLanguage("ar");
      }, 100);
    }
    //  else {
    //   setSelectedLanguage({
    //     languageTitle: "French",
    //     systemSupportedLanguageID: 3,
    //     code: "fr",
    //   });
    //   localStorage.setItem("i18nextLng", "fr");
    //   moment.locale("fr");
    //   setTimeout(() => {
    //     // window.location.reload()
    //     i18n.changeLanguage("fr");
    //   }, 1000);
    // }
  };

  // const handleChangeLocale = (lang) => {
  //   if (lang === "ar") {
  //     document.body.dir = "rtl";
  //     i18n.changeLanguage("ar");
  //     setLanguage("ar");
  //     localStorage.setItem("currentLanguage", "ar");
  //   } else {
  //     document.body.dir = "ltr";
  //     i18n.changeLanguage("en");
  //     setLanguage("en");
  //     localStorage.setItem("currentLanguage", "en");
  //   }
  //   setLanguageDropdown(false);
  //   // setLanguage(lang)
  // };

  const handleOutsideClick = (event) => {
    if (
      languageref.current &&
      !languageref.current.contains(event.target) &&
      languageDropdown
    ) {
      setLanguageDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [languageDropdown]);

  useEffect(() => {
    if (currentLanguage === "ar") {
      document.body.dir = "rtl";
      i18n.changeLanguage("ar");
    } else {
      document.body.dir = "ltr";
      i18n.changeLanguage("en");
    }
  }, [currentLanguage]);

  return (
    <section
      className="position-relative"
      ref={languageref}
      onClick={() => setLanguageDropdown(!languageDropdown)}
    >
      <span
        className={
          location.pathname.includes("/GlobalAdmin")
            ? "text-white d-flex gap-2  mx-3 align-items-center position-relative cursor-pointer"
            : "text-black d-flex gap-2 mx-3 align-items-center position-relative cursor-pointer"
        }
      >
        <img
          src={
            location.pathname.includes("/GlobalAdmin")
              ? LanguageIcon
              : LanguageBlack
          }
          alt=""
          draggable="false"
        />
        {/* {selectedLanguage.languageTitle} */}
        {currentLanguage === "en"
          ? t("English")
          : currentLanguage
          ? t("Arabic")
          : t("English")}
        {languageDropdown ? (
          <img
            src={
              location.pathname.includes("/GlobalAdmin")
                ? LanguageArrowUp
                : LanguageArrowUpBlack
            }
            onClick={() => setLanguageDropdown(!languageDropdown)}
            alt=""
            draggable="false"
          />
        ) : (
          <img
            src={
              location.pathname.includes("/GlobalAdmin")
                ? LanguageArrowDown
                : LanguageArrowDownBlack
            }
            onClick={() => setLanguageDropdown(!languageDropdown)}
            alt=""
            draggable="false"
          />
        )}
      </span>
      <div
        className={
          !languageDropdown
            ? styles["language_options"]
            : styles["language_options_active"]
        }
      >
        {languages.length > 0 &&
          languages.map((data, index) => {
            return (
              <span
                className="cursor-pointer"
                onClick={() =>
                  handleChangeLocale(data.systemSupportedLanguageID)
                }
                key={index}
              >
                {data.languageTitle}
              </span>
            );
          })}
      </div>
    </section>
  );
};

export default LanguageSelector;
