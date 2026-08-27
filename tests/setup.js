// jsdom's atob rejects base64 payloads that Node accepts, which breaks the Vue
// compiler's `entities` dependency when it decodes its HTML entity table.
globalThis.atob = (data) => Buffer.from(data, 'base64').toString('binary')
globalThis.btoa = (data) => Buffer.from(data, 'binary').toString('base64')
