/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
// import { RiGlobalLine } from "react-icons/ri";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

function GoogleTranslateProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }

      window.googleTranslateElementInit = () => {
        if (window.google && !isInitialized) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,fr,iu,es,de,ar,pt,hi,bn",
              layout:
                window.google.translate.TranslateElement.InlineLayout
                  .HORIZONTAL,
            },
            "google_translate_element"
          );
          setIsInitialized(true);
        }
      };
    };

    addGoogleTranslateScript();
  }, [isInitialized]);

  return (
    <>
      <div id="google_translate_element" className="hidden"></div>
      {children}
    </>
  );
}

export default GoogleTranslateProvider;

export function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    // Fetch stored language from localStorage and set default language if not available
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      setSelectedLanguage(storedLang);
    } else {
      setSelectedLanguage("en"); // Default to English if no language is stored
    }

    // Set the initial googtrans cookie based on stored or default language
    if (storedLang === "en" || !storedLang) {
      document.cookie =
        "googtrans=/en/en; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    } else {
      document.cookie = `googtrans=/en/${storedLang}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    }
  }, [selectedLanguage]);

  const handleChange = (newLang: string) => {
    if (!newLang) return;

    if (newLang) {
      setSelectedLanguage(newLang);
      localStorage.setItem("selectedLanguage", newLang);

      if (newLang === "en") {
        // Set the googtrans cookie for English
        document.cookie =
          "googtrans=/en/en; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
      } else {
        document.cookie = `googtrans=/en/${newLang}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
      }

      // Manually trigger the language change in Google Translate
      const select = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement;
      if (select) {
        select.value = newLang;
        select.dispatchEvent(new Event("change"));
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* <span className="hidden text-gray-700 font-medium md:flex justify-center items-center gap-1">
        <RiGlobalLine />
      </span> */}
      <Select onValueChange={handleChange} value={selectedLanguage}>
        <SelectTrigger className="w-auto !h-6 md:!h-auto rounded-full !border-none font-bold text-black/70 bg-white">
          <SelectValue>
            {{
              en: "English",
              fr: "French",
              iu: "Inuktut (Syllabics)",
              es: "Spanish",
              de: "German",
              ar: "Arabic",
              pt: "Portuguese",
              hi: "Hindi",
              bn: "Bangla",
            }[selectedLanguage] || "Select a language"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">French</SelectItem>
          <SelectItem value="iu">Inuktut (Syllabics)</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="de">German</SelectItem>
          <SelectItem value="ar">Arabic</SelectItem>
          <SelectItem value="pt">Portuguese</SelectItem>
          <SelectItem value="hi">Hindi</SelectItem>
          <SelectItem value="bn">Bangla</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}