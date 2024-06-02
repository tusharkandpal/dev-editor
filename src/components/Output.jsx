import React, { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { TOAST_DURATION } from "../constants";

export const Output = ({ editorRef, language, languageVersion }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode || !languageVersion) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(
        sourceCode,
        language,
        languageVersion
      );
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error(error);
      toast({
        title: " An error occurred",
        description: error.message || "Unable to run code",
        status: "error",
        duration: TOAST_DURATION,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, index) => <Text key={index}>{line}</Text>)
          : "Click 'Run Code' to see the output here"}
      </Box>
    </Box>
  );
};
