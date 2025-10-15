# för och starta projektet:

npm install
npm run dev

# Mina reflektioner kring pusslet:

- tid:
  Tidsmässigt skulle jag vilja säga det tog mellan 15-20h. Jag fick först gå igenom hur spelet är uppbyggt samt vad jag behöver få med, vilka funktioner jag behöver, hur och var ska jag börja. Och den researchen tog lite tid med, förberedelsen.

- antaganden och brister:
  Jag antog först att allting skulle va lösbart och började sedan fundera kring de.
  Tänk ett scenario om att det är så många rader och columner så det blir i princip omöjligt eller tar väldigt lång tid att lösa? Så sitter man där länge och försöker lösa det. När det i själva verket ibland inte går att lösa imed vissa brickor är felplacerade. Då var jag tvungen att ha en lösning på detta så jag googlade jag hittade en princip som kallas "Inversionsparitet eller paritetskontroll" och det är den jag använt mig av i att checka om de går att lösa.

  I de saker jag anser att jag hade brister har ja försökt lösa detta på bästa vis. De jag påpekade föregående va en sån. En annan var att jag inte använt mig av try/catch vilket kan vara bra vid felhantering och fånga oväntade fel. En annan brist jag med märkte var att funktionerna ibland var väldigt långa, jag kanske kunde brytit ut dem ytterliggare och även gjort fler utils filer.

- mest nöjd med:
  Jag tycker att jag är väldigt bra på att strukturera kod och har även fått det som positiv feedback från mina lärare på YH. Så det är jag nöjd med!
  Även att även fast jag tycker denna uppgiften var svår och denna upggiften rörde områden jag inte är van vid så är jag nöjd med hur jag "tacklade" situationen och sökte efter info för att lösa den så bra som möjligt.
  En funktion som jag är extra nöjd med hur jag löste är movietile.
  Jag tyckte en del av de funktionerna man skulle skriva va knepiga men DEN var mest knepig och ja körde även fast men löste de till slut och jag är nöjd hur resultatet blev!

- extra:
  Jag valde som CSS verktyg att använda mig av Bootstrap men gjorde också en del inline css och vanlig css för att visa jag kan det med. Sen kan man använda mediaqueries med för responsivitet och kombinera de me bootstrapen, men för denna uppgiften anser jag inte de behövdes så mycket av den varan och jag tycker de ser bra ut på alla skärmstorlekar

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

#
