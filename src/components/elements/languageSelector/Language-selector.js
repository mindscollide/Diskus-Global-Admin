import React from "react";
import { useEffect, useState, useRef } from "react";
import LanguageArrowDownBlack from "../../../assets/images/language Selector SVGs/Language_ArrowDown.svg";
import LanguageArrowUpBlack from "../../../assets/images/language Selector SVGs/Language_ArrowUp.svg";
import LanguageBlack from "../../../assets/images/language Selector SVGs/Language_Black.svg";
import styles from "./Language-selector.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const languageref = useRef();
  let currentLanguage = localStorage.getItem("i18nextLng");
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const { t, i18n } = useTranslation();

  const [languages, setLanguages] = useState([
    {
      label: "English",
      value: "en",
    },
    {
      label: "Arabic",
      value: "ar",
    },
    {
      label: "French",
      value: "fr",
    },
  ]);

  const handleChangeLocale = (lang) => {
    if (lang === "ar") {
      document.body.dir = "rtl";
      i18n.changeLanguage("ar");
    } else if (lang === "fr") {
      document.body.dir = "ltr";
      i18n.changeLanguage("fr");
    } else {
      document.body.dir = "ltr";
      i18n.changeLanguage("en");
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

  useEffect(() => {
    if (currentLanguage === "ar") {
      document.body.dir = "rtl";
      i18n.changeLanguage("ar");
    } else if (currentLanguage === "fr") {
      document.body.dir = "ltr";
      i18n.changeLanguage("fr");
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
      <span className="d-flex gap-2">
        <img src={LanguageBlack} alt="" draggable="false" />
        {/* {selectedLanguage.languageTitle} */}
        {currentLanguage === "en"
          ? t("English")
          : currentLanguage === "ar"
          ? t("Arabic")
          : currentLanguage === "fr"
          ? t("French")
          : t("English")}
        {languageDropdown ? (
          <img
            src={LanguageArrowUpBlack}
            onClick={() => setLanguageDropdown(!languageDropdown)}
            alt=""
            draggable="false"
          />
        ) : (
          <img
            src={LanguageArrowDownBlack}
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
