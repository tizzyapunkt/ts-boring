import { defaults } from 'jest-config';
import { createDefaultEsmPreset } from 'ts-jest';

/** @type {import('jest').Config} */
const config = {
  ...defaults,
  ...createDefaultEsmPreset(),
};

export default config;
