import {getStorePath} from './src/functions.js';
import {App} from './src/app.js';
import {default as SampleProtocol} from "./contract/protocol";
import {default as SampleContract} from "./contract/contract";
export * from 'trac-peer/src/functions.js'

console.log('Storage path:', getStorePath());

///// MSB SETUP
// To run this example, you don't need to create your own MSB
// Instead go with the options as-is. The below bootstrap is an MSB testnet (gasless).
const msb_opts = {};
msb_opts.bootstrap = 'cdcb126766cb2673bc14f3e91be61150504d0f97e5055bbc430193091fe96bba';
msb_opts.channel = '0000000000000000000000examplemsb';
msb_opts.store_name = getStorePath() + '/msb';

///// SAMPLE CONTRACT SETUP
// The sample contract needs to be deployed first.
// See the README.md for further information.
const peer_opts = {};
peer_opts.protocol = SampleProtocol;
peer_opts.contract = SampleContract;
peer_opts.bootstrap = '787320f2430375a5fb2e15b13b92aa21014224de398e05846d0b6e0892ac5f07';
peer_opts.channel = '0000000000000000000000000example';
peer_opts.store_name = getStorePath() + '/example';
peer_opts.api_tx_exposed = true;
peer_opts.api_msg_exposed = true;

export const app = new App(msb_opts, peer_opts);
await app.start();