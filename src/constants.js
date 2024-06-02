const SUPPORTED_LANGUAGES = ["javascript", "typescript", "python", "java", "csharp", "php"]

const CODE_SNIPPETS = {
    javascript: `\nfunction log(text) {\n\tconsole.log(text);\n}\n\nlog("Hello Alex");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
    python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    java: `\nimport java.util.*;\nimport java.lang.*;\nimport java.math.*;\nimport java.net.*;\nimport java.io.*;\n\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    csharp:
        'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
    php: "<?php\n\n$name = 'Alex';\necho $name;\n"
};

const ACTIVE_COLOR = "blue.400";
const BG_COLOR = "gray.900";
const LANG_VERSION_COLOR = "gray.600";
const TOAST_DURATION = 5000;

export { SUPPORTED_LANGUAGES, CODE_SNIPPETS, ACTIVE_COLOR, BG_COLOR, LANG_VERSION_COLOR, TOAST_DURATION };
