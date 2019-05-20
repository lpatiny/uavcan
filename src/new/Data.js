const {getDataTypes}=require('../DataTypesM>anager');

/**
 * 
 */

class Data {
    constructor(bytes, dataTypeFullID, isService, isRequest) {
        this.bytes=bytes;
        this.dataTypeFullID=dataTypeFullID;
        this.dataType=dataTypes[dataTypeFullID];
        this.isService=isService;
        this.isRequest=isRequest;
    }

    getObject() {

    }

getCRCData() {

}

    toString() {

    }
    
}

Data.prototype.fromObject(object, dataType) {

    return new Data();
}

Data.prototype.fromCRCData(bytes, dataType) {

    throw Error('Wrong CRC')
    return new Data(bytes, dataType);
}
