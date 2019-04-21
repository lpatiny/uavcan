'use strict';

const camelCase = require('camelcase');

function convertOne(content) {
  let result = {
    description: '',
    type: 'message',
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
    } else if (fields[0].match(/^(float|int|uint)[0-9]+$/)) {
      currentVariable = getVar(fields);
      transferType.variables.push(currentVariable);
    } else if (fields[0].match(/^(float|int|uint)[0-9]+\[.*$/)) {
      currentVariable = getVarArray(fields);
      transferType.variables.push(currentVariable);
    }
  }

  // clean up object
  if (
    result.request &&
    result.request.variables.length === 0 &&
    result.request.statics.length === 0
  ) {
    delete result.request;
  }
  if (
    result.response &&
    result.response.variables.length === 0 &&
    result.response.statics.length === 0
  ) {
    delete result.response;
  }
  if (
    result.message &&
    result.message.variables.length === 0 &&
    result.message.statics.length === 0
  ) {
    delete result.message;
  }

  return result;
}

module.exports = convertOne;

function getVar(fields) {
  let variable = {};
  variable.kind = fields[0].replace(/[0-9u]/g, '').toLowerCase();
  if (fields[0].includes('u')) variable.unsigned = true;
  variable.bits = Number(fields[0].replace(/[a-z]/g, ''));
  variable.name = camelCase(fields[1]);
  variable.description = fields
    .slice(2)
    .filter((value) => value !== '#')
    .join(' ');
  return variable;
}

function getVarArray(fields) {
  let variable = parseArraySize(fields[0]);
  variable.kind = `${fields[0].replace(/[^a-tv-z]/g, '')}Array`;
  if (fields[0].includes('u')) variable.unsigned = true;
  variable.bits = Number(fields[0].replace(/[a-z]+([0-9]+).*/, '$1'));
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
