'use strict';

const fs = require('fs');
const { join } = require('path');

const convertOne = require('./convertOne');

const source = join(__dirname, '../../dsdl');
const destination = join(__dirname, '../../dsdlJSON');

function convert() {
  let data = {};
  processFolder(source, data);
}

function processFolder(source, data) {
  let files = fs.readdirSync(source);
  for (let file of files) {
    let fullname = join(source, file);
    let stat = fs.statSync(fullname);
    if (stat.isDirectory()) {
      processFolder(fullname, data);
    } else {
      if (file.endsWith('.uavcan')) {
        let definition = fs.readFileSync(fullname, 'utf8');
        data[file] = {
          definition
        };
        let result = convertOne(definition);
        data[file].result = result;

        let targetName = fullname
          .replace(source, destination)
          .replace('.uavcan', '.json');
        fs.writeFileSync(
          targetName,
          JSON.stringify(result, undefined, 2),
          'utf8'
        );
      }
    }
  }
}

convert();
