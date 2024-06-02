import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import {
  ACTIVE_COLOR,
  BG_COLOR,
  SUPPORTED_LANGUAGES,
  CODE_SNIPPETS,
  LANG_VERSION_COLOR,
  TOAST_DURATION,
} from "../constants";
import { getRuntimeLanguages } from "../api";

export const LanguageSelector = ({
  language,
  languageVersion,
  onSelect,
  setLanguage,
  setLanguageVersion,
  setValue,
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [languagesList, setLanguagesList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await getRuntimeLanguages();
        const filterSupportedLangs = result.filter(
          (lang) =>
            SUPPORTED_LANGUAGES.includes(lang.language) &&
            lang.runtime !== "deno"
        );
        setLanguagesList(filterSupportedLangs);
        setLanguage(filterSupportedLangs[0].language);
        setLanguageVersion(filterSupportedLangs[0].version);
        setValue(CODE_SNIPPETS[filterSupportedLangs[0].language]);
      } catch (error) {
        console.error(error);
        toast({
          title: " An error occurred",
          description: error.message || "Unable to load supported languages",
          status: "error",
          duration: TOAST_DURATION,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Box ml={2} mb={4}>
      <Text mb={2} fontSize="lg">
        Language
      </Text>
      <Menu isLazy>
        <MenuButton as={Button} isLoading={isLoading}>
          {language} (v{languageVersion}) 👇
        </MenuButton>
        <MenuList bg="#110c1b">
          {languagesList.map((lang) => (
            <MenuItem
              key={`${lang.language}_${Math.random()}`}
              color={lang.language === language ? ACTIVE_COLOR : ""}
              bg={lang.language === language ? BG_COLOR : "transparent"}
              _hover={{
                color: ACTIVE_COLOR,
                bg: BG_COLOR,
              }}
              onClick={() => onSelect(lang.language, lang.version)}
            >
              {lang.language}
              &nbsp;
              <Text as="span" color={LANG_VERSION_COLOR} fontSize="sm">
                ({lang.version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>{" "}
    </Box>
  );
};
