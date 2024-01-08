# Calculator Fork for Automated Test Trials

This repository is a fork from the main [Calculator repo](https://github.com/andrewagain/calculator). It has been adapted for a trial to test automatically generated test cases.

## Changes Made

- Prepared the packages for the trial.
- Modified one line of code in the `operate` file (line 16) to make this line accessible.

## Issues

- You can ignore issues like vulnerabilities or the report of DeprecationWarning for `punycode`, because it does not affect any functionality.

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

For Stryker mutation testing, additional dependencies are required. Install them using the following commands:

```bash
npm install --save-dev jest@27 jest-environment-jsdom@27
```

The need to downgrade Jest, is because Stryker has problems to handle Jest-versions above 27.

To run stryker use:

```bash
 npx stryker run
```
