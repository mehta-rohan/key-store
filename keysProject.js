"use strict";
// Store ​a ​set ​of ​attributes ​(value) ​against ​a ​particular ​key ​(k)
// ● Fetch ​the ​value ​stored ​against ​a ​particular ​key ​(k)
// ● Delete ​a ​key ​(k)
// ● Stretch ​- ​Perform ​a ​secondary ​index ​scan ​to ​fetch ​all ​key ​along ​with ​their
// attributes ​where ​one ​of ​the ​attribute ​values ​is ​v.
exports.__esModule = true;
exports.KeyOperations = exports.GlobalStore = exports.KeyDataType = void 0;
// type store
var KeyDataType = /** @class */ (function () {
    function KeyDataType() {
        this.dataTypeMap = {};
    }
    return KeyDataType;
}());
exports.KeyDataType = KeyDataType;
// data store
var GlobalStore = /** @class */ (function () {
    function GlobalStore() {
        this.keyMap = {};
    }
    //testing purpose
    GlobalStore.prototype.getALLKeys = function () {
        return this.keyMap;
    };
    return GlobalStore;
}());
exports.GlobalStore = GlobalStore;
var KeyOperations = /** @class */ (function () {
    function KeyOperations() {
        this.globalStore = new GlobalStore();
        this.dataTypeMap = new KeyDataType();
    }
    //validate data type check
    KeyOperations.prototype.validateDataTypes = function (value) {
        if (typeof value === 'object') {
            for (var key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    var element = value[key];
                    if (!this.dataTypeMap[key]) {
                        // store first occurence of new datatype in map
                        this.dataTypeMap[key] = typeof element;
                    }
                    else if (this.dataTypeMap[key] != typeof element) {
                        // return false if not matched with the already exiting one
                        return false;
                    }
                }
            }
        }
        return true;
    };
    KeyOperations.prototype.addKeyValue = function (key, value) {
        // valid data type check
        if (this.validateDataTypes(value)) {
            this.globalStore.keyMap[key] = value;
            return true;
        }
        return false;
    };
    KeyOperations.prototype.getKey = function (key) {
        return this.globalStore.keyMap[key];
    };
    KeyOperations.prototype.deletekey = function (key) {
        delete this.globalStore.keyMap[key];
    };
    KeyOperations.prototype.stretch = function (stretchKey, value) {
        var allKeys = [];
        // outer keys
        for (var key in this.globalStore.keyMap) {
            if (Object.prototype.hasOwnProperty.call(this.globalStore.keyMap, key)) {
                var element = this.globalStore.keyMap[key];
                //Loop on Inner keys
                for (var inner in element) {
                    if (Object.prototype.hasOwnProperty.call(element, inner)) {
                        // store keys if the value matched
                        if (inner == stretchKey && value == element[inner]) {
                            allKeys.push(key);
                        }
                    }
                }
            }
        }
        return allKeys;
    };
    return KeyOperations;
}());
exports.KeyOperations = KeyOperations;
// ====
var keyOps = new KeyOperations();
keyOps.addKeyValue('Rohan', { 'Heigth': '5-6', 'City': 'GGN' });
// console.log(keyOps.addKeyValue('Amit',{'Heigth':'5-6','City':10}))
// console.log(keyOps.globalStore.getALLKeys())
keyOps.addKeyValue('delhi', { 'pollution_level': 'Very high', 'population': 10000000 });
keyOps.addKeyValue('bangalore', { 'Latitude': 12.98, 'free_food': true,
    'Longitude': 77.90, 'pollution_level': 'high' });
keyOps.addKeyValue('india', { 'capital': 'delhi', 'population': 1200000000 });
keyOps.addKeyValue('crocin', { 'category': 'Cold n Flu', 'manufacturer': 'GSK' });
keyOps.addKeyValue('crocin1', { 'category': 'Strong Cold n Flu', 'manufacturer': 'GSK' });
// o (M * N)
console.log(keyOps.globalStore.getALLKeys());
// console.log(keyOps.getKey('india'));
// console.log(keyOps.getKey('delhi'));
// console.log(keyOps.getKey('crocin'));
// console.log(keyOps.globalStore)
// keyOps.deletekey('india')
// console.log(keyOps.getKey('india'))
// console.log(keyOps.stretch('Heigth','5-'));
// console.log(keyOps.stretch('Heigth','5-'));
// console.log(keyOps.stretch('Heigth','5-'));
console.log(keyOps.stretch('manufacturer', 'GSK'));
