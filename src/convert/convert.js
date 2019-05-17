'use strict';

const fs = require('fs');
const { join } = require('path');

const find = require('find');

const dataTypes = require('./getDataTypeSignatures')();
const convertOne = require('./convertOne');

const source = join(__dirname, '../../public_regulated_data_types/');
const destination = join(__dirname, '../../dsdlJSON');
const combined = join(__dirname, '../dataTypes.json');

// we will process the custom types first, file name does not start with a number

function convert() {
  let files = getFiles(source);
  createTypes(files);
  let full = processFiles(files, dataTypes);
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

function processFiles(files, dataTypes) {
  let full = {};

  for (let file of files) {
    let definition = fs.readFileSync(file.filename, 'utf8');
    let result = convertOne(definition, dataTypes, file);
    if (dataTypes[file.id]) {
      result.info = dataTypes[file.id];
    }
    dataTypes[file.id] = result;

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
    let dir = info.dir.replace(source, '').replace(/\//g, '.');
    let nameParts = info.name.split('.');
    let begin = nameParts[0];
    info.parent = dir;
    if (isNaN(begin)) {
      info.id = `${dir}.${nameParts[0]}`;
    } else {
      info.id = `${dir}.${nameParts[1]}`;
    }
    return info;
  });
  files = files.sort((a, b) => {
    if (a.name < b.name) return 1;
    return -1;
  });
  return files;
}

convert();
