import axios from 'axios';

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})

const executeCode = async (sourceCode, language, version) => {

    const response = await API.post("/execute", {
        "language": language,
        "version": version,
        "files": [
            {
                "content": sourceCode
            }
        ],
    })

    return response.data;
}

const getRuntimeLanguages = async () => {

    const response = await API.get("/runtimes");
    return response.data;
}

export { executeCode, getRuntimeLanguages };
