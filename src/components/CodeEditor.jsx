import React, { useState, useRef } from "react";
import { Box, Grid } from "@chakra-ui/react";
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
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      gap={10}
      width="100%"
    >
      <Box>
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
    </Grid>
  );
};
