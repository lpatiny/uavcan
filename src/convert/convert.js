'use strict';

const fs = require('fs');
const { join } = require('path');

const find = require('find');

const convertOne = require('./convertOne');

const source = join(__dirname, '../../public_regulated_data_types');
const destination = join(__dirname, '../../dsdlJSON');
const combined = join(__dirname, '../kinds.json');

// we will process the custom types first, file name does not start with a number

function convert() {
  let files = getFiles(source);
  let kinds = createTypes(files);
  let full = processFiles(files, kinds);
  fs.writeFileSync(combined, JSON.stringify(full, undefined, 2));
}

function createTypes(files) {
  let kinds = {};
  files = files.filter((file) => isNaN(file.id));
  for (let file of files) {
    let definition = fs.readFileSync(file.filename, 'utf8');
    kinds[file.name] = definition.includes('@union') ? 'union' : 'object';
  }
  return kinds;
}

function processFiles(files, kinds) {
  let full = {};

  for (let file of files) {
    let definition = fs.readFileSync(file.filename, 'utf8');
    let result = convertOne(definition, kinds);
    full[file.id] = result;

    fs.writeFileSync(
      file.targetFilename,
      JSON.stringify(result, undefined, 2),
      'utf8'
    );
  }
  return full;
}

function getFiles(source) {
  let files = find.fileSync(/.*uavcan$/, source);
  files = files.map((file) => {
    let info = {};
    info.filename = file;
    info.dir = file.replace(/(.*)\/(.*)$/, '$1');
    info.name = file.replace(/.*\//, '').replace('.uavcan', '');
    info.targetFilename = join(destination, `${info.name}.json`);
    info.targetDir = info.dir.replace(source, destination);
    info.id = info.name.split('.')[0];
    return info;
  });
  files = files.sort((a, b) => {
    let aNumber = !isNaN(a.id);
    let bNumber = !isNaN(b.id);
    if (aNumber && !bNumber) return 1;
    if (bNumber && !aNumber) return -1;
    if (aNumber && bNumber) return a.id - b.id;
    if (a.id < b.id) return -1;
    return 1;
  });
  return files;
}

convert();
