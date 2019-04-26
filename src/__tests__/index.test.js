'use strict';

const { bufferToJSON, kinds } = require('..');

describe('uavtest', () => {
  it('NodeStatus', () => {
    /* real data
    raw: [ 141, 46, 0, 0, 0, 0, 0, 219 ]
    { uptimeSec: 11917,
      health: 0,
      mode: 0,
      sub_mode: 0,
      vendorSpecificStatusCode: 0 }
    */

    let kindNodeStatus = kinds[341];
    let data = [141, 46, 0, 0, 0, 0, 0, 219];

    let result = bufferToJSON(data, kindNodeStatus);
    expect(result).toStrictEqual({
      uptimeSec: 11917,
      health: 0,
      mode: 0,
      subMode: 0,
      vendorSpecificStatusCode: 0
    });
  });

  it('requestParam', () => {
    let kindGetSet = kinds[11];

    let data = [0, 0];
    let result = bufferToJSON(data, kindGetSet, true, true);
    expect(result).toMatchSnapshot();
  });

  it('responseParam', () => {
    /* real GetSet log:

getset request completed ------------------------------
sent to ws: {"id":504098815,"dlc":8,"timestamp":1555866393634,"data":[0,0,198],"is_ext_id":true,"is_remote":false}

1. raw: [ 6, 148, 1, 10, 0, 0, 0, 134 ]
decodedid { src_id: 111,
  dst_id: 127,
  service_flag: 1,
  message_type_id: -1,
  priority: 30,
  request_flag: 0,
  service_type_id: 11 }
decodedp { transfer_payload: [ 6, 148, 1, 10, 0, 0, 0 ],
  start_of_transfer: 1,
  end_of_transfer: 0,
  toggle: 0,
  transfer_id: 6 }

2. raw: [ 0, 0, 0, 0, 1, 0, 0, 38 ]
decodedid { src_id: 111,
  dst_id: 127,
  service_flag: 1,
  message_type_id: -1,
  priority: 30,
  request_flag: 0,
  service_type_id: 11 }
decodedp { transfer_payload: [ 0, 0, 0, 0, 1, 0, 0 ],
  start_of_transfer: 0,
  end_of_transfer: 0,
  toggle: 1,
  transfer_id: 6 }

3. raw: [ 0, 0, 0, 0, 0, 0, 1, 6 ]
decodedid { src_id: 111,
  dst_id: 127,
  service_flag: 1,
  message_type_id: -1,
  priority: 30,
  request_flag: 0,
  service_type_id: 11 }
decodedp { transfer_payload: [ 0, 0, 0, 0, 0, 0, 1 ],
  start_of_transfer: 0,
  end_of_transfer: 0,
  toggle: 0,
  transfer_id: 6 }

4. raw: [ 255, 3, 0, 0, 0, 0, 0, 38 ]
decodedid { src_id: 111,
  dst_id: 127,
  service_flag: 1,
  message_type_id: -1,
  priority: 30,
  request_flag: 0,
  service_type_id: 11 }
decodedp { transfer_payload: [ 255, 3, 0, 0, 0, 0, 0 ],
  start_of_transfer: 0,
  end_of_transfer: 0,
  toggle: 1,
  transfer_id: 6 }

5. raw: [ 0, 1, 0, 0, 0, 0, 0, 6 ]
decodedid { src_id: 111,
  dst_id: 127,
  service_flag: 1,
  message_type_id: -1,
  priority: 30,
  request_flag: 0,
  service_type_id: 11 }
decodedp { transfer_payload: [ 0, 1, 0, 0, 0, 0, 0 ],
  start_of_transfer: 0,
  end_of_transfer: 0,
  toggle: 0,
  transfer_id: 6 }

6. raw: [ 0, 0, 0, 100, 114, 105, 118, 38 ]
decodedid { src_id: 111,
  dst_id: 127,
  service_flag: 1,
  message_type_id: -1,
  priority: 30,
  request_flag: 0,
  service_type_id: 11 }
decodedp { transfer_payload: [ 0, 0, 0, 100, 114, 105, 118 ],
  start_of_transfer: 0,
  end_of_transfer: 0,
  toggle: 1,
  transfer_id: 6 }

7. raw: [ 101, 114, 115, 70 ]
decodedid { src_id: 111,
  dst_id: 127,
  service_flag: 1,
  message_type_id: -1,
  priority: 30,
  request_flag: 0,
  service_type_id: 11 }
decodedp { transfer_payload: [ 101, 114, 115 ],
  start_of_transfer: 0,
  end_of_transfer: 1,
  toggle: 0,
  transfer_id: 6 }


*/

    let kindGetSet = kinds[11];

    let data = [
      1,
      10,
      0,
      0,
      0, // frame 1 (5 bytes due to crc and tail)
      0,
      0,
      0,
      0,
      1,
      0,
      0, // frame 2
      0,
      0,
      0,
      0,
      0,
      0,
      1, // frame 3
      255,
      3,
      0,
      0,
      0,
      0,
      0, // frame 4
      0,
      1,
      0,
      0,
      0,
      0,
      0, // frame 5
      0,
      0,
      0,
      100,
      114,
      105,
      118, // frame 6
      101,
      114,
      115 // frame 7
    ];
    let result = bufferToJSON(data, kindGetSet, true, false);
    console.log(result);
    console.log(String.fromCharCode(97 + result.name[3]));

    expect(result).toMatchSnapshot();
  });

  it('gps', () => {
    let kindGeo = kinds[1041];
    let data = [12, 14, 15];

    let result = bufferToJSON(data, kindGeo);
    expect(result).toMatchSnapshot();
  });
});
