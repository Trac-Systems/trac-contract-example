import {getStorePath} from './src/functions.js';
import {App} from './src/app.js';
export * from 'trac-peer/src/functions.js'
import {default as Trac20Protocol} from "./contract/protocol.js";
import {default as Trac20Contract} from "./contract/contract.js";

console.log('Storage path:', getStorePath());

const msb_opts = {};
msb_opts.bootstrap = 'a4951e5f744e2a9ceeb875a7965762481dab0a7bb0531a71568e34bf7abd2c53';
msb_opts.channel = '0002tracnetworkmainsettlementbus';
msb_opts.store_name = getStorePath() + '/t20msb';

const peer_opts = {};
peer_opts.protocol = Trac20Protocol;
peer_opts.contract = Trac20Contract;
peer_opts.bootstrap = '58ea469383feba0f382877b18960dd59ea7aabd8fd57b221631cf9609aa232e5';
peer_opts.channel = '00000000000000000000000000trac20';
peer_opts.store_name = getStorePath() + '/trac20';
peer_opts.enable_logs = true;
peer_opts.enable_txlogs = true;

export const app = new App(msb_opts, peer_opts);
await app.start();
