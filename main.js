#!/usr/bin/env node

const dgram = require('dgram')
const client = dgram.createSocket('udp4')
const { Command } = require('commander')

const hexStringToByte = (hexString) => {
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2)
  }
  return parseInt(hexString, 16)
}

const sendByte = async (ip, port, byte) => {
  return new Promise((resolve, reject) => {
    const data = Buffer.from([byte])
    client.send(data, port, ip, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// Start here

const options = new Command()
  .name('byteflyer')
  .description('Send a byte via UDP')
  .version('0.1.0')
  .requiredOption('-i, --ip <char>', 'IP address')
  .option('-p, --port <int>', 'port', 1234)
  .requiredOption('-b, --byte <char>', 'byte to send (HEX)')
  .parse()
  .opts();

(async () => {
  await sendByte(options.ip, options.port, hexStringToByte(options.byte))
  client.close()
})()
