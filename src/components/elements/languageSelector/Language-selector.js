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
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const languageref = useRef();
  let currentLanguage = localStorage.getItem("i18nextLng");
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  console.log(currentLanguage, "currentLanguagecurrentLanguagecurrentLanguage");
  const location = useLocation();
  const [language, setLanguage] = useState("en");
  const [languages, setLanguages] = useState([
    {
      label: "English",
      value: "en",
    },
    {
      label: "عربي",
      value: "ar",
    },
  ]);

  const handleChangeLocale = (lang) => {
    if (lang === "ar") {
      document.body.dir = "rtl";
      i18n.changeLanguage("ar");
      setLanguage("ar");
      localStorage.setItem("currentLanguage", "ar");
    } else {
      document.body.dir = "ltr";
      i18n.changeLanguage("en");
      setLanguage("en");
      localStorage.setItem("currentLanguage", "en");
    }
    setLanguageDropdown(false);
    // setLanguage(lang)
  };

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

  // useEffect(() => {
  //   if (currentLanguage === "ar") {
  //     document.body.dir = "rtl";
  //     i18n.changeLanguage("ar");
  //   } else if (currentLanguage === "fr") {
  //     document.body.dir = "ltr";
  //     i18n.changeLanguage("fr");
  //   } else {
  //     document.body.dir = "ltr";
  //     i18n.changeLanguage("en");
  //   }
  // }, [currentLanguage]);

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
        {language === "en"
          ? t("English")
          : language === "ar"
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
                onClick={() => handleChangeLocale(data.value)}
                key={index}
              >
                {data.label}
              </span>
            );
          })}
      </div>
    </section>
  );
};

export default LanguageSelector;
