import React, { useState, useRef } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { LanguageSelector, Output } from "./components";
import { CODE_SNIPPETS } from "../constants";

export const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("");
  const [languageVersion, setLanguageVersion] = useState("");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language, version) => {
    setLanguage(language);
    setLanguageVersion(version);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector
            language={language}
            languageVersion={languageVersion}
            onSelect={onSelect}
            setLanguage={setLanguage}
            setLanguageVersion={setLanguageVersion}
            setValue={setValue}
          />
          <Editor
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output
          editorRef={editorRef}
          language={language}
          languageVersion={languageVersion}
        />
      </HStack>
    </Box>
  );
};
