## Setup

### [Node](https://github.com/nvm-sh/nvm)

1. [install nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if not done yet
1. use latest node version
    ```sh
    nvm use node || nvm install node
    ```

### [NextJs](https://nextjs.org)

1. create nextjs app in the parent folder

    ```sh
    npx create-next-app@latest --typescript <project-name>
    # or
    pnpm create next-app -- --typescript <project-name>
    ```

### [PNPM](https://pnpm.io/)

1. pin nodejs version in the project

    ```sh
    node -v > .nvmrc
    ```

1. remove the `package.json` and `node_modules/`

    ```sh
    rm package.json
    rm -rf node_modules
    ```

1. install pnpm globally

    ```sh
    npm i -g pnpm
    ```

1. install dependencies

    ```sh
    pnpm install
    ```

### [Eslint and Prettier](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb)

1. remove `.eslintrc.json`

    ```sh
    rm .eslintrc.json
    ```

1. install prettier

    ```sh
    pnpm i -D prettier eslint-config-prettier eslint-plugin-prettier
    ```

1. add `.eslintrc.js`

    ```js
    module.exports = {
        extends: ['next', 'prettier', 'plugin:prettier/recommended'],
    };
    ```

1. add `.prettier.js`

    ```js
    /** @type {import('prettier').Config} */
    module.exports = {
        tabWidth: 2,
        overrides: [
            {
                files: '*.md',
                options: {
                    tabWidth: 4,
                },
            },
        ],
        semi: true,
        singleQuote: true,
        printWidth: 80,
        trailingComma: 'es5',
    };
    ```

### [Jest](https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler)

1. install jest and react-testing-library
    ```sh
    pnpm i -D jest @testing-library/react @testing-library/jest-dom
    ```
1. add `__tests__/` folder
    ```sh
    mkdir -p __tests__
    ```
1. add `__tests__/jest.config.js`

    ```js
    const nextJest = require('next/jest');

    const createJestConfig = nextJest({
        dir: './',
    });

    const customJestConfig = {
        setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
        moduleDirectories: ['node_modules', '<rootDir>/'],
        testRegex: '__tests__/.*\\.test\\.tsx?$',
        testEnvironment: 'jest-environment-jsdom',
    };

    module.exports = createJestConfig(customJestConfig);
    ```

1. add `__tests__/jest.setup.ts`
    ```ts
    import '@testing-library/jest-dom/extend-expect';
    ```
1. add to `package.json`
    ```json
    {
        "scripts": {
            "test": "jest --config ./__tests__/jest.config.js",
            "test:watch": "jest --config ./__tests__/jest.config.js --watch"
        }
    }
    ```
