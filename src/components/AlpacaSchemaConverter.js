function convertDreamfactoryToAlpacaSchema(dfSchema){
    console.dir(dfSchema);
    let schema = {
    };
    schema.type = "object";
    schema.properties = {};

    dfSchema.field.forEach(element => {
        let name = element.name;
        switch (element.type) {
            case 'boolean' : 
                schema.properties[name] = toYesNo(element);
                break;
            default : 
            schema.properties[name] = {
                "type" : "string",
                "title" : element.name,
                "required" : element.required
            }
        }
    });
    console.dir(schema);
    return schema;
}

function toYesNo(element){
    return {
        "title" : element.name,
        "enum" : [true, false],
        "required" : element.required
    };
}

function convertDreamFactoryDataToAlpacaData(dfData){
    return dfData;
}

export{convertDreamfactoryToAlpacaSchema, convertDreamFactoryDataToAlpacaData};