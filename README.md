# Calculator Fork for Automated Test Trials

This repository is a fork from the main [calculator repo](https://github.com/andrewagain/calculator). It has been adapted for a trial to test automatically generated test cases.

## Changes Made

- Prepared the packages for the trial
- Configure Stryker and Jest
- Modified one line of code in the `operate` file (line 16) to make this line accessible, because of the use of `big.js` the operation `two === "0"` wasn´t possible.
- Added test suites
- Added data from the OpenAI-threads
- Added Insomnia file `OpenAI_API`

## Issues

- You can ignore issues like vulnerabilities, npm WARN deprecated or the report of DeprecationWarning for `punycode`, because it does not affect any functionality.

## Reproducing the trial

To reproduce the trial and receive the test results, follow these steps:

1. Install dependencies using npm:

    ```bash
    npm install
    ```

2. Run the test cases to obtain the code coverage. To receive the code coverage of each test suite, you may have to comment out other test suites:

    ```bash
    npm run test
    ```

## Stryker Mutation Testing

To use Stryker you have to downgrade Jest to version ^27, because it has problems to handle versions above.

```bash
npm install --save-dev jest@27 jest-environment-jsdom@27
```

To run stryker use:

```bash
npx stryker run
```

If you did downgrade and want to use `npm run test` again, you have to execute:

```bash
npm install --save-dev jest@latest jest-environment-jsdom@latest
```
