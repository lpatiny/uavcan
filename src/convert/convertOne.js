'use strict';

const camelCase = require('camelcase');

function convertOne(content, allDataTypes, file) {
  let result = {
    id: file.id,
    description: '',
    type: isNaN(file.name.split('.')[0]) ? 'object' : 'message',
    message: {
      variables: [],
      statics: []
    },
    request: {
      variables: [],
      statics: []
    },
    response: {
      variables: [],
      statics: []
    }
  };

  let currentVariable;
  let lines = content.split(/[\r\n]/);
  let inComment = false;
  let transferType = result.message;

  for (let line of lines) {
    let fields = line.split(/[ \t]+/);
    if (line.startsWith('#')) {
      if (line === '#') {
        if (inComment) {
          inComment = false;
        } else {
          inComment = true;
        }
      } else {
        if (result.description) result.description += '\n';
        result.description += line.replace(/# /, '');
      }
    } else if (line.startsWith('---')) {
      result.request = transferType;
      delete result.message;
      transferType = result.response;
      result.type = 'service';
    } else if (line.startsWith('@union')) {
      // handle unions
      result.type = 'union';
    } else if (fields[1] && fields[1].match(/^[A-Z_]+$/)) {
      // a constant
      // todo need to deals with the definitions of constants
      transferType.statics.push(line);
    } else if (fields[0].match(/^(float|int|uint|void)[0-9]+$/)) {
      currentVariable = getVar(fields);
      transferType.variables.push(currentVariable);
    } else if (fields[0].match(/^(float|int|uint)[0-9]+\[.*$/)) {
      currentVariable = getVarArray(fields);
      transferType.variables.push(currentVariable);
    } else if (fields[0].match(/^[A-Z].[A-z]+$/)) {
      // handle linked union fields and types
      currentVariable = getObject(fields, allDataTypes, file);
      transferType.variables.push(currentVariable);
    } else if (fields[0].match(/^[A-Z].[A-z]+\[.*$/)) {
      // handle linked array union fields and types
      currentVariable = getObjectArray(fields, allDataTypes, file);
      transferType.variables.push(currentVariable);
    }
  }

  // clean up object
  if (result.type === 'service') {
    delete result.message;
  } else {
    delete result.request;
    delete result.response;
  }

  return result;
}

module.exports = convertOne;

function getObject(fields, allDataTypes, file) {
  let variable = {};

  let objectKind = fields[0];
  if (!fields[0].includes('.')) objectKind = `${file.parent}.${objectKind}`;
  if (!allDataTypes[objectKind]) {
    console.error(`Unknown object type: ${objectKind}`, file);
  }
  variable.type = allDataTypes[objectKind].type;
  variable.kind = objectKind;
  if (fields[1]) variable.name = camelCase(fields[1]);
  variable.description = fields
    .slice(2)
    .filter((value) => value !== '#')
    .join(' ');
  return variable;
}

function getObjectArray(fields, allKinds, file) {
  let variable = parseArraySize(fields[0]);
  let objectKind = fields[0].replace(/\[.*$/g, '');
  if (!fields[0].includes('.')) objectKind = `${file.parent}.${objectKind}`;
  variable.type = 'array';
  variable.kind = {
    kind: objectKind,
    type: 'object',
    bits: Number(fields[0].replace(/[a-z]+([0-9]+).*/, '$1'))
  };
  if (!allKinds[variable.kind.kind]) {
    console.error(`Unknown array object type: ${variable.kind.kind}`);
    variable.kind.type = 'object';
  } else {
    variable.kind.type = allKinds[variable.kind.kind];
  }

  if (fields[1]) variable.name = camelCase(fields[1]);
  variable.description = fields
    .slice(2)
    .filter((value) => value !== '#')
    .join(' ');

  return variable;
}

function getVar(fields) {
  let variable = {};
  variable.type = 'var';
  variable.kind = fields[0].replace(/[0-9u]/g, '').toLowerCase();
  variable.unsigned = fields[0].includes('u');
  variable.bits = Number(fields[0].replace(/[a-z]/g, ''));
  if (fields[1]) variable.name = camelCase(fields[1]);
  variable.description = fields
    .slice(2)
    .filter((value) => value !== '#')
    .join(' ');
  return variable;
}

function getVarArray(fields) {
  let variable = parseArraySize(fields[0]);
  variable.type = 'array';
  variable.kind = {
    type: 'var',
    kind: fields[0].replace(/[^a-tv-z]/g, ''),
    unsigned: fields[0].includes('u'),
    bits: Number(fields[0].replace(/[a-z]+([0-9]+).*/, '$1'))
  };
  variable.name = camelCase(fields[1]);
  variable.description = fields
    .slice(2)
    .filter((value) => value !== '#')
    .join(' ');
  return variable;
}

function parseArraySize(value) {
  let bracket = value.replace(/^.*\[(.*)\].*/, '$1');
  if (!isNaN(bracket)) {
    return { length: Number(bracket) };
  }
  if (bracket.startsWith('<=')) {
    return { length: Number(bracket.substring(2)), range: true };
  }
  return {};
}
