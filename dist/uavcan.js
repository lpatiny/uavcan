/**
 * uavcan
 * @version v0.0.5
 * @link https://github.com/octanis-instruments/uavcan#readme
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["UAV"] = factory();
	else
		root["UAV"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module) {

module.exports = {"1":{"description":"This message is used for dynamic Node ID allocation.\nWhen a node needs to request a node ID dynamically, it will transmit an anonymous message transfer of this type.\nIn order to reduce probability of CAN ID collisions when multiple nodes are publishing this request, the CAN ID\nfield of anonymous message transfer includes a Discriminator, which is a special field that has to be filled with\nrandom data by the transmitting node. Since Discriminator collisions are likely to happen (probability approx.\n0.006%), nodes that are requesting dynamic allocations need to be able to handle them correctly. Hence, a collision\nresolution protocol is defined (alike CSMA/CD). The collision resolution protocol is based on two randomized\ntransmission intervals:\n- Request period - Trequest.\n- Follow up delay - Tfollowup.\nRecommended randomization ranges for these intervals are documented in the constants of this message type (see below).\nRandom intervals must be chosen anew per transmission, whereas the Discriminator value is allowed to stay constant\nper node.\nIn the below description the following terms are used:\n- Allocator - the node that serves allocation requests.\n- Allocatee - the node that requests an allocation from the Allocator.\nThe response timeout is not explicitly defined for this protocol, as the Allocatee will request the allocation\nTrequest units of time later again, unless the allocation has been granted. Despite this, the implementation can\nconsider the value of FOLLOWUP_TIMEOUT_MS as an allocation timeout, if necessary.\nOn the allocatee's side the protocol is defined through the following set of rules:\nRule A. On initialization:\n1. The allocatee subscribes to this message.\n2. The allocatee starts the Request Timer with a random interval of Trequest.\nRule B. On expiration of Request Timer:\n1. Request Timer restarts with a random interval of Trequest.\n2. The allocatee broadcasts a first-stage Allocation request message, where the fields are assigned following values:\n   node_id                 - preferred node ID, or zero if the allocatee doesn't have any preference\n   first_part_of_unique_id - true\n   unique_id               - first MAX_LENGTH_OF_UNIQUE_ID_IN_REQUEST bytes of unique ID\nRule C. On any Allocation message, even if other rules also match:\n1. Request Timer restarts with a random interval of Trequest.\nRule D. On an Allocation message WHERE (source node ID is non-anonymous) AND (allocatee's unique ID starts with the\nbytes available in the field unique_id) AND (unique_id is less than 16 bytes long):\n1. The allocatee waits for Tfollowup units of time, while listening for other Allocation messages. If an Allocation\n   message is received during this time, the execution of this rule will be terminated. Also see rule C.\n2. The allocatee broadcasts a second-stage Allocation request message, where the fields are assigned following values:\n   node_id                 - same value as in the first-stage\n   first_part_of_unique_id - false\n   unique_id               - at most MAX_LENGTH_OF_UNIQUE_ID_IN_REQUEST bytes of local unique ID with an offset\n                             equal to number of bytes in the received unique ID\nRule E. On an Allocation message WHERE (source node ID is non-anonymous) AND (unique_id fully matches allocatee's\nunique ID) AND (node_id in the received message is not zero):\n1. Request Timer stops.\n2. The allocatee initializes its node_id with the received value.\n3. The allocatee terminates subscription to Allocation messages.\n4. Exit.\nRecommended randomization range for request period.\nThese definitions have an advisory status; it is OK to pick higher values for both bounds, as it won't affect\nprotocol compatibility. In fact, it is advised to pick higher values if the target application is not concerned\nabout the time it will spend on completing the dynamic node ID allocation procedure, as it will reduce\ninterference with other nodes, possibly of higher importance.\nThe lower bound shall not be lower than FOLLOWUP_TIMEOUT_MS, otherwise the request may conflict with a followup.\nRecommended randomization range for followup delay.\nThe upper bound shall not exceed FOLLOWUP_TIMEOUT_MS, because the allocator will reset the state on its end.\nAllocator will reset its state if there was no follow-up request in this amount of time.\nAny request message can accommodate no more than this number of bytes of unique ID.\nThis limitation is needed to ensure that all request transfers are single-frame.\nThis limitation does not apply to CAN FD transport.\nWhen requesting an allocation, set the field 'node_id' to this value if there's no preference.\nIf transfer is anonymous, this is the preferred ID.\nIf transfer is non-anonymous, this is allocated ID.\nIf the allocatee does not have any preference, this value must be set to zero. In this case, the allocator\nmust choose the highest unused node ID value for this allocation (except 126 and 127, that are reserved for\nnetwork maintenance tools). E.g., if the allocation table is empty and the node has requested an allocation\nwithout any preference, the allocator will grant the node ID 125.\nIf the preferred node ID is not zero, the allocator will traverse the allocation table starting from the\npreferred node ID upward, until a free node ID is found. If a free node ID could not be found, the\nallocator will restart the search from the preferred node ID downward, until a free node ID is found.\nIn pseudocode:\n  int findFreeNodeID(const int preferred)\n  {\n      // Search up\n      int candidate = (preferred > 0) ? preferred : 125;\n      while (candidate <= 125)\n      {\n          if (!isOccupied(candidate))\n              return candidate;\n          candidate++;\n      }\n      // Search down\n      candidate = (preferred > 0) ? preferred : 125;\n      while (candidate > 0)\n      {\n          if (!isOccupied(candidate))\n              return candidate;\n          candidate--;\n      }\n      // Not found\n      return -1;\n  }\nIf transfer is anonymous, this field indicates first-stage request.\nIf transfer is non-anonymous, this field should be assigned zero and ignored.\nIf transfer is anonymous, this array must not contain more than MAX_LENGTH_OF_UNIQUE_ID_IN_REQUEST items.\nNote that array is tail-optimized, i.e. it will not be prepended with length field.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"nodeId","description":""},{"length":16,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"uniqueId","description":""}],"statics":["uint16 MAX_REQUEST_PERIOD_MS = 1000     # It is OK to exceed this value","uint16 MIN_REQUEST_PERIOD_MS = 600      # It is OK to exceed this value","uint16 MAX_FOLLOWUP_DELAY_MS = 400","uint16 MIN_FOLLOWUP_DELAY_MS = 0        # Defined only for regularity; will always be zero.","uint16 FOLLOWUP_TIMEOUT_MS = 500","uint8 MAX_LENGTH_OF_UNIQUE_ID_IN_REQUEST = 6","uint7 ANY_NODE_ID = 0"]},"info":{"id":"1","hash":"0b2a812620a11d40","maxBitsLength":141}},"2":{"description":"Get the implementation details of a given data type.\nRequest is interpreted as follows:\n - If the field 'name' is empty, the fields 'kind' and 'id' will be used to identify the data type.\n - If the field 'name' is non-empty, it will be used to identify the data type; the\n   fields 'kind' and 'id' will be ignored.","type":"service","request":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":16,"name":"id","description":"Ignored if 'name' is non-empty"},{"type":"object","kind":"DataTypeKind","name":"kind","description":"Ignored if 'name' is non-empty"},{"length":80,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"name","description":"Full data type name, e.g. \"uavcan.protocol.GetDataTypeInfo\""}],"statics":[]},"response":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":64,"name":"signature","description":"Data type signature; valid only if the data type is known (see FLAG_KNOWN)"},{"type":"var","kind":"int","unsigned":true,"bits":16,"name":"id","description":"Valid only if the data type is known (see FLAG_KNOWN)"},{"type":"object","kind":"DataTypeKind","name":"kind","description":"Ditto"},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"flags","description":""},{"length":80,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"name","description":"Full data type name"}],"statics":["uint8 FLAG_KNOWN      = 1   # This data type is defined","uint8 FLAG_SUBSCRIBED = 2   # Subscribed to messages of this type","uint8 FLAG_PUBLISHING = 4   # Publishing messages of this type","uint8 FLAG_SERVING    = 8   # Providing service of this type"]},"info":{"id":"2","hash":"1b283338a7bed2d8","maxBitsLength":671}},"4":{"description":"Global time synchronization.\nAny node that publishes timestamped data must use this time reference.\nPlease refer to the specification to learn about the synchronization algorithm.\nBroadcasting period must be within this range.\nSynchronization slaves may switch to a new source if the current master was silent for this amount of time.\nTime in microseconds when the PREVIOUS GlobalTimeSync message was transmitted.\nIf this message is the first one, this field must be zero.","type":"message","message":{"variables":[],"statics":["uint16 MAX_BROADCASTING_PERIOD_MS = 1100            # Milliseconds","uint16 MIN_BROADCASTING_PERIOD_MS = 40              # Milliseconds","uint16 RECOMMENDED_BROADCASTER_TIMEOUT_MS = 2200    # Milliseconds"]},"info":{"id":"4","hash":"20271116a793c2db","maxBitsLength":56}},"5":{"description":"Restart the node.\nSome nodes may require restart before the new configuration will be applied.\nThe request should be rejected if magic_number does not equal MAGIC_NUMBER.","type":"service","request":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":40,"name":"magicNumber","description":""}],"statics":["uint40 MAGIC_NUMBER = 0xACCE551B1E"]},"info":{"id":"5","hash":"569e05394a3017f0","maxBitsLength":40}},"6":{"description":"THIS DEFINITION IS SUBJECT TO CHANGE.\nThis service allows to execute arbitrary commands on the remote node's internal system shell.\nEssentially, this service mimics a typical terminal emulator, with one text input (stdin) and two text\noutputs (stdout and stderr). When there's no process running, the input is directed into the terminal\nhandler itself, which interprets it. If there's a process running, the input will be directed into\nstdin of the running process. It is possible to forcefully return the terminal into a known state by\nmeans of setting the reset flag (see below), in which case the terminal will kill all of the child\nprocesses, if any, and return into the initial idle state.\nThe server is assumed to allocate one independent terminal instance per client, so that different clients\ncan execute commands without interfering with each other.\nInput and output should use this newline character.\nThe server is required to keep the result of the last executed command for at least this time.\nWhen this time expires, the server may remove the results in order to reclaim the memory, but it\nis not guaranteed. Hence, the clients must retrieve the results in this amount of time.\nThese flags control the shell and command execution.\nIf the shell is idle, it will interpret this string.\nIf there's a process running, this string will be piped into its stdin.\nIf RESET_SHELL is set, new input will be interpreted by the shell immediately.\nExit status of the last executed process, or error code of the shell itself.\nDefault value is zero.\nThese flags indicate the status of the shell.\nIn case of a shell error, this string may contain ASCII string explaining the nature of the error.\nOtherwise, if stdout read is requested, this string will contain stdout data. If stderr read is requested,\nthis string will contain stderr data. If both stdout and stderr read is requested, this string will start\nwith stdout and end with stderr, with no separator in between.","type":"service","request":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"flags","description":""},{"length":128,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"input","description":""}],"statics":["uint8 NEWLINE = '\\n'","uint8 MIN_OUTPUT_LIFETIME_SEC = 10","uint8 FLAG_RESET_SHELL          = 1     # Restarts the shell instance anew; may or may not imply CLEAR_OUTPUT_BUFFERS","uint8 FLAG_CLEAR_OUTPUT_BUFFERS = 2     # Makes stdout and stderr buffers empty","uint8 FLAG_READ_STDOUT          = 64    # Output will contain stdout","uint8 FLAG_READ_STDERR          = 128   # Output will be extended with stderr"]},"response":{"variables":[{"type":"var","kind":"int","unsigned":false,"bits":32,"name":"lastExitStatus","description":""},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"flags","description":""},{"length":256,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"output","description":""}],"statics":["uint8 FLAG_RUNNING              = 1     # The shell is currently running a process; stdin/out/err are piped to it","uint8 FLAG_SHELL_ERROR          = 2     # Exit status contains error code, output contains text (e.g. no such command)","uint8 FLAG_HAS_PENDING_STDOUT   = 64    # There is more stdout to read","uint8 FLAG_HAS_PENDING_STDERR   = 128   # There is more stderr to read"]},"info":{"id":"6","hash":"59276b5921c9246e","maxBitsLength":1040}},"10":{"description":"Service to control the node configuration.\nSAVE operation instructs the remote node to save the current configuration parameters into a non-volatile\nstorage. The node may require a restart in order for some changes to take effect.\nERASE operation instructs the remote node to clear its configuration storage and reinitialize the parameters\nwith their default values. The node may require a restart in order for some changes to take effect.\nOther opcodes may be added in the future (for example, an opcode for switching between multiple configurations).\nReserved, keep zero.\nIf 'ok' (the field below) is true, this value is not used and must be kept zero.\nIf 'ok' is false, this value may contain error code. Error code constants may be defined in the future.\nTrue if the operation has been performed successfully, false otherwise.","type":"service","request":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"opcode","description":""},{"type":"var","kind":"int","unsigned":false,"bits":48,"name":"argument","description":""}],"statics":["uint8 OPCODE_SAVE  = 0  # Save all parameters to non-volatile storage.","uint8 OPCODE_ERASE = 1  # Clear the non-volatile storage; some changes may take effect only after reboot."]},"response":{"variables":[{"type":"var","kind":"int","unsigned":false,"bits":48,"name":"argument","description":""}],"statics":[]},"info":{"id":"10","hash":"3b131ac5eb69d2cd","maxBitsLength":56}},"11":{"description":"Get or set a parameter by name or by index.\nNote that access by index should only be used to retrieve the list of parameters; it is highly\ndiscouraged to use it for anything else, because persistent ordering is not guaranteed.\nIndex of the parameter starting from 0; ignored if name is nonempty.\nUse index only to retrieve the list of parameters.\nParameter ordering must be well defined (e.g. alphabetical, or any other stable ordering),\nin order for the index access to work.\nIf set - parameter will be assigned this value, then the new value will be returned.\nIf not set - current parameter value will be returned.\nRefer to the definition of Value for details.\nName of the parameter; always preferred over index if nonempty.\nActual parameter value.\nFor set requests, it should contain the actual parameter value after the set request was\nexecuted. The objective is to let the client know if the value could not be updated, e.g.\ndue to its range violation, etc.\nEmpty value (and/or empty name) indicates that there is no such parameter.\nEmpty name (and/or empty value) in response indicates that there is no such parameter.","type":"service","request":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":13,"name":"index","description":""},{"type":"union","kind":"Value","name":"value","description":""},{"length":92,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"name","description":""}],"statics":[]},"response":{"variables":[{"type":"var","kind":"void","unsigned":false,"bits":5,"description":""},{"type":"union","kind":"Value","name":"value","description":""},{"type":"var","kind":"void","unsigned":false,"bits":5,"description":""},{"type":"union","kind":"Value","name":"defaultValue","description":"Optional"},{"type":"var","kind":"void","unsigned":false,"bits":6,"description":""},{"type":"union","kind":"NumericValue","name":"maxValue","description":"Optional, not applicable for bool/string"},{"type":"var","kind":"void","unsigned":false,"bits":6,"description":""},{"type":"union","kind":"NumericValue","name":"minValue","description":"Optional, not applicable for bool/string"},{"length":92,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"name","description":""}],"statics":[]},"info":{"id":"11","hash":"a7b622f939d1a4d5","maxBitsLength":1791}},"15":{"description":"This service instructs the node to begin the process of automated enumeration.\nThe node will automatically leave enumeration mode upon expiration of this timeout.\nName of the parameter to enumerate, e.g. ESC index.\nIf the name is left empty, the node will infer the parameter name automatically (autodetect).\nIt is highly recommended to always use autodetection in order to avoid dependency on hard-coded parameter names,\nand also allow the enumeratee to possibly enumerate multiple different parameters at once.\nThe rule of thumb is to always leave this parameter empty unless you really know what you're doing.","type":"service","request":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":16,"name":"timeoutSec","description":"[Seconds]"},{"length":92,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"parameterName","description":""}],"statics":["uint16 TIMEOUT_CANCEL   = 0     # Stop enumeration immediately","uint16 TIMEOUT_INFINITE = 65535 # Do not stop until explicitly requested"]},"response":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"error","description":""}],"statics":["uint8 ERROR_OK                  = 0     # Success","uint8 ERROR_INVALID_MODE        = 1     # The node cannot perform enumeration in its current operating mode","uint8 ERROR_INVALID_PARAMETER   = 2     # The node cannot enumerate on the requested parameter, or it doesn't exist","uint8 ERROR_UNSUPPORTED         = 3     # The node cannot perform enumeration in its current configuration","uint8 ERROR_UNKNOWN             = 255   # Generic error"]},"info":{"id":"15","hash":"196ae06426a3b5d8","maxBitsLength":759}},"30":{"description":"THIS DEFINITION IS SUBJECT TO CHANGE.\nThis type is a part of the Raft consensus algorithm.\nPlease refer to the specification for details.\nGiven min election timeout and cluster size, the maximum recommended request interval can be derived as follows:\n  max recommended request interval = (min election timeout) / 2 requests / (cluster size - 1)\nThe equation assumes that the Leader requests one Follower at a time, so that there's at most one pending call\nat any moment. Such behavior is optimal as it creates uniform bus load, but it is actually implementation-specific.\nObviously, request interval can be lower than that if needed, but higher values are not recommended as they may\ncause Followers to initiate premature elections in case of intensive frame losses or delays.\nReal timeout is randomized in the range (MIN, MAX], according to the Raft paper.\nRefer to the Raft paper for explanation.\nWorst-case replication time per Follower can be computed as:\n  worst replication time = (127 log entries) * (2 trips of next_index) * (request interval per Follower)\nRefer to the Raft paper for explanation.","type":"service","request":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":32,"name":"term","description":""},{"type":"var","kind":"int","unsigned":true,"bits":32,"name":"prevLogTerm","description":""},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"prevLogIndex","description":""},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"leaderCommit","description":""},{"length":1,"range":true,"type":"array","kind":{"kind":"Entry","unsigned":false,"bits":null,"type":"object"},"name":"entries","description":""}],"statics":["uint16 DEFAULT_MIN_ELECTION_TIMEOUT_MS = 2000","uint16 DEFAULT_MAX_ELECTION_TIMEOUT_MS = 4000"]},"response":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":32,"name":"term","description":""}],"statics":[]},"info":{"id":"30","hash":"8032c7097b48a3cc","maxBitsLength":249}},"31":{"description":"THIS DEFINITION IS SUBJECT TO CHANGE.\nThis type is a part of the Raft consensus algorithm.\nPlease refer to the specification for details.\nRefer to the Raft paper for explanation.\nRefer to the Raft paper for explanation.","type":"service","request":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":32,"name":"term","description":""},{"type":"var","kind":"int","unsigned":true,"bits":32,"name":"lastLogTerm","description":""},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"lastLogIndex","description":""}],"statics":[]},"response":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":32,"name":"term","description":""}],"statics":[]},"info":{"id":"31","hash":"cdde07bb89a56356","maxBitsLength":72}},"40":{"description":"This service initiates firmware update on a remote node.\nThe node that is being updated (slave) will retrieve the firmware image file 'image_file_remote_path' from the node\n'source_node_id' using the file read service, then it will update the firmware and reboot.\nThe slave can explicitly reject this request if it is not possible to update the firmware at the moment\n(e.g. if the node is busy).\nIf the slave node accepts this request, the initiator will get a response immediately, before the update process\nactually begins.\nWhile the firmware is being updated, the slave should set its mode (uavcan.protocol.NodeStatus.mode) to\nMODE_SOFTWARE_UPDATE.\nOther error codes may be added in the future.","type":"service","request":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"sourceNodeId","description":"If this field is zero, the caller's Node ID will be used instead."},{"type":"object","kind":"Path","name":"imageFileRemotePath","description":""}],"statics":[]},"response":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"error","description":""},{"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"optionalErrorMessage","description":"Detailed description of the error."}],"statics":["uint8 ERROR_OK               = 0","uint8 ERROR_INVALID_MODE     = 1    # Cannot perform the update in the current operating mode or state.","uint8 ERROR_IN_PROGRESS      = 2    # Firmware update is already in progress, and the slave doesn't want to restart.","uint8 ERROR_UNKNOWN          = 255"]},"info":{"id":"40","hash":"b7d725df72724126","maxBitsLength":1616}},"45":{"description":"Request info about a remote file system entry (file, directory, etc).\nFile size in bytes.\nShould be set to zero for directories.","type":"service","request":{"variables":[{"type":"object","kind":"Path","name":"path","description":""}],"statics":[]},"response":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":40,"name":"size","description":""},{"type":"object","kind":"Error","name":"error","description":""},{"type":"object","kind":"EntryType","name":"entryType","description":""}],"statics":[]},"info":{"id":"45","hash":"5004891ee8a27531","maxBitsLength":1608}},"46":{"description":"This service can be used to retrieve a remote directory listing, one entry per request.\nThe client should query each entry independently, iterating 'entry_index' from 0 until the last entry is passed,\nin which case the server will report that there is no such entry (via the fields 'entry_type' and 'error').\nThe entry_index shall be applied to the ordered list of directory entries (e.g. alphabetically ordered). The exact\nsorting criteria does not matter as long as it provides the same ordering for subsequent service calls.","type":"service","request":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":32,"name":"entryIndex","description":""},{"type":"object","kind":"Path","name":"directoryPath","description":""}],"statics":[]},"response":{"variables":[{"type":"object","kind":"Error","name":"error","description":""},{"type":"object","kind":"EntryType","name":"entryType","description":""},{"type":"object","kind":"Path","name":"entryFullPath","description":"Ignored/Empty if such entry does not exist."}],"statics":[]},"info":{"id":"46","hash":"8c46e8ab568bda79","maxBitsLength":1640}},"47":{"description":"Delete remote file system entry.\nIf the remote entry is a directory, all nested entries will be removed too.","type":"service","request":{"variables":[{"type":"object","kind":"Path","name":"path","description":""}],"statics":[]},"response":{"variables":[{"type":"object","kind":"Error","name":"error","description":""}],"statics":[]},"info":{"id":"47","hash":"78648c99170b47aa","maxBitsLength":1608}},"48":{"description":"Read file from a remote node.\n\nThere are two possible outcomes of a successful service call:\n 1. Data array size equals its capacity. This means that the end of the file is not reached yet.\n 2. Data array size is less than its capacity, possibly zero. This means that the end of file is reached.\n\nThus, if the client needs to fetch the entire file, it should repeatedly call this service while increasing the\noffset, until incomplete data is returned.\nIf the object pointed by 'path' cannot be read (e.g. it is a directory or it does not exist), appropriate error code\nwill be returned, and data array will be empty.","type":"service","request":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":40,"name":"offset","description":""},{"type":"object","kind":"Path","name":"path","description":""}],"statics":[]},"response":{"variables":[{"type":"object","kind":"Error","name":"error","description":""},{"length":256,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"data","description":""}],"statics":[]},"info":{"id":"48","hash":"8dcdca939f33f678","maxBitsLength":1648}},"49":{"description":"Write into a remote file.\nThe server shall place the contents of the field 'data' into the file pointed by 'path' at the offset specified by\nthe field 'offset'.\nWhen writing a file, the client should repeatedly call this service with data while advancing offset until the file\nis written completely. When write is complete, the client shall call the service one last time, with the offset\nset to the size of the file and with the data field empty, which will signal the server that the write operation is\ncomplete.\nWhen the write operation is complete, the server shall truncate the resulting file past the specified offset.\nServer implementation advice:\nIt is recommended to implement proper handling of concurrent writes to the same file from different clients, for\nexample by means of creating a staging area for uncompleted writes (like FTP servers do).","type":"service","request":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":40,"name":"offset","description":""},{"type":"object","kind":"Path","name":"path","description":""},{"length":192,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"data","description":""}],"statics":[]},"response":{"variables":[{"type":"object","kind":"Error","name":"error","description":""}],"statics":[]},"info":{"id":"49","hash":"515aa1dc77e58429","maxBitsLength":3192}},"63":{"description":"This service carries arbitrary data in the format of the specified high-level protocol.\nThe data will be delivered to the specified node only (not broadcast), and the addressed node\nwill be required to respond (although the response may be empty, if the chosen protocol allows so).\nThe specified protocol applies both to the request and to the response. The channelID allows for\nadditional routing between the source and target nodes.","type":"service","request":{"variables":[{"type":"object","kind":"Protocol","name":"protocol","description":""},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"channelId","description":""},{"length":60,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"buffer","description":"TAO rules apply"}],"statics":[]},"response":{"variables":[{"length":60,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"buffer","description":"TAO rules apply"}],"statics":[]}},"341":{"description":"Abstract node status information.\nAll UAVCAN nodes are required to publish this message periodically.\nPublication period may vary within these limits.\nIt is NOT recommended to change it at run time.\nIf a node fails to publish this message in this amount of time, it should be considered offline.\nUptime counter should never overflow.\nOther nodes may detect that a remote node has restarted when this value goes backwards.\nAbstract node health.\nCurrent mode.\nMode OFFLINE can be actually reported by the node to explicitly inform other network\nparticipants that the sending node is about to shutdown. In this case other nodes will not\nhave to wait OFFLINE_TIMEOUT_MS before they detect that the node is no longer available.\nReserved values can be used in future revisions of the specification.\nNot used currently, keep zero when publishing, ignore when receiving.\nOptional, vendor-specific node status code, e.g. a fault code or a status bitmask.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":32,"name":"uptimeSec","description":""},{"type":"var","kind":"int","unsigned":true,"bits":2,"name":"health","description":""},{"type":"var","kind":"int","unsigned":true,"bits":3,"name":"mode","description":""},{"type":"var","kind":"int","unsigned":true,"bits":3,"name":"subMode","description":""},{"type":"var","kind":"int","unsigned":true,"bits":16,"name":"vendorSpecificStatusCode","description":""}],"statics":["uint16 MAX_BROADCASTING_PERIOD_MS = 1000","uint16 MIN_BROADCASTING_PERIOD_MS = 2","uint16 OFFLINE_TIMEOUT_MS = 3000","uint2 HEALTH_OK         = 0     # The node is functioning properly.","uint2 HEALTH_WARNING    = 1     # A critical parameter went out of range or the node encountered a minor failure.","uint2 HEALTH_ERROR      = 2     # The node encountered a major failure.","uint2 HEALTH_CRITICAL   = 3     # The node suffered a fatal malfunction.","uint3 MODE_OPERATIONAL      = 0         # Normal operating mode.","uint3 MODE_INITIALIZATION   = 1         # Initialization is in progress; this mode is entered immediately after startup.","uint3 MODE_MAINTENANCE      = 2         # E.g. calibration, the bootloader is running, etc.","uint3 MODE_SOFTWARE_UPDATE  = 3         # New software/firmware is being loaded.","uint3 MODE_OFFLINE          = 7         # The node is no longer available."]},"info":{"id":"341","hash":"0f0868d0c1a7c6f1","maxBitsLength":56}},"380":{"description":"This message will be broadcasted when the node receives user input in the process of enumeration.\nThis field is unused; keep it empty\nName of the enumerated parameter.\nThis field must always be populated by the enumeratee.\nIf multiple parameters were enumerated at once (e.g. ESC index and the direction of rotation),\nthe field should contain the name of the most important parameter.","type":"message","message":{"variables":[{"type":"var","kind":"void","unsigned":false,"bits":6,"description":""},{"length":92,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"parameterName","description":""}],"statics":[]},"info":{"id":"380","hash":"884cb63050a84f35","maxBitsLength":815}},"390":{"description":"THIS DEFINITION IS SUBJECT TO CHANGE.\nThis message is used by allocation servers to find each other's node ID.\nPlease refer to the specification for details.\nA server should stop publishing this message as soon as it has discovered all other nodes in the cluster.\nAn exception applies: when a server receives a Discovery message from another server where the list\nof known nodes is incomplete (i.e. len(known_nodes) < configured_cluster_size), the server must\npublish a discovery message once. This condition allows other servers to quickly re-discover the cluster\nafter restart.\nThis message should be broadcasted by the server at this interval until all other servers are discovered.\nNumber of servers in the cluster as configured on the sender.\nNode ID of servers that are known to the publishing server, including the publishing server itself.\nCapacity of this array defines maximum size of the server cluster.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"configuredClusterSize","description":""},{"length":5,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"knownNodes","description":""}],"statics":["uint16 BROADCASTING_PERIOD_MS = 1000"]},"info":{"id":"390","hash":"821ae2f525f69f21","maxBitsLength":51}},"1000":{"description":"Inertial data and orientation in body frame.\nNormalized quaternion\nrad/sec\nm/s^2","type":"message","message":{"variables":[{"length":4,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"orientationXyzw","description":""},{"type":"var","kind":"void","unsigned":false,"bits":4,"description":""},{"length":9,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"orientationCovariance","description":""},{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"angularVelocity","description":""},{"type":"var","kind":"void","unsigned":false,"bits":4,"description":""},{"length":9,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"angularVelocityCovariance","description":""},{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"linearAcceleration","description":""},{"length":9,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"linearAccelerationCovariance","description":""}],"statics":[]},"info":{"id":"1000","hash":"72a63a3c6f41fa9b","maxBitsLength":668}},"1001":{"description":"Magnetic field readings, in Gauss, in body frame.\nSI units are avoided because of float16 range limitations.\nThis message is deprecated. Use the newer 1002.MagneticFieldStrength2.uavcan message.","type":"message","message":{"variables":[{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"magneticFieldGa","description":""},{"length":9,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"magneticFieldCovariance","description":""}],"statics":[]},"info":{"id":"1001","hash":"e2a7d4a9460bc2f2","maxBitsLength":196}},"1002":{"description":"Magnetic field readings, in Gauss, in body frame.\nSI units are avoided because of float16 range limitations.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"sensorId","description":""},{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"magneticFieldGa","description":""},{"length":9,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"magneticFieldCovariance","description":""}],"statics":[]},"info":{"id":"1002","hash":"b6ac0c442430297e","maxBitsLength":204}},"1003":{"description":"Raw IMU data with timestamps.\nTHIS DEFINITION MAY BE CHANGED IN A NON-BACKWARD-COMPATIBLE WAY IN THE FUTURE.\nData acquisition timestamp in the bus shared time base.\nIntegration interval, seconds.\nSet to a non-positive value if the integrated samples are not available\n(in this case, only the latest point samples will be valid).\nAngular velocity samples in radian/second.\nThe samples are represented in the body frame, the axes are ordered as follows:\n  1. angular velocity around X (roll rate)\n  2. angular velocity around Y (pitch rate)\n  3. angular velocity around Z (yaw rate)\nLinear acceleration samples in meter/(second^2).\nThe samples are represented in the body frame, the axes are ordered as follows:\n  1. linear acceleration along X (forward positive)\n  2. linear acceleration along Y (right positive)\n  3. linear acceleration along Z (down positive)\nCovariance matrix. The diagonal entries are ordered as follows:\n  1. roll rate                (radian^2)/(second^2)\n  2. pitch rate               (radian^2)/(second^2)\n  3. yaw rate                 (radian^2)/(second^2)\n  4. forward acceleration     (meter^2)/(second^4)\n  5. rightward acceleration   (meter^2)/(second^4)\n  6. downward acceleration    (meter^2)/(second^4)","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"integrationInterval","description":""},{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"rateGyroLatest","description":"Latest sample, radian/second"},{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":32},"name":"rateGyroIntegral","description":"Integrated samples, radian/second"},{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"accelerometerLatest","description":"Latest sample, meter/(second^2)"},{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":32},"name":"accelerometerIntegral","description":"Integrated samples, meter/(second^2)"},{"length":36,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"covariance","description":""}],"statics":[]},"info":{"id":"1003","hash":"8280632c40e574b5","maxBitsLength":958}},"1010":{"description":"Actuator commands.\nThe system supports up to 256 actuators; up to 15 of them can be commanded with one message.","type":"message","message":{"variables":[{"length":15,"range":true,"type":"array","kind":{"kind":"Command","unsigned":false,"bits":null,"type":"object"},"name":"commands","description":""}],"statics":[]},"info":{"id":"1010","hash":"d8a7486238ec3af3","maxBitsLength":484}},"1011":{"description":"Generic actuator feedback, if available.\nUnknown fields should be set to NAN.\nWhether the units are linear or angular depends on the actuator type (refer to the Command data type).","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"actuatorId","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"position","description":"meter or radian"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"force","description":"Newton or Newton metre"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"speed","description":"meter per second or radian per second"},{"type":"var","kind":"void","unsigned":false,"bits":1,"description":""},{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"powerRatingPct","description":"0 - unloaded, 100 - full load"}],"statics":["uint7 POWER_RATING_PCT_UNKNOWN = 127"]},"info":{"id":"1011","hash":"5e9bba44faf1ea04","maxBitsLength":64}},"1020":{"description":"TAS.","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"trueAirspeed","description":"m/s"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"trueAirspeedVariance","description":"(m/s)^2"}],"statics":[]},"info":{"id":"1020","hash":"306f69e0a591afaa","maxBitsLength":32}},"1021":{"description":"IAS.","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"indicatedAirspeed","description":"m/s"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"indicatedAirspeedVariance","description":"(m/s)^2"}],"statics":[]},"info":{"id":"1021","hash":"0a1892d72ab8945f","maxBitsLength":32}},"1025":{"description":"Angle of attack.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"sensorId","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"aoa","description":"Radians"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"aoaVariance","description":"Radians^2"}],"statics":["uint8 SENSOR_ID_LEFT = 254","uint8 SENSOR_ID_RIGHT = 255"]},"info":{"id":"1025","hash":"d5513c3f7afac74e","maxBitsLength":40}},"1026":{"description":"Body sideslip in radians.","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"sideslipAngle","description":"Radians"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"sideslipAngleVariance","description":"Radians^2"}],"statics":[]},"info":{"id":"1026","hash":"7b48e55fcff42a57","maxBitsLength":32}},"1027":{"description":"Raw Air Data.\nNote: unused vars should be assigned NaN\nHeater State\n\nPressure Data\nTemperature Data","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"flags","description":""},{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"staticPressure","description":"Pascal"},{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"differentialPressure","description":"Pascal"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"staticPressureSensorTemperature","description":"Kelvin"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"differentialPressureSensorTemperature","description":"Kelvin"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"staticAirTemperature","description":"Kelvin"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"pitotTemperature","description":"Kelvin"},{"length":16,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"covariance","description":"order of diagonal elements : "}],"statics":["uint8 FLAG_HEATER_AVAILABLE      = 1","uint8 FLAG_HEATER_WORKING        = 2","uint8 FLAG_HEATER_OVERCURRENT    = 4","uint8 FLAG_HEATER_OPENCIRCUIT    = 8"]},"info":{"id":"1027","hash":"c77df38ba122f5da","maxBitsLength":397}},"1028":{"description":"Static pressure.","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"staticPressure","description":"Pascal"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"staticPressureVariance","description":"Pascal^2"}],"statics":[]},"info":{"id":"1028","hash":"cdc7c43412bdc89a","maxBitsLength":48}},"1029":{"description":"Static temperature.","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"staticTemperature","description":"Kelvin"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"staticTemperatureVariance","description":"Kelvin^2"}],"statics":[]},"info":{"id":"1029","hash":"49272a6477d96271","maxBitsLength":32}},"1030":{"description":"Raw ESC command normalized into [-8192, 8191]; negative values indicate reverse rotation.\nThe ESC should normalize the setpoint into its effective input range.\nNon-zero setpoint value below minimum should be interpreted as min valid setpoint for the given motor.","type":"message","message":{"variables":[{"length":20,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":false,"bits":14},"name":"cmd","description":""}],"statics":[]},"info":{"id":"1030","hash":"217f5c87d7ec951d","maxBitsLength":285}},"1031":{"description":"Simple RPM setpoint.\nThe ESC should automatically clamp the setpoint according to the minimum and maximum supported RPM;\nfor example, given a ESC that operates in the range 100 to 10000 RPM, a setpoint of 1 RPM will be clamped to 100 RPM.\nNegative values indicate reverse rotation.","type":"message","message":{"variables":[{"length":20,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":false,"bits":18},"name":"rpm","description":""}],"statics":[]},"info":{"id":"1031","hash":"ce0f9f621cf7e70b","maxBitsLength":365}},"1034":{"description":"Generic ESC status.\nUnknown fields should be set to NAN.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":32,"name":"errorCount","description":"Resets when the motor restarts"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"voltage","description":"Volt"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"current","description":"Ampere. Can be negative in case of a regenerative braking."},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"temperature","description":"Kelvin"},{"type":"var","kind":"int","unsigned":false,"bits":18,"name":"rpm","description":"Negative value indicates reverse rotation"},{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"powerRatingPct","description":"Instant demand factor in percent (percent of maximum power); range 0% to 127%."},{"type":"var","kind":"int","unsigned":true,"bits":5,"name":"escIndex","description":""}],"statics":[]},"info":{"id":"1034","hash":"a9af28aea2fbb254","maxBitsLength":110}},"1040":{"description":"Generic camera gimbal control.\nThis message can only be used in the following modes:\n - COMMAND_MODE_ANGULAR_VELOCITY\n - COMMAND_MODE_ORIENTATION_FIXED_FRAME\n - COMMAND_MODE_ORIENTATION_BODY_FRAME\nTarget operation mode - how to handle this message.\nSee the list of acceptable modes above.\nIn the angular velocity mode, this field contains a rate quaternion.\nIn the orientation mode, this field contains orientation either in fixed frame or in body frame.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"gimbalId","description":""},{"type":"object","kind":"Mode","name":"mode","description":""},{"length":4,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"quaternionXyzw","description":""}],"statics":[]},"info":{"id":"1040","hash":"4af6e57b2b2be29c","maxBitsLength":80}},"1041":{"description":"Generic camera gimbal control.\nThis message can only be used in the following modes:\n - COMMAND_MODE_GEO_POI\nTarget operation mode - how to handle this message.\nSee the list of acceptable modes above.\nCoordinates of the POI (point of interest).","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"gimbalId","description":""},{"type":"object","kind":"Mode","name":"mode","description":""},{"type":"var","kind":"int","unsigned":false,"bits":32,"name":"longitudeDeg1E7","description":"1 LSB = 1e-7 deg"},{"type":"var","kind":"int","unsigned":false,"bits":32,"name":"latitudeDeg1E7","description":""},{"type":"var","kind":"int","unsigned":false,"bits":22,"name":"heightCm","description":"1 LSB = 10 mm"},{"type":"var","kind":"int","unsigned":true,"bits":2,"name":"heightReference","description":""}],"statics":["uint2 HEIGHT_REFERENCE_ELLIPSOID = 0","uint2 HEIGHT_REFERENCE_MEAN_SEA_LEVEL = 1"]},"info":{"id":"1041","hash":"9371428a92f01fd6","maxBitsLength":104}},"1044":{"description":"Generic gimbal status.\nCamera axis orientation in body frame (not in fixed frame).\nPlease refer to the UAVCAN coordinate frame conventions.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"gimbalId","description":""},{"type":"object","kind":"Mode","name":"mode","description":""},{"length":4,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"cameraOrientationInBodyFrameXyzw","description":""},{"length":9,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"cameraOrientationInBodyFrameCovariance","description":"+inf for non-existent axes"}],"statics":[]},"info":{"id":"1044","hash":"b9f127865be0d61e","maxBitsLength":228}},"1050":{"description":"Generic narrow-beam range sensor data.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"sensorId","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"fieldOfView","description":"Radians"},{"type":"var","kind":"int","unsigned":true,"bits":5,"name":"sensorType","description":""},{"type":"var","kind":"int","unsigned":true,"bits":3,"name":"readingType","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"range","description":"Meters"}],"statics":["uint5 SENSOR_TYPE_UNDEFINED = 0","uint5 SENSOR_TYPE_SONAR     = 1","uint5 SENSOR_TYPE_LIDAR     = 2","uint5 SENSOR_TYPE_RADAR     = 3","uint3 READING_TYPE_UNDEFINED   = 0   # Range is unknown","uint3 READING_TYPE_VALID_RANGE = 1   # Range field contains valid distance","uint3 READING_TYPE_TOO_CLOSE   = 2   # Range field contains min range for the sensor","uint3 READING_TYPE_TOO_FAR     = 3   # Range field contains max range for the sensor"]},"info":{"id":"1050","hash":"68fffe70fc771952","maxBitsLength":120}},"1060":{"description":"GNSS navigation solution with uncertainty.\nThis message is deprecated. Use the newer 1063.Fix2.uavcan message.\nTime solution.\nTime standard (GPS, UTC, TAI, etc) is defined in the field below.\nTime standard used in the GNSS timestamp field.\nIf known, the number of leap seconds allows to perform conversions between some time standards.\nPosition and velocity solution\nFix status\nPrecision","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":3,"name":"gnssTimeStandard","description":""},{"type":"var","kind":"void","unsigned":false,"bits":5,"name":"#","description":"Reserved space"},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"numLeapSeconds","description":""},{"type":"var","kind":"int","unsigned":false,"bits":37,"name":"longitudeDeg1E8","description":"Longitude degrees multiplied by 1e8 (approx. 1 mm per LSB)"},{"type":"var","kind":"int","unsigned":false,"bits":37,"name":"latitudeDeg1E8","description":"Latitude degrees multiplied by 1e8 (approx. 1 mm per LSB on equator)"},{"type":"var","kind":"int","unsigned":false,"bits":27,"name":"heightEllipsoidMm","description":"Height above ellipsoid in millimeters"},{"type":"var","kind":"int","unsigned":false,"bits":27,"name":"heightMslMm","description":"Height above mean sea level in millimeters"},{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"nedVelocity","description":"NED frame (north-east-down) in meters per second"},{"type":"var","kind":"int","unsigned":true,"bits":6,"name":"satsUsed","description":""},{"type":"var","kind":"int","unsigned":true,"bits":2,"name":"status2DFix","description":"= 2"},{"type":"var","kind":"int","unsigned":true,"bits":2,"name":"status3DFix","description":"= 3"},{"type":"var","kind":"int","unsigned":true,"bits":2,"name":"status","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"pdop","description":""},{"type":"var","kind":"void","unsigned":false,"bits":4,"description":""},{"length":9,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"positionCovariance","description":"m^2"},{"length":9,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"velocityCovariance","description":"(m/s)^2"}],"statics":["uint3 GNSS_TIME_STANDARD_NONE = 0  # Time is unknown","uint3 GNSS_TIME_STANDARD_TAI  = 1","uint3 GNSS_TIME_STANDARD_UTC  = 2","uint3 GNSS_TIME_STANDARD_GPS  = 3","uint8 NUM_LEAP_SECONDS_UNKNOWN = 0","uint2 STATUS_NO_FIX    = 0","uint2 STATUS_TIME_ONLY = 1"]},"info":{"id":"1060","hash":"54c1572b9e07f297","maxBitsLength":628}},"1061":{"description":"GNSS low priority auxiliary info.\nUnknown DOP parameters should be set to NAN.","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"gdop","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"pdop","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"hdop","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"vdop","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"tdop","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"ndop","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"edop","description":""},{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"satsVisible","description":"All visible sats of all available GNSS (e.g. GPS, GLONASS, etc)"},{"type":"var","kind":"int","unsigned":true,"bits":6,"name":"satsUsed","description":"All used sats of all available GNSS"}],"statics":[]},"info":{"id":"1061","hash":"9be8bdc4c3dbbfd2","maxBitsLength":125}},"1062":{"description":"GNSS RTCM SC-104 protocol raw stream container.\nRTCM messages that are longer than max data size can be split over multiple consecutive messages.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"protocolIdRtcm2","description":"= 2"},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"protocolIdRtcm3","description":"= 3"},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"protocolId","description":""},{"length":128,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"data","description":""}],"statics":["uint8 PROTOCOL_ID_UNKNOWN = 0"]},"info":{"id":"1062","hash":"1f56030ecb171501","maxBitsLength":1040}},"1063":{"description":"GNSS ECEF and LLA navigation solution with uncertainty.\nGlobal network-synchronized time, if available, otherwise zero.\nTime solution.\nThe method and number of leap seconds which were in use for deriving the timestamp are\ndefined in the fields below.\nMethod used for deriving the GNSS timestamp field.\nThis data type relies on the following definitions:\n  Leap seconds  - Accumulated one-second adjustments applied to UTC since 1972.\n                  For reference, on May 2017, the number of leap seconds was equal 27.\n                  The number of leap seconds is taken from the field num_leap_seconds.\n                  Refer to https://en.wikipedia.org/wiki/Leap_second for a general overview.\n  TAI timestamp - The number of microseconds between the current TAI time and\n                  the TAI time at UTC 1970-01-01T00:00:00.\n  UTC timestamp - The number of microseconds between the current UTC time and\n                  UTC 1970-01-01T00:00:00.\n                  UTC can be expressed via TAI as follows (in seconds):\n                      UTC = TAI - num_leap_seconds - 10\n                  And via GPS (in seconds):\n                      UTC = GPS - num_leap_seconds + 9\n  GPS timestamp - The number of microseconds between the current GPS time and\n                  the GPS time at UTC 1970-01-01T00:00:00.\n                  GPS time can be expressed via TAI as follows (in seconds):\n                      GPS = TAI - 19\nAccumulated one-second adjustments applied to UTC since 1972.\nThe number must agree with the currently correct number of UTC leap seconds. If this cannot\nbe garanteed, the field must be set to NUM_LEAP_SECONDS_UNKNOWN.\nPosition and velocity solution\nFix status\nGNSS Mode\nGNSS Sub mode\nPrecision\nPosition and velocity solution in ECEF, if available","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":3,"name":"gnssTimeStandard","description":""},{"type":"var","kind":"void","unsigned":false,"bits":13,"name":"#","description":"Reserved space"},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"numLeapSeconds","description":""},{"type":"var","kind":"int","unsigned":false,"bits":37,"name":"longitudeDeg1E8","description":"Longitude degrees multiplied by 1e8 (approx. 1 mm per LSB)"},{"type":"var","kind":"int","unsigned":false,"bits":37,"name":"latitudeDeg1E8","description":"Latitude degrees multiplied by 1e8 (approx. 1 mm per LSB on equator)"},{"type":"var","kind":"int","unsigned":false,"bits":27,"name":"heightEllipsoidMm","description":"Height above ellipsoid in millimeters"},{"type":"var","kind":"int","unsigned":false,"bits":27,"name":"heightMslMm","description":"Height above mean sea level in millimeters"},{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":32},"name":"nedVelocity","description":"NED frame (north-east-down) in meters per second"},{"type":"var","kind":"int","unsigned":true,"bits":6,"name":"satsUsed","description":""},{"type":"var","kind":"int","unsigned":true,"bits":2,"name":"status2DFix","description":"= 2"},{"type":"var","kind":"int","unsigned":true,"bits":2,"name":"status3DFix","description":"= 3"},{"type":"var","kind":"int","unsigned":true,"bits":2,"name":"status","description":""},{"type":"var","kind":"int","unsigned":true,"bits":4,"name":"mode","description":""},{"type":"var","kind":"int","unsigned":true,"bits":6,"name":"subMode","description":""},{"length":36,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"covariance","description":"Position and velocity covariance. Units are"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"pdop","description":""},{"length":1,"range":true,"type":"array","kind":{"kind":"ECEFPositionVelocity","unsigned":false,"bits":null,"type":"object"},"name":"ecefPositionVelocity","description":""}],"statics":["uint3 GNSS_TIME_STANDARD_NONE = 0  # Time is unknown","uint3 GNSS_TIME_STANDARD_TAI  = 1","uint3 GNSS_TIME_STANDARD_UTC  = 2","uint3 GNSS_TIME_STANDARD_GPS  = 3","uint8 NUM_LEAP_SECONDS_UNKNOWN = 0","uint2 STATUS_NO_FIX    = 0","uint2 STATUS_TIME_ONLY = 1","uint4 MODE_SINGLE      = 0","uint4 MODE_DGPS        = 1","uint4 MODE_RTK         = 2","uint4 MODE_PPP         = 3","uint6 SUB_MODE_DGPS_OTHER    = 0","uint6 SUB_MODE_DGPS_SBAS     = 1","uint6 SUB_MODE_RTK_FLOAT     = 0","uint6 SUB_MODE_RTK_FIXED     = 1"]},"info":{"id":"1063","hash":"ca41e7000f37435f","maxBitsLength":1769}},"1070":{"description":"Generic cargo holder/hardpoint command.\nEither a binary command (0 - release, 1+ - hold) or bitmask","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"hardpointId","description":""},{"type":"var","kind":"int","unsigned":true,"bits":16,"name":"command","description":""}],"statics":[]},"info":{"id":"1070","hash":"a1a036268b0c3455","maxBitsLength":24}},"1071":{"description":"Generic cargo holder/hardpoint status.\nMeaning is the same as for the command field in the Command message","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"hardpointId","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"payloadWeight","description":"Newton"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"payloadWeightVariance","description":""},{"type":"var","kind":"int","unsigned":true,"bits":16,"name":"status","description":""}],"statics":[]},"info":{"id":"1071","hash":"624a519d42553d82","maxBitsLength":56}},"1080":{"description":"Nodes that are capable of producing sounds should obey.","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"frequency","description":"Hz"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"duration","description":"Sec"}],"statics":[]},"info":{"id":"1080","hash":"be9ea9fec2b15d52","maxBitsLength":32}},"1081":{"description":"Lights control command.","type":"message","message":{"variables":[{"length":20,"range":true,"type":"array","kind":{"kind":"SingleLightCommand","unsigned":false,"bits":null,"type":"object"},"name":"commands","description":""}],"statics":[]},"info":{"id":"1081","hash":"2031d93c8bdd1ec4","maxBitsLength":485}},"1090":{"description":"Primary power supply status.\nTypical publishing rate should be around 1~2 Hz.\nHow many hours left to full discharge at average load over the last 10 seconds.\nTrue if the publishing node senses that an external power source can be used, e.g. to charge batteries.\nRemaining energy estimate in percent.","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"hoursToEmptyAt10SecAvgPower","description":"[Hours]"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"hoursToEmptyAt10SecAvgPowerVariance","description":"[Hours^2]"},{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"remainingEnergyPct","description":"[Percent] Required"},{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"remainingEnergyPctStdev","description":"[Percent] Error standard deviation. Use best guess if unknown."}],"statics":[]},"info":{"id":"1090","hash":"bba05074ad757480","maxBitsLength":47}},"1091":{"description":"Generic electrical circuit info.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":16,"name":"circuitId","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"voltage","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"current","description":""},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"errorFlags","description":""}],"statics":["uint8 ERROR_FLAG_OVERVOLTAGE  = 1","uint8 ERROR_FLAG_UNDERVOLTAGE = 2","uint8 ERROR_FLAG_OVERCURRENT  = 4","uint8 ERROR_FLAG_UNDERCURRENT = 8"]},"info":{"id":"1091","hash":"8313d33d0ddda115","maxBitsLength":56}},"1092":{"description":"Single battery info.\nTypical publishing rate should be around 0.2~1 Hz.\nPlease refer to the Smart Battery data specification for some elaboration.\nPrimary parameters.\nSome fields can be set to NAN if their values are unknown.\nFull charge capacity is expected to slowly reduce as the battery is aging. Normally its estimate is updated after\nevery charging cycle.\nStatus flags.\nNotes:\n - CHARGING must be always set as long as the battery is connected to a charger, even if the charging is complete.\n - CHARGED must be cleared immediately when the charger is disconnected.\nState of Health (SOH) estimate, in percent.\nhttp://en.wikipedia.org/wiki/State_of_health\nRelative State of Charge (SOC) estimate, in percent.\nhttp://en.wikipedia.org/wiki/State_of_charge\nBattery identification.\nModel instance ID must be unique within the same battery model name.\nModel name is a human-readable string that normally should include the vendor name, model name, and chemistry\ntype of this battery. This field should be assumed case-insensitive. Example: \"Zubax Smart Battery v1.1 LiPo\".","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"temperature","description":"[Kelvin]"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"voltage","description":"[Volt]"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"current","description":"[Ampere]"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"averagePower10Sec","description":"[Watt] Average power consumption over the last 10 seconds"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"remainingCapacityWh","description":"[Watt hours] Will be increasing during charging"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"fullChargeCapacityWh","description":"[Watt hours] Predicted battery capacity when it is fully charged. Falls with aging"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"hoursToFullCharge","description":"[Hours] Charging is expected to complete in this time; zero if not charging"},{"type":"var","kind":"int","unsigned":true,"bits":11,"name":"statusFlags","description":""},{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"stateOfHealthPct","description":"Health of the battery, in percent, optional"},{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"stateOfChargePct","description":"Percent of the full charge [0, 100]. This field is required"},{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"stateOfChargePctStdev","description":"SOC error standard deviation; use best guess if unknown"},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"batteryId","description":"Identifies the battery within this vehicle, e.g. 0 - primary battery"},{"type":"var","kind":"int","unsigned":true,"bits":32,"name":"modelInstanceId","description":"Set to zero if not applicable"},{"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"modelName","description":"Battery model name"}],"statics":["uint11 STATUS_FLAG_IN_USE       = 1     # The battery is currently used as a power supply","uint11 STATUS_FLAG_CHARGING     = 2     # Charger is active","uint11 STATUS_FLAG_CHARGED      = 4     # Charging complete, but the charger is still active","uint11 STATUS_FLAG_TEMP_HOT     = 8     # Battery temperature is above normal","uint11 STATUS_FLAG_TEMP_COLD    = 16    # Battery temperature is below normal","uint11 STATUS_FLAG_OVERLOAD     = 32    # Safe operating area violation","uint11 STATUS_FLAG_BAD_BATTERY  = 64    # This battery should not be used anymore (e.g. low SOH)","uint11 STATUS_FLAG_NEED_SERVICE = 128   # This battery requires maintenance (e.g. balancing, full recharge)","uint11 STATUS_FLAG_BMS_ERROR    = 256   # Battery management system/controller error, smart battery interface error","uint11 STATUS_FLAG_RESERVED_A   = 512   # Keep zero","uint11 STATUS_FLAG_RESERVED_B   = 1024  # Keep zero","uint7 STATE_OF_HEALTH_UNKNOWN = 127     # Use this constant if SOH cannot be estimated"]},"info":{"id":"1092","hash":"249c26548a711966","maxBitsLength":437}},"1100":{"description":"This message represents the system arming status.\nSome nodes may refuse to operate unless the system is fully armed.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"status","description":""}],"statics":["uint8 STATUS_DISARMED           = 0","uint8 STATUS_FULLY_ARMED        = 255"]},"info":{"id":"1100","hash":"8700f375556a8003","maxBitsLength":8}},"1110":{"description":"Generic device temperature","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":16,"name":"deviceId","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"temperature","description":"in kelvin"},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"errorFlags","description":""}],"statics":["uint8 ERROR_FLAG_OVERHEATING = 1","uint8 ERROR_FLAG_OVERCOOLING = 2"]},"info":{"id":"1110","hash":"70261c28a94144c6","maxBitsLength":40}},"1120":{"description":"Generic status message of a piston engine control system.\nAll integer fields are required unless stated otherwise.\nAll floating point fields are optional unless stated otherwise; unknown/unapplicable fields should be set to NaN.\nAbstract engine state. The flags defined below can provide further elaboration.\nThis is a required field.\nThe engine is not running. This is the default state.\nNext states: STARTING, FAULT\nThe engine is starting. This is a transient state.\nNext states: STOPPED, RUNNING, FAULT\nThe engine is running normally.\nSome error flags may be set to indicate non-fatal issues, e.g. overheating.\nNext states: STOPPED, FAULT\nThe engine can no longer function.\nThe error flags may contain additional information about the nature of the fault.\nNext states: STOPPED.\nGeneral status flags.\nNote that not all flags are required. Those that aren't are prepended with a validity flag, which is, obviously,\nalways required; when the validity flag is set, it is assumed that the relevant flags are set correctly.\nIf the validity flag is cleared, then the state of the relevant flags should be ignored.\nAll unused bits must be cleared.\nGeneral error. This flag is required, and it can be used to indicate an error condition\nthat does not fit any of the other flags.\nNote that the vendor may also report additional status information via the vendor specific status code\nfield of the NodeStatus message.\nError of the crankshaft sensor. This flag is optional.\nTemperature levels. These flags are optional; either none of them or all of them are supported.\nFuel pressure. These flags are optional; either none of them or all of them are supported.\nDetonation warning. This flag is optional.\nThis warning is cleared immediately after broadcasting is done if detonation is no longer happening.\nMisfire warning. This flag is optional.\nThis warning is cleared immediately after broadcasting is done if misfire is no longer happening.\nOil pressure. These flags are optional; either none of them or all of them are supported.\nDebris warning. This flag is optional.\nReserved space\nEngine load estimate.\nUnit: percent.\nRange: [0, 127].\nEngine speed.\nUnit: revolutions per minute.\nSpark dwell time.\nUnit: millisecond.\nAtmospheric (barometric) pressure.\nUnit: kilopascal.\nEngine intake manifold pressure.\nUnit: kilopascal.\nEngine intake manifold temperature.\nUnit: kelvin.\nEngine coolant temperature.\nUnit: kelvin.\nOil pressure.\nUnit: kilopascal.\nOil temperature.\nUnit: kelvin.\nFuel pressure.\nUnit: kilopascal.\nInstant fuel consumption estimate.\nThe estimated value should be low-pass filtered in order to prevent aliasing effects.\nUnit: (centimeter^3)/minute.\nEstimate of the consumed fuel since the start of the engine.\nThis variable MUST be reset when the engine is stopped.\nUnit: centimeter^3.\nThrottle position.\nUnit: percent.\nThe index of the publishing ECU.\nSpark plug activity report.\nCan be used during pre-flight tests of the spark subsystem.\nPer-cylinder status information.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":2,"name":"state","description":""},{"type":"var","kind":"int","unsigned":true,"bits":30,"name":"flags","description":""},{"type":"var","kind":"void","unsigned":false,"bits":16,"description":""},{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"engineLoadPercent","description":""},{"type":"var","kind":"int","unsigned":true,"bits":17,"name":"engineSpeedRpm","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"sparkDwellTimeMs","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"atmosphericPressureKpa","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"intakeManifoldPressureKpa","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"intakeManifoldTemperature","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"coolantTemperature","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"oilPressure","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"oilTemperature","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"fuelPressure","description":""},{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"fuelConsumptionRateCm3Pm","description":""},{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"estimatedConsumedFuelVolumeCm3","description":""},{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"throttlePositionPercent","description":""},{"type":"var","kind":"int","unsigned":true,"bits":6,"name":"ecuIndex","description":""},{"type":"var","kind":"int","unsigned":true,"bits":3,"name":"sparkPlugUsage","description":""},{"length":16,"range":true,"type":"array","kind":{"kind":"CylinderStatus","unsigned":true,"bits":null,"type":"object"},"name":"cylinderStatus","description":""}],"statics":["uint2 STATE_STOPPED = 0","uint2 STATE_STARTING = 1","uint2 STATE_RUNNING = 2","uint2 STATE_FAULT = 3","uint30 FLAG_GENERAL_ERROR                       = 1","uint30 FLAG_CRANKSHAFT_SENSOR_ERROR_SUPPORTED   = 2","uint30 FLAG_CRANKSHAFT_SENSOR_ERROR             = 4","uint30 FLAG_TEMPERATURE_SUPPORTED               = 8","uint30 FLAG_TEMPERATURE_BELOW_NOMINAL           = 16      # Under-temperature warning","uint30 FLAG_TEMPERATURE_ABOVE_NOMINAL           = 32      # Over-temperature warning","uint30 FLAG_TEMPERATURE_OVERHEATING             = 64      # Critical overheating","uint30 FLAG_TEMPERATURE_EGT_ABOVE_NOMINAL       = 128     # Exhaust gas over-temperature warning","uint30 FLAG_FUEL_PRESSURE_SUPPORTED             = 256","uint30 FLAG_FUEL_PRESSURE_BELOW_NOMINAL         = 512     # Under-pressure warning","uint30 FLAG_FUEL_PRESSURE_ABOVE_NOMINAL         = 1024    # Over-pressure warning","uint30 FLAG_DETONATION_SUPPORTED                = 2048","uint30 FLAG_DETONATION_OBSERVED                 = 4096    # Detonation condition observed warning","uint30 FLAG_MISFIRE_SUPPORTED                   = 8192","uint30 FLAG_MISFIRE_OBSERVED                    = 16384   # Misfire condition observed warning","uint30 FLAG_OIL_PRESSURE_SUPPORTED              = 32768","uint30 FLAG_OIL_PRESSURE_BELOW_NOMINAL          = 65536   # Under-pressure warning","uint30 FLAG_OIL_PRESSURE_ABOVE_NOMINAL          = 131072  # Over-pressure warning","uint30 FLAG_DEBRIS_SUPPORTED                    = 262144","uint30 FLAG_DEBRIS_DETECTED                     = 524288  # Detection of debris warning","uint3 SPARK_PLUG_SINGLE         = 0","uint3 SPARK_PLUG_FIRST_ACTIVE   = 1","uint3 SPARK_PLUG_SECOND_ACTIVE  = 2","uint3 SPARK_PLUG_BOTH_ACTIVE    = 3"]},"info":{"id":"1120","hash":"d38aa3ee75537ec6","maxBitsLength":1565}},"1129":{"description":"Generic fuel tank status message.\nAll fields are required unless stated otherwise. Unpopulated optional fields should be set to NaN.\nReserved for future use.\nThe estimated amount of fuel.\nThe reported values can be either measured directly using appropriate sensors,\nor they can be estimated by fusing the data provided by various sensors.\nFor example, a Kalman filter can be used to fuse the data from fuel level sensors and flow sensors.\nAll fields are required.\nEstimate of the current fuel consumption rate.\nThe flow can be negative if the fuel is being transferred between the tanks or during refueling.\nThis field is required.\nUnit: (centimeter^3)/minute\nFuel temperature.\nThis field is optional, set to NaN if not provided.\nUnit: kelvin\nThe ID of the current fuel tank.","type":"message","message":{"variables":[{"type":"var","kind":"void","unsigned":false,"bits":9,"description":""},{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"availableFuelVolumePercent","description":"Unit: percent, from 0% to 100%"},{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"availableFuelVolumeCm3","description":"Unit: centimeter^3"},{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"fuelConsumptionRateCm3Pm","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"fuelTemperature","description":""},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"fuelTankId","description":""}],"statics":[]},"info":{"id":"1129","hash":"286b4a387ba84bc4","maxBitsLength":104}},"2000":{"description":"Inertial data and orientation in body frame with fused location.\nFields marked as optional should be set to NaN if the corresponding value is unknown.\nGlobal network synchronized timestamp, if known.\nSet to zero if the timestamp is not known.\nGeo location [angular degree].\nHeight estimates [meter].\nAtmospheric pressure adjusted to sea level [hectopascal].\nRotation quaternion between the NED frame and the body frame.\nZero rotation corresponds to the following orientation:\n  X facing north\n  Y facing east\n  Z facing down\nColumn order:\n  longitude                                   [meter^2]\n  latitude                                    [meter^2]\n  height (MSL or ellipsoid, whichever worse)  [meter^2]\n  roll angle                                  [radian^2]\n  pitch angle                                 [radian^2]\n  yaw angle                                   [radian^2]\nLinear velocity in the body frame, X-Y-Z [meter/second].\nAngular velocity in the body frame, roll-pitch-yaw [radian/second].\nLow resolution estimate of the linear acceleration in the body frame [(meter/second)^2].\nThis estimate should be properly downsampled in order to avoid aliasing effects.\nColumn order:\n  X velocity      [(meter/second)^2]\n  Y velocity      [(meter/second)^2]\n  Z velocity      [(meter/second)^2]\n  roll velocity   [(radian/second)^2]\n  pitch velocity  [(radian/second)^2]\n  yaw velocity    [(radian/second)^2]","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":64,"name":"longitude","description":"required"},{"type":"var","kind":"float","unsigned":false,"bits":64,"name":"latitude","description":"required"},{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"heightEllipsoid","description":"Above ellipsoid (required)"},{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"heightMsl","description":"Above the mean sea level (required)"},{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"heightAgl","description":"Above ground level (provided by radar altimeter or LIDAR) (optional)"},{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"heightBaro","description":"Barometric height (optional)"},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"qnhHpa","description":"optional"},{"length":4,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":32},"name":"orientationXyzw","description":""},{"length":36,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"poseCovariance","description":""},{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":32},"name":"linearVelocityBody","description":""},{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":32},"name":"angularVelocityBody","description":""},{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"linearAccelerationBody","description":""},{"length":36,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"velocityCovariance","description":""}],"statics":[]},"info":{"id":"2000","hash":"463b10cccbe51c3d","maxBitsLength":1860}},"2010":{"description":"This message struct carries arbitrary data in the format of the specified high-level protocol.\nThe data will be delivered to all nodes that are interested in tunneled protocols.\nFiner addressing schemes may be implemented using the means provided by the encapsulated protocol.\nThe channelID allows for additional routing between the source and target nodes.","type":"message","message":{"variables":[{"type":"object","kind":"Protocol","name":"protocol","description":""},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"channelId","description":""},{"length":60,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"buffer","description":"TAO rules apply"}],"statics":[]}},"16370":{"description":"Generic named parameter (key/value pair).\nIntegers are exactly representable in the range (-2^24, 2^24) which is (-16'777'216, 16'777'216).\nTail array optimization is enabled, so if key length does not exceed 3 characters, the whole\nmessage can fit into one CAN frame. The message always fits into one CAN FD frame.","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"value","description":""},{"length":58,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"key","description":""}],"statics":[]},"info":{"id":"16370","hash":"e02f25d6e0c98ae0","maxBitsLength":502}},"16383":{"description":"Generic log message.\nAll items are byte aligned.","type":"message","message":{"variables":[{"type":"object","kind":"LogLevel","name":"level","description":""},{"length":31,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"source","description":""},{"length":90,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"text","description":""}],"statics":[]},"info":{"id":"16383","hash":"d654a48e0c049d75","maxBitsLength":983}},"CANIfaceStats":{"description":"Single CAN iface statistics.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":48,"name":"framesTx","description":"Number of transmitted CAN frames."},{"type":"var","kind":"int","unsigned":true,"bits":48,"name":"framesRx","description":"Number of received CAN frames."},{"type":"var","kind":"int","unsigned":true,"bits":48,"name":"errors","description":"Number of errors in the CAN layer."}],"statics":[]}},"CoarseOrientation":{"description":"Nested type.\nCoarse, low-resolution 3D orientation represented as fixed axes in 16 bit.\nRoll, pitch, yaw angles in radians should be multiplied by\nANGLE_MULTIPLIER in order to convert them to the coarse representation.\nANGLE_MULTIPLIER = NORM / PI\nWhere NORM is 12, because it:\n - Fits the maximum range of a signed 5 bit integer\n - Allows to exactly represent the following angles:\n   0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, and negatives","type":"message","message":{"variables":[{"length":3,"type":"array","kind":{"type":"var","kind":"int","unsigned":false,"bits":5},"name":"fixedAxisRollPitchYaw","description":""}],"statics":["float32 ANGLE_MULTIPLIER = 4.7746482927568605"]}},"Command":{"description":"Nested type.\nSingle actuator command.\nWhether the units are linear or angular depends on the actuator type.\nValue of the above type","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"actuatorId","description":""},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"commandType","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"commandValue","description":""}],"statics":["uint8 COMMAND_TYPE_UNITLESS     = 0     # [-1, 1]","uint8 COMMAND_TYPE_POSITION     = 1     # meter or radian","uint8 COMMAND_TYPE_FORCE        = 2     # Newton or Newton metre","uint8 COMMAND_TYPE_SPEED        = 3     # meter per second or radian per second"]}},"CylinderStatus":{"description":"Cylinder state information.\nThis is a nested data type.\nAll unknown parameters should be set to NaN.\nCylinder ignition timing.\nUnits: angular degrees of the crankshaft.\nFuel injection time.\nUnits: millisecond.\nCylinder head temperature (CHT).\nUnits: kelvin.\nExhaust gas temperature (EGT).\nSet to NaN if this cylinder is not equipped with an EGT sensor.\nSet this field to the same value for all cylinders if there is a single shared EGT sensor.\nUnits: kelvin.\nEstimated lambda coefficient.\nThis parameter is mostly useful for monitoring and tuning purposes.\nUnit: dimensionless ratio","type":"message","message":{"variables":[{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"ignitionTimingDeg","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"injectionTimeMs","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"cylinderHeadTemperature","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"exhaustGasTemperature","description":""},{"type":"var","kind":"float","unsigned":false,"bits":16,"name":"lambdaCoefficient","description":""}],"statics":[]}},"DataTypeKind":{"description":"Data type kind (message or service).","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"value","description":""}],"statics":["uint8 SERVICE = 0","uint8 MESSAGE = 1"]}},"ECEFPositionVelocity":{"description":"Nested type.\nGNSS ECEF high resolution position and velocity.\nECEF is an acronym for Earth-Centered-Earth-Fixed, which is a cartesian\ncoordinate system which rotates with the earth. The origin (0,0,0) is\nlocated at the center of the earth. The x-axis is a vector pointing from\nthe origin with positive direction towards 0 degrees latitude and\nlongitude (equator, at the prime meridian). The z-axis is a vector\npointing from the origin towards the north-pole. The y-axis completes a\nright-handed coordinate system.","type":"message","message":{"variables":[{"length":3,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":32},"name":"velocityXyz","description":"XYZ velocity in m/s"},{"length":3,"type":"array","kind":{"type":"var","kind":"int","unsigned":false,"bits":36},"name":"positionXyzMm","description":"XYZ-axis coordinates in mm"},{"type":"var","kind":"void","unsigned":false,"bits":6,"name":"#","description":"Aligns the following array at byte boundary"},{"length":36,"range":true,"type":"array","kind":{"type":"var","kind":"float","unsigned":false,"bits":16},"name":"covariance","description":"Position and velocity covariance in the ECEF frame. Units are m^2 for position,"}],"statics":[]}},"Empty":{"description":"Ex nihilo nihil fit.","type":"message"},"Entry":{"description":"THIS DEFINITION IS SUBJECT TO CHANGE.\nOne dynamic node ID allocation entry.\nThis type is a part of the Raft consensus algorithm.\nPlease refer to the specification for details.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":32,"name":"term","description":"Refer to the Raft paper for explanation."},{"length":16,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"uniqueId","description":"Unique ID of this allocation."},{"type":"var","kind":"void","unsigned":false,"bits":1,"description":""},{"type":"var","kind":"int","unsigned":true,"bits":7,"name":"nodeId","description":"Node ID of this allocation."}],"statics":[]}},"EntryType":{"description":"Nested type.\nRepresents the type of the file system entry (e.g. file or directory).\nIf such entry does not exist, 'flags' must be set to zero.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"flags","description":""}],"statics":["uint8 FLAG_FILE      = 1        # Excludes FLAG_DIRECTORY","uint8 FLAG_DIRECTORY = 2        # Excludes FLAG_FILE","uint8 FLAG_SYMLINK   = 4        # Link target is either FLAG_FILE or FLAG_DIRECTORY","uint8 FLAG_READABLE  = 8","uint8 FLAG_WRITEABLE = 16"]}},"Error":{"description":"Nested type.\nFile operation result code.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":false,"bits":16,"name":"value","description":""}],"statics":["int16 OK                = 0","int16 UNKNOWN_ERROR     = 32767","int16 NOT_FOUND         = 2","int16 IO_ERROR          = 5","int16 ACCESS_DENIED     = 13","int16 IS_DIRECTORY      = 21 # I.e. attempt to read/write on a path that points to a directory","int16 INVALID_VALUE     = 22 # E.g. file name is not valid for the target file system","int16 FILE_TOO_LARGE    = 27","int16 OUT_OF_SPACE      = 28","int16 NOT_IMPLEMENTED   = 38"]}},"HardwareVersion":{"description":"Nested type.\nGeneric hardware version information.\nThese values should remain unchanged for the device's lifetime.\nHardware version code.\nUnique ID is a 128 bit long sequence that is globally unique for each node.\nAll zeros is not a valid UID.\nIf filled with zeros, assume that the value is undefined.\nCertificate of authenticity (COA) of the hardware, 255 bytes max.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"major","description":""},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"minor","description":""},{"length":16,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"uniqueId","description":""},{"length":255,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"certificateOfAuthenticity","description":""}],"statics":[]}},"LogLevel":{"description":"Log message severity","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":3,"name":"value","description":""}],"statics":["uint3 DEBUG    = 0","uint3 INFO     = 1","uint3 WARNING  = 2","uint3 ERROR    = 3"]}},"Mode":{"description":"Gimbal operating mode","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"commandMode","description":""}],"statics":["uint8 COMMAND_MODE_ANGULAR_VELOCITY        = 0","uint8 COMMAND_MODE_ORIENTATION_FIXED_FRAME = 1","uint8 COMMAND_MODE_ORIENTATION_BODY_FRAME  = 2","uint8 COMMAND_MODE_GEO_POI                 = 3"]}},"NumericValue":{"description":"Numeric-only value.\nThis is a union, which means that this structure can contain either one of the fields below.\nThe structure is prefixed with tag - a selector value that indicates which particular field is encoded.","type":"union","message":{"variables":[{"type":"object","kind":"Empty","name":"empty","description":"Empty field, used to represent an undefined value."},{"type":"var","kind":"int","unsigned":false,"bits":64,"name":"integerValue","description":""},{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"realValue","description":""}],"statics":[]}},"Path":{"description":"Nested type.\nFile system path in UTF8.\nThe only valid separator is forward slash.","type":"message","message":{"variables":[{"length":200,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"path","description":""}],"statics":["uint8 SEPARATOR = '/'"]}},"Protocol":{"description":"This enumeration specifies the encapsulated protocol.\nNew protocols are likely to be added in the future.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"protocol","description":""}],"statics":["uint8 MAVLINK                   = 0     # MAVLink"]}},"RGB565":{"description":"Nested type.\nRGB color in the standard 5-6-5 16-bit palette.\nMonocolor lights should interpret this as brightness setpoint: from zero (0, 0, 0) to full brightness (31, 63, 31).","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":5,"name":"red","description":""},{"type":"var","kind":"int","unsigned":true,"bits":6,"name":"green","description":""},{"type":"var","kind":"int","unsigned":true,"bits":5,"name":"blue","description":""}],"statics":[]}},"SingleLightCommand":{"description":"Nested type.\nControls single light source, color or monochrome.\nCommon aircraft lights IDs\ninform the crew working on the apron around noisy airplanes, wearing hearing protection,\nthat the engines are turned on. Also called beacon light\na red light is mounted on the left, or port, side of the craft and a green on the right,\nor starboard, side both 110 degree, and tail white light of 140 degree. Also called navigation lights\nhigh-intensity burst of white light, to help other pilots recognize the\naircraft's position in low-visibility conditions\npositioned on the outer side just in front of the engine cowlings on the fuselage\nlights that highlite on the logo painted on the tail or other visible surface.\nAlso called vertical tail flood lights\nhelp the pilots see the area in front of them and also shows other traffic that they're on the move\nlight up the area in front of the airplane a bit more towards the side, easier for turns\nvery bright, lights up the area in front but a lot more than the taxi light\nvery bright lights on the wings to help the pilots during landing by\nlighting up the area where they're going to touch down\nusually yellow electroluminescent lightstrips designed to use\nduring formation flying at night or under low visibility conditions","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"lightId","description":""}],"statics":["uint8 LIGHT_ID_ANTI_COLLISION = 246","uint8 LIGHT_ID_RIGHT_OF_WAY   = 247","uint8 LIGHT_ID_STROBE         = 248","uint8 LIGHT_ID_WING           = 249","uint8 LIGHT_ID_LOGO           = 250","uint8 LIGHT_ID_TAXI           = 251","uint8 LIGHT_ID_TURN_OFF       = 252","uint8 LIGHT_ID_TAKE_OFF       = 253","uint8 LIGHT_ID_LANDING        = 254","uint8 LIGHT_ID_FORMATION      = 255"]}},"SoftwareVersion":{"description":"Nested type.\nGeneric software version information.\nPrimary version numbers.\nIf both fields are set to zero, the version is considered unknown.\nThis mask indicates which optional fields (see below) are set.\nVCS commit hash or revision number, e.g. git short commit hash. Optional.\nThe value of an arbitrary hash function applied to the firmware image.\nThis field is used to detect whether the firmware running on the node is EXACTLY THE SAME\nas a certain specific revision. This field provides the absolute identity guarantee, unlike\nthe version fields above, which can be the same for different builds of the firmware.\nThe exact hash function and the methods of its application are implementation defined.\nHowever, implementations are recommended to adhere to the following guidelines,\nfully or partially:\n  - The hash function should be CRC-64-WE, the same that is used for computing DSDL signatures.\n  - The hash function should be applied to the entire application image padded to 8 bytes.\n  - If the computed image CRC is stored within the firmware image itself, the value of\n    the hash function becomes ill-defined, because it becomes recursively dependent on itself.\n    In order to circumvent this issue, while computing or checking the CRC, its value stored\n    within the image should be zeroed out.","type":"message","message":{"variables":[{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"major","description":""},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"minor","description":""},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"optionalFieldFlags","description":""},{"type":"var","kind":"int","unsigned":true,"bits":32,"name":"vcsCommit","description":""},{"type":"var","kind":"int","unsigned":true,"bits":64,"name":"imageCrc","description":""}],"statics":["uint8 OPTIONAL_FIELD_FLAG_VCS_COMMIT = 1","uint8 OPTIONAL_FIELD_FLAG_IMAGE_CRC  = 2"]}},"Timestamp":{"description":"Global timestamp in microseconds, 7 bytes.\nUse this data type for timestamp fields in messages, like follows:\n  uavcan.Timestamp timestamp","type":"message","message":{"variables":[],"statics":["uint56 UNKNOWN = 0"]}},"Value":{"description":"Single parameter value.\nThis is a union, which means that this structure can contain either one of the fields below.\nThe structure is prefixed with tag - a selector value that indicates which particular field is encoded.","type":"union","message":{"variables":[{"type":"object","kind":"Empty","name":"empty","description":"Empty field, used to represent an undefined value."},{"type":"var","kind":"int","unsigned":false,"bits":64,"name":"integerValue","description":""},{"type":"var","kind":"float","unsigned":false,"bits":32,"name":"realValue","description":"32-bit type is used to simplify implementation on low-end systems"},{"type":"var","kind":"int","unsigned":true,"bits":8,"name":"booleanValue","description":"8-bit value is used for alignment reasons"},{"length":128,"range":true,"type":"array","kind":{"type":"var","kind":"int","unsigned":true,"bits":8},"name":"stringValue","description":"Length prefix is exactly one byte long, which ensures proper alignment of payload"}],"statics":[]}}};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

/* eslint-disable no-proto */


var base64 = __webpack_require__(13);

var ieee754 = __webpack_require__(14);

var isArray = __webpack_require__(15);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */

Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
/*
 * Export kMaxLength after typed array support is determined.
 */

exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {
      __proto__: Uint8Array.prototype,
      foo: function foo() {
        return 42;
      }
    };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }

    that.length = length;
  }

  return that;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */


function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  } // Common case.


  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }

    return allocUnsafe(this, arg);
  }

  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation
// TODO: Legacy, not needed anymore. Remove in next major version.

Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/


Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;

  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);

  if (size <= 0) {
    return createBuffer(that, size);
  }

  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }

  return createBuffer(that, size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/


Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }

  return that;
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */


Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */


Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }

  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }

  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }

      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }

  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }

  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;
  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;

    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;

  if (length === undefined) {
    length = 0;

    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;

  for (i = 0; i < list.length; ++i) {
    var buf = list[i];

    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    buf.copy(buffer, pos);
    pos += buf.length;
  }

  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }

  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0; // Use a for loop to avoid recursion

  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;

      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;

      case 'hex':
        return len >>> 1;

      case 'base64':
        return base64ToBytes(string).length;

      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8

        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}

Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.
  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

  if (start === undefined || start < 0) {
    start = 0;
  } // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.


  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
} // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.


Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;

  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }

  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }

  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;

  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }

  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }

  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;

  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }

  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }

  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;

  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }

  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }

  if (end === undefined) {
    end = target ? target.length : 0;
  }

  if (thisStart === undefined) {
    thisStart = 0;
  }

  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }

  if (thisStart >= thisEnd) {
    return -1;
  }

  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf


function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1; // Normalize byteOffset

  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }

  byteOffset = +byteOffset; // Coerce to Number.

  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  } // Normalize byteOffset: negative offsets start from the end of the buffer


  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  } // Normalize val


  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  } // Finally, search either indexOf (if dir is true) or lastIndexOf


  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }

    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]

    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }

    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();

    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }

      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;

  if (dir) {
    var foundIndex = -1;

    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

    for (i = byteOffset; i >= 0; i--) {
      var found = true;

      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }

      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;

  if (!length) {
    length = remaining;
  } else {
    length = Number(length);

    if (length > remaining) {
      length = remaining;
    }
  } // must be an even number of digits


  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }

  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }

  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0; // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0; // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;

    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    } // legacy write(string, encoding, offset, length) - remove in v0.13

  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';
  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;

  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }

          break;

        case 2:
          secondByte = buf[i + 1];

          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }

      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
} // Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety


var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;

  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  } // Decode in chunks to avoid "call stack size exceeded".


  var res = '';
  var i = 0;

  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }

  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }

  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }

  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';

  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }

  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';

  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }

  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;
  var newBuf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);

    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */


function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;

  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];

  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
}; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

  if (end > this.length) end = this.length;

  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
}; // Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])


Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }

    if (val.length === 1) {
      var code = val.charCodeAt(0);

      if (code < 256) {
        val = code;
      }
    }

    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }

    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } // Invalid ranges are not set to a default, so can range check early.


  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;

  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
}; // HELPER FUNCTIONS
// ================


var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

  if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

  while (str.length % 4 !== 0) {
    str = str + '=';
  }

  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i); // is surrogate component

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } // valid lead


        leadSurrogate = codePoint;
        continue;
      } // 2 leads in a row


      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      } // valid surrogate pair


      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null; // encode utf8

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }

  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(12)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global BigInt */

const n1 = BigInt(1);

const parseFloat = __webpack_require__(16);

const parseInt = __webpack_require__(7);

function processVar(bigInt, variable, from) {
  let value;

  switch (variable.kind) {
    case 'void': // void is just padding and can contain anything. it is not actively read.

    case 'int':
      {
        let currentValue = getCurrentValue(bigInt, variable.bits, from);
        value = parseInt(currentValue, variable.bits, variable.unsigned);
        from -= BigInt(variable.bits);
      }
      break;

    case 'float':
      {
        let currentValue = getCurrentValue(bigInt, variable.bits, from);
        value = parseFloat(currentValue, variable.bits);
        from -= BigInt(variable.bits);
      }
      break;

    default:
      throw new Error("Unknown variable kind: ".concat(variable.kind));
  }

  return {
    value,
    from
  };
}

function getCurrentValue(bigValue, nbBits, from) {
  return bigValue >> from - BigInt(nbBits) & (n1 >> BigInt(nbBits)) - n1;
}

module.exports = processVar;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global BigInt */

const n1 = BigInt(1);

const serializeInt = __webpack_require__(9);

const serializeFloat = __webpack_require__(21);

function processVar(data, variable, bigResult) {
  switch (variable.kind) {
    case 'void':
      bigResult.value <<= BigInt(variable.bits);
      bigResult.nbBits += variable.bits;
      break;

    case 'int':
      {
        if (data === undefined) {
          throw Error("Undefined variable: ".concat(JSON.stringify(variable)));
        }

        let value = serializeInt(data, variable.bits, variable.unsigned);
        bigResult.value <<= BigInt(variable.bits);
        bigResult.value |= value;
        bigResult.nbBits += variable.bits;
        break;
      }

    case 'float':
      if (data === undefined) {
        throw Error("Undefined variable: ".concat(JSON.stringify(variable)));
      }

      let value = serializeFloat(data, variable.bits, variable.unsigned);
      bigResult.value <<= BigInt(variable.bits);
      bigResult.value |= value;
      bigResult.nbBits += variable.bits;
      break;

    default:
      throw new Error("Unknown variable kind: ".concat(variable.kind));
  }
}

function getCurrentValue(bigValue, nbBits, from) {
  return bigValue >> from - BigInt(nbBits) & (n1 >> BigInt(nbBits)) - n1;
}

module.exports = processVar;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
/* global BigInt */

const processVariable = __webpack_require__(5);
/**
 *
 * @param {*} data Buffer
 * @param {*} kind
 */


function parse(data, kind) {
  let isService = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let isRequest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  let buffer;

  if (Array.isArray(data)) {
    buffer = Buffer.from(data);
  } else if (Buffer.isBuffer(data)) {
    buffer = data;
  } else {
    throw new Error('parse, data should be a uint8 array');
  }

  let bigValue = BigInt("0x".concat(buffer.toString('hex')));
  let result = {};
  let from = BigInt(buffer.length * 8);
  let transfer = {};

  if (!isService) {
    transfer = kind.message;
  } else if (isService) {
    if (isRequest) {
      transfer = kind.request;
    } else {
      transfer = kind.response;
    }
  } else {
    throw new Error('parse: Not a service or message');
  }

  for (let variable of transfer.variables) {
    let currentResult = processVariable(bigValue, variable, from);

    if (variable.name) {
      result[variable.name] = currentResult.value;

      if (currentResult.valueStr) {
        result["".concat(variable.name, "Str")] = currentResult.valueStr;
      }
    }

    from = currentResult.from;
  }

  return result;
}

module.exports = parse;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1).Buffer))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const processVar = __webpack_require__(2);

const processArray = __webpack_require__(17);

const processUnion = __webpack_require__(18);

function processVariable(bigValue, variable, from) {
  switch (variable.type) {
    case 'var':
      return processVar(bigValue, variable, from);

    case 'union':
      return processUnion(bigValue, variable, from);

    case 'object':
      let processObject = __webpack_require__(19); // cyclic dependency !!!


      return processObject(bigValue, variable, from);

    case 'array':
      return processArray(bigValue, variable, from);

    default:
      throw new Error("Unknown variable kind: ".concat(variable.kind));
  }
}

module.exports = processVariable;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// based on https://gist.github.com/soyemi/4016500c7cfb7c8e8e435c166d539ddd


function byteToFloat16(uint16) {
  let d = uint16;
  let negative = (d >> 15 & 1) !== 0;
  let mask = 0b11111;
  let exponent = d >> 10 & mask;
  let significand = d & 0b1111111111;

  if (exponent === 0 && significand === 0) {
    return negative ? -0 : 0;
  }

  if (exponent === mask) {
    if (significand === 0) {
      return negative ? -Infinity : Infinity;
    } else {
      return NaN;
    }
  }

  let f = 0;

  if (exponent === 0) {
    f = significand / 512.0;
  } else {
    f = 1.0 + significand / 1024.0;
  }

  return (negative ? -1.0 : 1.0) * Math.pow(2, exponent - 15) * f;
}

function float16ToByte(float16) {
  let f = float16;
  if (isNaN(f)) return 0b0111110000000001;
  if (1 / f === -Infinity) return 0b1000000000000000;
  if (f === 0) return 0;
  if (f === -Infinity) return 0b1111110000000000;
  if (f === Infinity) return 0b0111110000000000;
  let negative = f < 0;
  f = Math.abs(f);
  let fe = Math.floor(f);
  let e = 0;
  let si = 0;

  if (fe > 0) {
    while (fe > 0) {
      e++;
      fe = fe >> 1;
    }

    e += 14;
    let em = Math.pow(2, e - 15);
    let s = f / em - 1.0;
    si = Math.round(s * 1024);
  } else {
    let fi = f * (1 << 15);
    fe = Math.floor(fi);

    if (fe > 0) {
      while (fe > 0) {
        e++;
        fe = fe >> 1;
      }

      e--;
    }

    if (e === 0) {
      si = Math.round(fi * 512);
    } else {
      let em = 1 << e;
      let s = fi / em - 1.0;
      si = Math.round(s * 1024);
    }
  }

  return (e << 10) + si + (negative ? 1 << 15 : 0);
}

module.exports = {
  byteToFloat16,
  float16ToByte
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global BigInt */

const n0 = BigInt(0);
const n1 = BigInt(1);
const n2 = BigInt(2);
const n3 = BigInt(3);
const n8 = BigInt(8);
const n255 = BigInt(255);
/*
  Can be an arbitrary length integer
*/

function parseInt(original, nbBits, unsigned) {
  nbBits = BigInt(nbBits); // in the value we should now deal with spanning on 2 bytes like
  // 01000100 0110xxxx (12 bits integer) knowing that encoding is Little Endian
  // we initialize the value with the last bits (from 1 to 8 bits)
  // need to round to 8 bits

  let closest8 = nbBits - n1 >> n3 << n3;
  let value = original & (n1 << nbBits - closest8) - n1;
  original >>= nbBits - closest8; // console.log({ bigInt, nbBits, original, from, closest8, value });
  // we need to invert the bytes and create the correct mask on the last one

  for (let i = n8; i < nbBits; i += n8) {
    value <<= n8;
    value |= original & n255;
    original >>= n8;
  }

  if (!unsigned) {
    value = getTwosComplement(value, nbBits);
  }

  return Number(value);
  /* FUTURE, when json.stringify knows how to handle bigint
    if (variable.bits < 53) {
      return Number(value); // can only store 53 bits in javascript for an integer
    } else {
      return value;
    }
    */
}

function getTwosComplement(val, len) {
  if (len) {
    let mask = n2 ** (len - n1);
    return -(val & mask) + (val & ~mask);
  } else {
    return 0;
  }
}

module.exports = parseInt;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const processVar = __webpack_require__(3);

const processArray = __webpack_require__(22);

const processUnion = __webpack_require__(23);

function processVariable(data, variable, bigResult) {
  switch (variable.type) {
    case 'var':
      processVar(data[variable.name], variable, bigResult);
      break;

    case 'union':
      processUnion(data[variable.name], variable, bigResult);
      break;

    case 'object':
      let processObject = __webpack_require__(24);

      processObject(data[variable.name], variable, bigResult);
      break;

    case 'array':
      processArray(data, variable, bigResult);
      break;

    default:
      throw Error("Unknown variable kind: ".concat(variable.kind));
  }
}

module.exports = processVariable;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global BigInt */

/*
  Can be an arbitrary length integer
  Can be signed or unsigned
  This method will do capping and encode as little endian
*/

const n0 = BigInt(0);
const n1 = BigInt(1);
const n8 = BigInt(8);
const n255 = BigInt(255);

function serializeInt(value, nbBits) {
  let unsigned = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  value = BigInt(value);

  if (unsigned) {
    let maxValue = (n1 << BigInt(nbBits)) - n1;
    if (value > maxValue) value = maxValue;
    if (value < n0) value = n0;
    return littleEndian(value, nbBits);
  } // signed


  if (value >= n0) {
    let maxValue = (n1 << BigInt(nbBits - 1)) - n1;
    if (value > maxValue) value = maxValue;
    return littleEndian(value, nbBits);
  } // negative number


  const minValue = (n1 << BigInt(nbBits) - n1) * -n1;
  if (value < minValue) value = minValue;
  return littleEndian(value & (n1 << BigInt(nbBits)) - n1, nbBits);
}

function littleEndian(value, nbBits) {
  value = BigInt(value);
  if (nbBits < 9) return value; // bits 0 to 7 is the first byte

  let result = n0;

  for (let i = 0; i < nbBits; i += 8) {
    let slotSize = BigInt(nbBits - i);
    result <<= slotSize < n8 ? slotSize : n8;
    result |= value & n255;
    value >>= n8;
  }

  return result;
}

module.exports = serializeInt;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

class UAVCANTransfer {
  constructor() {
    let canId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Buffer.from([]);
    let payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Buffer.from([]);
    let crc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let transferId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
    let toggleState = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
    this.payload = payload;
    this.canId = canId;
    this.crc = crc;
    this.id = transferId; // transfer id

    this.toggle = toggleState;
    this.decodedTransfer = {};
    this.decodedCanId = {};
  }

}

module.exports = UAVCANTransfer;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1).Buffer))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  parse: __webpack_require__(4),
  serialize: __webpack_require__(20),
  kinds: __webpack_require__(0),
  UAVCANCodec: __webpack_require__(25),
  UAVCANTransfer: __webpack_require__(10)
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
} // Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications


revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens(b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  } // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42


  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
} // base64 is 4/3 + up to two characters of the original data


function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0; // if there are placeholders, only get up to the last complete 4 chars

  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;

  for (var i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 0xFF;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];

  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }

  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3
  // go through the array every three bytes, we'll deal with trailing stuff later

  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  } // pad the end with zeros, but make sure to not forget the extra bytes


  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
  }

  return parts.join('');
}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);

    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;

  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
/* global BigInt */

const _require = __webpack_require__(6),
      byteToFloat16 = _require.byteToFloat16;

const n8 = BigInt(8);
const n255 = BigInt(255); // can only parse float16 and float32 and float64

function parseFloat(original, nbBits) {
  if (![16, 32, 64].includes(nbBits)) {
    throw new Error('Float parsing only valid for number of bits 16, 32 or 64');
  } // we will create a buffer


  let bytes = [];

  for (let i = 0; i < nbBits / 8; i++) {
    bytes.unshift(Number(original & n255));
    original >>= n8;
  }

  let buffer = Buffer.from(bytes);

  switch (nbBits) {
    case 16:
      return byteToFloat16(bytes[1] << 8 | bytes[0]);

    case 32:
      return buffer.readFloatLE();

    case 64:
      return buffer.readDoubleLE();

    default:
      return undefined;
  }
}

module.exports = parseFloat;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1).Buffer))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const processVar = __webpack_require__(2);

function processArray(bigInt, variable, from) {
  let value = [];

  for (let i = 0; i < variable.length; i++) {
    let currentValue = processVar(bigInt, variable.kind, from);
    value.push(currentValue.value);
    from = currentValue.from;
    if (from <= 0) break;
  } // is it an array of uint8 ?


  let type = variable.kind;
  let valueStr;

  if (type.kind === 'int' && type.unsigned === true && type.bits === 8) {
    valueStr = getValueStr(value);
  }

  return {
    from,
    value,
    valueStr
  };
}

function getValueStr(value) {
  return String.fromCharCode.apply(String, value);
}

module.exports = processArray;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global BigInt */

const kinds = __webpack_require__(0);

const parseInt = __webpack_require__(7);

const processVar = __webpack_require__(2);

const n1 = BigInt(1);

function processUnion(bigValue, variable, from) {
  let unionDefinition = kinds[variable.kind];
  let nbBits = Math.ceil(Math.log2(unionDefinition.message.variables.length));
  let variableKind = parseInt(getCurrentValue(bigValue, nbBits, from), nbBits, true);
  let unionVariable = unionDefinition.message.variables[variableKind];
  from -= BigInt(nbBits);
  let result = processVar(bigValue, unionVariable, from);
  let tmpValue = {};
  tmpValue[unionVariable.name] = result.value;
  result.value = tmpValue;
  return result;
}

function getCurrentValue(bigValue, nbBits, from) {
  return bigValue >> from - BigInt(nbBits) & (n1 >> BigInt(nbBits)) - n1;
}

module.exports = processUnion;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const kinds = __webpack_require__(0);

const processVariable = __webpack_require__(5);

function processObject(bigValue, variable, from) {
  let value = {};
  let variables = kinds[variable.kind].message.variables;

  for (let variable of variables) {
    let currentResult = processVariable(bigValue, variable, from);

    if (variable.name) {
      value[variable.name] = currentResult.value;

      if (currentResult.valueStr) {
        value["".concat(variable.name, "Str")] = currentResult.valueStr;
      }
    }

    from = currentResult.from;
  }

  return {
    value,
    from
  };
}

module.exports = processObject;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global BigInt */

const processVariable = __webpack_require__(8);
/**
 *
 * @param {*} data Buffer
 * @param {*} kind
 */


function serialize(data, kind) {
  let isService = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let isRequest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  let transfer = {};

  if (!isService) {
    transfer = kind.message;
  } else if (isService) {
    if (isRequest) {
      transfer = kind.request;
    } else {
      transfer = kind.response;
    }
  } else {
    throw new Error('parse: Not a service or message');
  }

  let bigResult = {
    value: BigInt(0),
    nbBits: 0
  };

  for (let variable of transfer.variables) {
    processVariable(data, variable, bigResult);
  }

  return bigIntToByteArray(bigResult);
}

function bigIntToByteArray(bigResult) {
  let rounded = bigResult.nbBits + 8 - (bigResult.nbBits & 8 | 8);
  let result = [];

  for (let i = rounded - 8; i >= 0; i -= 8) {
    result.push(Number(bigResult.value >> BigInt(i) & BigInt(255)));
  }

  return result;
}

module.exports = serialize;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
/* global BigInt */

const _require = __webpack_require__(6),
      float16ToByte = _require.float16ToByte;

const n0 = BigInt(0); // can only parse float16 and float32 and float64

function serializeFloat(value, nbBits) {
  if (![16, 32, 64].includes(nbBits)) {
    throw new Error('Float parsing only valid for number of bits 16, 32 or 64');
  }

  switch (nbBits) {
    case 16:
      {
        let result = float16ToByte(value);
        return BigInt(result >> 8 | (result & 255) << 8);
      }

    case 32:
      {
        let buffer = new Buffer(4);
        buffer.writeFloatBE(value);
        let result = n0;

        for (let i = 0; i < 4; i++) {
          result += BigInt(buffer[i]) << BigInt(i * 8);
        }

        return result;
      }

    case 64:
      {
        let buffer = new Buffer(8);
        buffer.writeDoubleBE(value);
        let result = n0;

        for (let i = 0; i < 8; i++) {
          result += BigInt(buffer[i]) << BigInt(i * 8);
        }

        return result;
      }

    default:
      return undefined;
  }
}

module.exports = serializeFloat;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1).Buffer))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global BigInt */

const processVar = __webpack_require__(3);

function processArray(data, variable, bigResult) {
  // weither the variable name exists or we try to append 'Str'
  if (data["".concat(variable.name, "Str")]) {
    let encoder = new TextEncoder();
    data = encoder.encode(data["".concat(variable.name, "Str")]);
  } else {
    data = data[variable.name];
  }

  for (let i = 0; i < Math.min(variable.length, data.length); i++) {
    processVar(data[i], variable.kind, bigResult);
  }
}

module.exports = processArray;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global BigInt */

const kinds = __webpack_require__(0);

const processVar = __webpack_require__(3);

const n1 = BigInt(1);

function processUnion(data, variable, bigResult) {
  let unionDefinition = kinds[variable.kind];
  let variables = unionDefinition.message.variables;
  let nbBits = Math.ceil(Math.log2(variables.length)); // we are now in trouble because we need to find which type we should use

  let type = Object.keys(data).sort((a, b) => a.length - b.length)[0];
  let index;

  for (let i = 0; i < variables.length; i++) {
    if (variables[i].name === type) {
      index = i;
      break;
    }
  }

  if (index === undefined) {
    throw Error("Variable of unionDefinition not found: ".concat(JSON.stringify(data)));
  }

  processVar(index, {
    kind: 'int',
    bits: nbBits,
    unsigned: true
  }, bigResult);
  processVar(data[variables[index].name], variables[index], bigResult);
}

function getCurrentValue(bigValue, nbBits, from) {
  return bigValue >> from - BigInt(nbBits) & (n1 >> BigInt(nbBits)) - n1;
}

module.exports = processUnion;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const kinds = __webpack_require__(0);

const processVariable = __webpack_require__(8);

function processObject(data, variable, bigResult) {
  let variables = kinds[variable.kind].message.variables;

  for (let variable of variables) {
    processVariable(data, variable, bigResult);
  }
}

module.exports = processObject;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
/* global BigInt */

let EventEmitter = __webpack_require__(26);

let kinds = __webpack_require__(0);

let parse = __webpack_require__(4);

let serializeInt = __webpack_require__(9);

let UAVCANTransfer = __webpack_require__(10);

class UAVCANCodec extends EventEmitter {
  constructor() {
    super();
    this._UAVCANVersion = 0;
    this._decodeErrors = 0;
    this._transfers = {}; // keeps track of all current transfer, indexed by transfer id
  } // makes a 4 byte buffer according to UAVCAN spec


  makeCanId(priority, datatypeId, serviceNotMessage, requestNotResponse, destinationNodeId, sourceNodeId) {
    let canId = [0x0, 0x0, 0x0, 0x0];
    canId[0] = priority;
    canId[3] = Number(serviceNotMessage) << 7;
    canId[3] |= sourceNodeId & 0b01111111;

    if (serviceNotMessage) {
      canId[1] = datatypeId;

      if (requestNotResponse) {
        canId[2] = Number(requestNotResponse) << 7;
      }

      canId[2] |= destinationNodeId & 0b01111111;
    } else {
      canId[1] = datatypeId >> 8; // MSB

      canId[2] = datatypeId & Number(0x00ff);
    }

    return Buffer.from(canId);
  } // only distinguishes between service and message frames, ignores anonymous frames!
  // does not accept 11 bit CAN ids


  parseCanId(canId) {
    if (canId.length < 4) throw Error('Invalid CAN id');
    let id = {
      priority: Number(canId[0]),
      messageTypeId: Number("0x".concat(canId[1].toString(16)).concat(canId[2].toString(16))),
      // concatenate byte 2 and 1
      serviceNotMessage: Boolean(canId[3] >> 7),
      // shift away all bits exept the MSB
      sourceNodeId: Number(canId[3] & 2 ** 8 - 1 >> 1),
      // mask byte 0 with 7 ones
      destinationNodeId: Number(canId[2] & 2 ** 8 - 1 >> 1),
      // mask byte 1 with 7 ones
      requestNotResponse: Boolean(canId[2] >> 7),
      serviceTypeId: Number(canId[1])
    };

    if (id.serviceNotMessage) {
      delete id.messageTypeId;
    } else {
      delete id.serviceTypeId;
      delete id.requestNotResponse;
    }

    return id;
  }

  parseTail(canPayload) {
    canPayload = BigInt("0x".concat(canPayload.toString('hex')));
    let tail = {
      startOfTransfer: Boolean((canPayload & BigInt(128)) >> BigInt(7)),
      endOfTransfer: Boolean((canPayload & BigInt(64)) >> BigInt(6)),
      toggle: Boolean((canPayload & BigInt(32)) >> BigInt(5)),
      transferId: Number(canPayload & BigInt(2 ** 5 - 1))
    };
    return tail;
  }
  /**
   * Puts together a transfer from multiple fragments
   * @param {*} canPayload 8 bytes of raw CAN frame data
   * @param {*} canId 4 bytes of raw CAN ID data
   */


  assembleTransfer(canPayload, canId) {
    let tail = this.parseTail(canPayload); // decodes the content of the last (8th) byte in every fragment

    let decodedCanId = this.parseCanId(canId);
    let transferId = String("".concat(tail.transferId, " ").concat(decodedCanId.sourceNodeId, " ").concat(decodedCanId.destinationNodeId)); // end of multiframe transfer

    if (!tail.startOfTransfer && tail.endOfTransfer) {
      let transferLength = canPayload.length - 1;
      let transferPayload = Buffer.from(canPayload.toString('hex', 0, transferLength), 'hex');

      if (this._transfers[transferId] === undefined) {
        throw new Error('Bad data');
      }

      let priorPayload = this._transfers[transferId].payload;
      this._transfers[transferId].payload = Buffer.concat([priorPayload, transferPayload]);
      this._transfers[transferId].toggle = tail.toggle;
      this._transfers[transferId].decodedCanId = decodedCanId;
      return transferId; // beginning of multiframe transfer
    } else if (tail.startOfTransfer && !tail.endOfTransfer) {
      let transferPayload = Buffer.from(canPayload.toString('hex', 2, 7), 'hex');
      this._transfers[transferId] = new UAVCANTransfer(canId, transferPayload, [], transferId, tail.toggle); // mid multiframe transfer
    } else if (!tail.startOfTransfer && !tail.endOfTransfer) {
      let transferPayload = Buffer.from(canPayload.toString('hex', 0, 7), 'hex');

      if (this._transfers[transferId] === undefined) {
        throw new Error('Bad data');
      }

      let priorPayload = this._transfers[transferId].payload;
      this._transfers[transferId].payload = Buffer.concat([priorPayload, transferPayload]);
      this._transfers[transferId].toggle = tail.toggle; // single frame transfer
    } else if (tail.startOfTransfer && tail.endOfTransfer) {
      let transferPayload = Buffer.from(canPayload.toString('hex', 0, 7), 'hex');
      this._transfers[transferId] = new UAVCANTransfer(canId, transferPayload, [], transferId, tail.toggle);
      this._transfers[transferId].decodedCanId = decodedCanId;
      return transferId;
    }

    return -1;
  }
  /**
   * Fires an event with the decoded UAVCAN message.
   * @param {*} transfer UAVCANTransfer
   * @param {*} txCallback callback function to CAN transmitter (e.g. socketcan)
   */


  encode(datatypeId, variables, txCallback) {
    let requestNotResponse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    // takes a transfer payload and packs it into 8-byte large can frames
    // can frame contains CRC and tail byte that are added by this function
    // for each frame: txCallback(can_frame)

    /* let payloadToFragment = transfer.payload;
    let crcToPack = transfer.crc;
    let transferId = transfer.transferId;
    let canId = this.makeCanId(transfer.priority, datatypeId, serviceNotMessage, requestNotResponse, destinationNodeId, sourceNodeId);
    */
    let kindVars = kinds[datatypeId];

    if (kindVars.type === 'message') {
      kindVars = kindVars.message.variables;
    } else if (kindVars.type === 'service') {
      if (requestNotResponse) {
        kindVars = kindVars.request.variables;
      } else {
        kindVars = kindVars.response.variables;
      }
    }

    for (let i = 0; i < variables.length; i++) {
      console.log("toencode:".concat(variables[i]));
      console.log("bits:".concat(kindVars[i].bits));
      console.log("u".concat(kindVars[i].unsigned));
      console.log("res:".concat(serializeInt(variables[i], kindVars[i].bits, kindVars[i].unsigned).toString(2)));
    } // fill payload

    /*
    KIND_ID = 341; //id of "message" NodeStatus
    FILLED_KIND_JSON = {
      "uptimeSec": 17616,
      "health": 0,
      "mode": 0,
      "subMode": 0,
      "vendorSpecificStatusCode": 0
    };
    transfer.payload = _LUCS_JSON_TO_BUFFER(KIND_ID, FILLED_KIND_JSON);
     */
    // fill sequencing information, compute crc
    // ...
    // call transmitter and send fragments out

    /*
    while(fragment_queue_full){
      txCallback(transfer.payload);
    }
    */

  }
  /**
   * Fires an event with the decoded UAVCAN message.
   * @param {*} canId uint8
   * @param {*} extended boolean
   * @param {*} canPayload uint8[8]
   */


  decode(canId, canPayload) {
    let transferAssembledId = this.assembleTransfer(canPayload, canId);

    if (transferAssembledId !== -1) {
      try {
        let id = this._transfers[transferAssembledId].decodedCanId;
        let payload = this._transfers[transferAssembledId].payload;
        let kindToDecode; // set kind to associate to transfer based on contents of canId

        if (id.serviceNotMessage) {
          kindToDecode = kinds[id.serviceTypeId];
        } else {
          kindToDecode = kinds[id.messageTypeId];
        }

        let decodedTransfer = parse(this._transfers[transferAssembledId].payload, kindToDecode, id.serviceNotMessage, id.requestNotResponse);
        this._transfers[transferAssembledId].decodedTransfer = decodedTransfer;
        this.emit('rx', this._transfers[transferAssembledId]);
      } catch (error) {
        console.log(this._transfers[transferAssembledId]);
        console.log(error);
        this._decodeErrors++;
      }

      delete this._transfers[transferAssembledId];
    }
  }

}

module.exports = UAVCANCodec;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1).Buffer))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty,
    prefix = '~';
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */

function Events() {} //
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//


if (Object.create) {
  Events.prototype = Object.create(null); //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //

  if (!new Events().__proto__) prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */


function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */


function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once),
      evt = prefix ? prefix + event : event;
  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);else emitter._events[evt] = [emitter._events[evt], listener];
  return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */


function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */


function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */


EventEmitter.prototype.eventNames = function eventNames() {
  var names = [],
      events,
      name;
  if (this._eventsCount === 0) return names;

  for (name in events = this._events) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */


EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event,
      handlers = this._events[evt];
  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */


EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event,
      listeners = this._events[evt];
  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */


EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;
  if (!this._events[evt]) return false;
  var listeners = this._events[evt],
      len = arguments.length,
      args,
      i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1:
        return listeners.fn.call(listeners.context), true;

      case 2:
        return listeners.fn.call(listeners.context, a1), true;

      case 3:
        return listeners.fn.call(listeners.context, a1, a2), true;

      case 4:
        return listeners.fn.call(listeners.context, a1, a2, a3), true;

      case 5:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;

      case 6:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len - 1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length,
        j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1:
          listeners[i].fn.call(listeners[i].context);
          break;

        case 2:
          listeners[i].fn.call(listeners[i].context, a1);
          break;

        case 3:
          listeners[i].fn.call(listeners[i].context, a1, a2);
          break;

        case 4:
          listeners[i].fn.call(listeners[i].context, a1, a2, a3);
          break;

        default:
          if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
            args[j - 1] = arguments[j];
          }
          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;
  if (!this._events[evt]) return this;

  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
        events.push(listeners[i]);
      }
    } //
    // Reset the array, or remove it completely if we have no more listeners.
    //


    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else clearEvent(this, evt);
  }

  return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
}; //
// Alias methods names because people roll like that.
//


EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on; //
// Expose the prefix.
//

EventEmitter.prefixed = prefix; //
// Allow `EventEmitter` to be imported as module namespace.
//

EventEmitter.EventEmitter = EventEmitter; //
// Expose the module.
//

if (true) {
  module.exports = EventEmitter;
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=uavcan.js.map