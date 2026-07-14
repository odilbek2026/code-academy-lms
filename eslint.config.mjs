import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // O'zbek tilida apostrof harfning bir qismi (o', g'), shuning uchun
      // bu qoida o'chirilgan — matnda apostrofni escape qilish shart emas.
      "react/no-unescaped-entities": "off",
      // React Compiler'ning tajribaviy qoidalari — o'yinlardagi xavfsiz
      // pattern'larni (init effect, taymer, o'tgan vaqtni hisoblash) noto'g'ri
      // xato deb belgilaydi. Loyihada React Compiler ishlatilmagani uchun o'chirilgan.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
