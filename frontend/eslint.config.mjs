import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals"),
    // Ignore react-compiler warnings for useEffect patterns used across the project
    {
        rules: {
            "react-compiler/react-compiler": "off",
        },
    },
];

export default eslintConfig;
