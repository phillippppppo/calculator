/**
 * @jest-environment jsdom
 */

import React from "react";
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from "./component/App";
import Button from "./component/Button";
import ButtonPanel from "./component/ButtonPanel";
import Display from "./component/Display";
import calculate from "./logic/calculate";
import isNumber from "./logic/isNumber";
import operate from "./logic/operate";
import chai from "chai";
import * as testingLibrary from '@testing-library/react';

//START

