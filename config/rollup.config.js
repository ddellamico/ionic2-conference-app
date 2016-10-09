'use strict';

const rollupConfig = require('@ionic/app-scripts/config/rollup.config');
const replace = require('rollup-plugin-replace');

console.log('Editing default ionic configuration');

const nodeEnv = JSON.stringify(process.env.NODE_ENV) || 'development';
const platform = JSON.stringify(process.env.PLATFORM) || 'android';

rollupConfig.plugins.push(replace({
    'process.env.NODE_ENV': nodeEnv,
    'process.env.API_URL': JSON.stringify(process.env.API_URL),
    'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
    'process.env.CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET),
    'process.env.PLATFORM': platform
}));

module.exports = rollupConfig;
