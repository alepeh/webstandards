function convertDreamfactoryToAlpacaSchema(dfSchema){
    console.dir(dfSchema);
    let schema = {
    };
    schema.type = "object";
    schema.properties = {};

    dfSchema.field.forEach(element => {
        schema.properties[element.name] = {
            "type" : "string",
            "title" : element.name
        }
    });
    console.dir(schema);
    return schema;
}

function convertDreamFactoryDataToAlpacaData(dfData){
    return dfData;
}

export{convertDreamfactoryToAlpacaSchema, convertDreamFactoryDataToAlpacaData};