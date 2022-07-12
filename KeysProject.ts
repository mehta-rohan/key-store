// Store ​a ​set ​of ​attributes ​(value) ​against ​a ​particular ​key ​(k)
// ● Fetch ​the ​value ​stored ​against ​a ​particular ​key ​(k)
// ● Delete ​a ​key ​(k)
// ● Stretch ​- ​Perform ​a ​secondary ​index ​scan ​to ​fetch ​all ​key ​along ​with ​their
// attributes ​where ​one ​of ​the ​attribute ​values ​is ​v.


// type store
export class KeyDataType{
    dataTypeMap:Object;
    constructor(){
        this.dataTypeMap = {}
    }
}

//strict type
export type LooseObject =  {
    [key: string]: Object
}

// data store
export class GlobalStore {
    keyMap:LooseObject
    constructor(){
        this.keyMap = {}
    }
   
    //testing purpose
    getALLKeys():Object{
        return this.keyMap
    }
}

export class KeyOperations {
    globalStore:GlobalStore;
    dataTypeMap:KeyDataType;

    constructor(){
        this.globalStore = new GlobalStore()
        this.dataTypeMap = new KeyDataType()
    }

    //validate data type check
    validateDataTypes(value:Object):Boolean{
        if(typeof value === 'object'){
            for (const key in value) {
                
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    const element = value[key];
                    if(!this.dataTypeMap[key]){
                        // store first occurence of new datatype in map
                        this.dataTypeMap[key]= typeof element;
                    }else if(this.dataTypeMap[key] != typeof element){
                        // return false if not matched with the already exiting one
                         return false;
                    }
                }
            }
        }
        return true;
    }
        
    addKeyValue(key:String,value:Object):Boolean{

        // valid data type check
        if(this.validateDataTypes(value)){
            this.globalStore.keyMap[key as string] = value;
            return true;
        }
        return false;
        
    }

    getKey(key:String):Object{
        return this.globalStore.keyMap[key as string]
    }

    deletekey(key:String):void{
        delete this.globalStore.keyMap[key as string]
    }

    stretch(stretchKey:string,value:unknown):Array<Object>{
        let allKeys:Array<Object> = [];
        // outer keys
        for (const key in this.globalStore.keyMap) {
            if (Object.prototype.hasOwnProperty.call(this.globalStore.keyMap, key)) {
                const element = this.globalStore.keyMap[key];
                //Loop on Inner keys
                for (const inner in element) {
                    if (Object.prototype.hasOwnProperty.call(element, inner)) {
                        // store keys if the value matched
                        if(inner == stretchKey && value == element[inner]){
                            allKeys.push(key)
                        }
                    }
                }
            }
        }
        return allKeys;
    }
}


// ====
let keyOps  = new KeyOperations()

keyOps.addKeyValue('Rohan',{'Heigth':'5-6','City':'GGN'},'live':false)
// console.log(keyOps.addKeyValue('Amit',{'Heigth':'5-6','City':10}))
// console.log(keyOps.globalStore.getALLKeys())
keyOps.addKeyValue('delhi',{'pollution_level' :'Very high', 'population' :10000000})
keyOps.addKeyValue('bangalore',{'Latitude':12.98,'free_food':true,
                    'Longitude':77.90,'pollution_level':'high'})
keyOps.addKeyValue('india',{'capital':'delhi','population':1200000000})
keyOps.addKeyValue('crocin',{'category':'Cold n Flu','manufacturer':'GSK'})
keyOps.addKeyValue('crocin1',{'category':'Strong Cold n Flu','manufacturer':'GSK'})


// o (M * N)

console.log(keyOps.globalStore.getALLKeys())


// console.log(keyOps.getKey('india'));
// console.log(keyOps.getKey('delhi'));
// console.log(keyOps.getKey('crocin'));
// console.log(keyOps.globalStore)

// keyOps.deletekey('india')
// console.log(keyOps.getKey('india'))


// console.log(keyOps.stretch('Heigth','5-'));
// console.log(keyOps.stretch('Heigth','5-'));
// console.log(keyOps.stretch('Heigth','5-'));

console.log(keyOps.stretch('manufacturer','GSK'));




// value1 : [key:value1,key ]


let map = {
    "manufacturer":{
        "GSK":["crocin","c1"],
        "GSK1":[]
    }
}


// crocin1.manufacturer == 'GSK'