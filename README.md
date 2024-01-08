# Calculator Fork for Automated Test Trials

This repository is a fork from the main [Calculator repo](https://github.com/andrewagain/calculator). It has been adapted for a trial to test automatically generated test cases.

## Changes Made

- Prepared the packages for the trial.
- Modified one line of code in the `operate` file (line 16) to make this line accessible.

## Issues

- You can ignore issues like vulnerabilities, npm WARN deprecated or the report of DeprecationWarning for `punycode`, because it does not affect any functionality.

## Reproducing the Trial

To reproduce the trial, follow these steps:

1. Install dependencies using npm:

    ```bash
    npm install
    ```

2. Run the test cases to obtain code coverage:

    ```bash
    npm run test
    ```

## Stryker Mutation Testing

To use Stryker you have to downgrade Jest to version ^27.

```bash
npm install --save-dev jest@27 jest-environment-jsdom@27
```

If you want to use `npm run test` again execute:

 ```bash
npm install --save-dev jest@latest jest-environment-jsdom@latest
```

To run stryker use:

```bash
npx stryker run
```
