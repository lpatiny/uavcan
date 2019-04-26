'use strict';

const fs = require('fs');
const { join } = require('path');

const convertOne = require('./convertOne');

const source = join(__dirname, '../../public_regulated_data_types');
const destination = join(__dirname, '../../dsdlJSON');
const combined = join(__dirname, '../kinds.json');

function convert() {
  let data = {};
  processFolder(source, data);
  fs.writeFileSync(combined, JSON.stringify(data, undefined, 2));
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
        let parts = file.split('.');
        data[parts[0]] = result;

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
