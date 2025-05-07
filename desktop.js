import { html } from 'htm/react';
import { createRoot } from 'react-dom/client';
import { app } from "./index.js";
await app.ready();
const peer = app.getPeer();

// HOW TO SEND TRANSACTIONS (commands)
// executing a transaction
//await tx("/tx --command '"+buy_order+"'", peer);
// or simulate
//await tx("/tx --command '"+buy_order+"' --sim 1", peer);

// use the react html renderer (generated won't work in desktop context)
const root = createRoot(document.querySelector('#root'))
root.render(html`
  <main>
    Your public key ${peer.wallet.publicKey}
  </main>
`)

