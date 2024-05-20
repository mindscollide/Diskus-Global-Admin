import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./CountryFlag.module.css";
const countryCodeMap = {
  "+247": "SH", // Ascension Island
  "+376": "AD", // Andorra
  "+971": "AE", // United Arab Emirates
  "+93": "AF", // Afghanistan
  "+1": "AG", // Antigua and Barbuda
  "+1": "AI", // Anguilla
  "+355": "AL", // Albania
  "+374": "AM", // Armenia
  "+244": "AO", // Angola
  "+672": "AQ", // Antarctica
  "+54": "AR", // Argentina
  "+43": "AT", // Austria
  "+61": "AU", // Australia
  "+297": "AW", // Aruba
  "+358": "AX", // Åland Islands
  "+994": "AZ", // Azerbaijan
  "+387": "BA", // Bosnia and Herzegovina
  "+1": "BB", // Barbados
  "+880": "BD", // Bangladesh
  "+32": "BE", // Belgium
  "+226": "BF", // Burkina Faso
  "+359": "BG", // Bulgaria
  "+973": "BH", // Bahrain
  "+257": "BI", // Burundi
  "+229": "BJ", // Benin
  "+590": "BL", // Saint Barthélemy
  "+1": "BM", // Bermuda
  "+673": "BN", // Brunei
  "+591": "BO", // Bolivia
  "+599": "BQ", // Bonaire, Sint Eustatius and Saba
  "+55": "BR", // Brazil
  "+1": "BS", // Bahamas
  "+975": "BT", // Bhutan
  "+47": "BV", // Bouvet Island
  "+267": "BW", // Botswana
  "+375": "BY", // Belarus
  "+501": "BZ", // Belize
  "+1": "CA", // Canada
  "+61": "CC", // Cocos (Keeling) Islands
  "+243": "CD", // Democratic Republic of the Congo
  "+236": "CF", // Central African Republic
  "+242": "CG", // Republic of the Congo
  "+41": "CH", // Switzerland
  "+225": "CI", // Côte d'Ivoire
  "+682": "CK", // Cook Islands
  "+56": "CL", // Chile
  "+237": "CM", // Cameroon
  "+86": "CN", // China
  "+57": "CO", // Colombia
  "+506": "CR", // Costa Rica
  "+53": "CU", // Cuba
  "+238": "CV", // Cabo Verde
  "+599": "CW", // Curaçao
  "+61": "CX", // Christmas Island
  "+357": "CY", // Cyprus
  "+420": "CZ", // Czechia
  "+49": "DE", // Germany
  "+246": "DG", // Diego Garcia
  "+253": "DJ", // Djibouti
  "+45": "DK", // Denmark
  "+1": "DM", // Dominica
  "+1": "DO", // Dominican Republic
  "+213": "DZ", // Algeria
  "+34": "EA", // Ceuta and Melilla
  "+593": "EC", // Ecuador
  "+372": "EE", // Estonia
  "+20": "EG", // Egypt
  "+291": "ER", // Eritrea
  "+34": "ES", // Spain
  "+251": "ET", // Ethiopia
  "+358": "EU", // European Union
  "+358": "FI", // Finland
  "+679": "FJ", // Fiji
  "+500": "FK", // Falkland Islands
  "+691": "FM", // Micronesia
  "+298": "FO", // Faroe Islands
  "+33": "FR", // France
  "+241": "GA", // Gabon
  "+44": "GB", // United Kingdom
  "+1": "GD", // Grenada
  "+995": "GE", // Georgia
  "+594": "GF", // French Guiana
  "+44": "GG", // Guernsey
  "+233": "GH", // Ghana
  "+350": "GI", // Gibraltar
  "+299": "GL", // Greenland
  "+220": "GM", // Gambia
  "+224": "GN", // Guinea
  "+590": "GP", // Guadeloupe
  "+240": "GQ", // Equatorial Guinea
  "+30": "GR", // Greece
  "+500": "GS", // South Georgia and the South Sandwich Islands
  "+502": "GT", // Guatemala
  "+1": "GU", // Guam
  "+245": "GW", // Guinea-Bissau
  "+592": "GY", // Guyana
  "+852": "HK", // Hong Kong
  "+504": "HN", // Honduras
  "+385": "HR", // Croatia
  "+509": "HT", // Haiti
  "+36": "HU", // Hungary
  "+34": "IC", // Canary Islands
  "+62": "ID", // Indonesia
  "+353": "IE", // Ireland
  "+972": "IL", // Israel
  "+44": "IM", // Isle of Man
  "+91": "IN", // India
  "+246": "IO", // British Indian Ocean Territory
  "+964": "IQ", // Iraq
  "+98": "IR", // Iran
  "+354": "IS", // Iceland
  "+39": "IT", // Italy
  "+44": "JE", // Jersey
  "+1": "JM", // Jamaica
  "+962": "JO", // Jordan
  "+81": "JP", // Japan
  "+254": "KE", // Kenya
  "+996": "KG", // Kyrgyzstan
  "+855": "KH", // Cambodia
  "+686": "KI", // Kiribati
  "+269": "KM", // Comoros
  "+1": "KN", // Saint Kitts and Nevis
  "+850": "KP", // North Korea
  "+82": "KR", // South Korea
  "+965": "KW", // Kuwait
  "+1": "KY", // Cayman Islands
  "+7": "KZ", // Kazakhstan
  "+856": "LA", // Laos
  "+961": "LB", // Lebanon
  "+1": "LC", // Saint Lucia
  "+423": "LI", // Liechtenstein
  "+94": "LK", // Sri Lanka
  "+231": "LR", // Liberia
  "+266": "LS", // Lesotho
  "+370": "LT", // Lithuania
  "+352": "LU", // Luxembourg
  "+371": "LV", // Latvia
  "+218": "LY", // Libya
  "+212": "MA", // Morocco
  "+377": "MC", // Monaco
  "+373": "MD", // Moldova
  "+382": "ME", // Montenegro
  "+590": "MF", // Saint Martin (French part)
  "+261": "MG", // Madagascar
  "+692": "MH", // Marshall Islands
  "+389": "MK", // North Macedonia
  "+223": "ML", // Mali
  "+95": "MM", // Myanmar
  "+976": "MN", // Mongolia
  "+853": "MO", // Macao
  "+1": "MP", // Northern Mariana Islands
  "+596": "MQ", // Martinique
  "+222": "MR", // Mauritania
  "+1": "MS", // Montserrat
  "+356": "MT", // Malta
  "+230": "MU", // Mauritius
  "+960": "MV", // Maldives
  "+265": "MW", // Malawi
  "+52": "MX", // Mexico
  "+60": "MY", // Malaysia
  "+258": "MZ", // Mozambique
  "+264": "NA", // Namibia
  "+687": "NC", // New Caledonia
  "+227": "NE", // Niger
  "+672": "NF", // Norfolk Island
  "+234": "NG", // Nigeria
  "+505": "NI", // Nicaragua
  "+31": "NL", // Netherlands
  "+47": "NO", // Norway
  "+977": "NP", // Nepal
  "+674": "NR", // Nauru
  "+683": "NU", // Niue
  "+64": "NZ", // New Zealand
  "+968": "OM", // Oman
  "+507": "PA", // Panama
  "+51": "PE", // Peru
  "+689": "PF", // French Polynesia
  "+675": "PG", // Papua New Guinea
  "+63": "PH", // Philippines
  "+92": "PK", // Pakistan
  "+48": "PL", // Poland
  "+508": "PM", // Saint Pierre and Miquelon
  "+64": "PN", // Pitcairn
  "+1": "PR", // Puerto Rico
  "+970": "PS", // Palestine
  "+351": "PT", // Portugal
  "+680": "PW", // Palau
  "+595": "PY", // Paraguay
  "+974": "QA", // Qatar
  "+262": "RE", // Réunion
  "+40": "RO", // Romania
  "+381": "RS", // Serbia
  "+7": "RU", // Russia
  "+250": "RW", // Rwanda
  "+966": "SA", // Saudi Arabia
  "+677": "SB", // Solomon Islands
  "+248": "SC", // Seychelles
  "+249": "SD", // Sudan
  "+46": "SE", // Sweden
  "+65": "SG", // Singapore
  "+290": "SH", // Saint Helena, Ascension and Tristan da Cunha
  "+386": "SI", // Slovenia
  "+421": "SK", // Slovakia
  "+232": "SL", // Sierra Leone
  "+378": "SM", // San Marino
  "+221": "SN", // Senegal
  "+252": "SO", // Somalia
  "+597": "SR", // Suriname
  "+211": "SS", // South Sudan
  "+239": "ST", // Sao Tome and Principe
  "+503": "SV", // El Salvador
  "+1": "SX", // Sint Maarten (Dutch part)
  "+963": "SY", // Syria
  "+268": "SZ", // Eswatini
  "+886": "TW", // Taiwan
  "+992": "TJ", // Tajikistan
  "+690": "TK", // Tokelau
  "+670": "TL", // Timor-Leste
  "+993": "TM", // Turkmenistan
  "+216": "TN", // Tunisia
  "+676": "TO", // Tonga
  "+90": "TR", // Turkey
  "+1": "TT", // Trinidad and Tobago
  "+688": "TV", // Tuvalu
  "+886": "TW", // Taiwan
  "+255": "TZ", // Tanzania
  "+380": "UA", // Ukraine
  "+256": "UG", // Uganda
  "+1": "UM", // United States Minor Outlying Islands
  "+1": "US", // United States
  "+598": "UY", // Uruguay
  "+998": "UZ", // Uzbekistan
  "+379": "VA", // Vatican City
  "+1": "VC", // Saint Vincent and the Grenadines
  "+58": "VE", // Venezuela
  "+1": "VG", // British Virgin Islands
  "+1": "VI", // U.S. Virgin Islands
  "+84": "VN", // Vietnam
  "+678": "VU", // Vanuatu
  "+681": "WF", // Wallis and Futuna
  "+685": "WS", // Samoa
  "+383": "XK", // Kosovo
  "+967": "YE", // Yemen
  "+262": "YT", // Mayotte
  "+27": "ZA", // South Africa
  "+260": "ZM", // Zambia
  "+263": "ZW", // Zimbabwe
};

const FlagCountryName = ({ countryCode }) => {
  const { t } = useTranslation();

  const [SvgComponent, setSvgComponent] = useState(null);
  let countryCode2 = countryCodeMap[countryCode];
  useEffect(() => {
    const loadSvg = async () => {
      try {
        // Dynamically import the SVG file based on the country code
        const countryIcon = await import(
          `../../../assets/images/CountryFlag/${countryCode2.toLowerCase()}.svg`
        );
        setSvgComponent(countryIcon);
      } catch (error) {
        console.error("Error loading SVG:", error);
        setSvgComponent(null);
      }
    };

    loadSvg();

    // Clean up effect
    return () => {
      setSvgComponent(null);
    };
  }, [countryCode]);

  return SvgComponent ? (
    <img src={SvgComponent.default} width={18} />
  ) : (
    <div className={styles["noflag-text"]}>{t("No-flag")}</div>
  );
};

export default FlagCountryName;
