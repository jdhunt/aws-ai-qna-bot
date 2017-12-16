var handler=require('./handler').handler

    
handler({
    _meta:{
        schema:{
            type:"object",
            properties:{
                q:{type:"string"}
            }
        }
    },
    q:{type:"string"},
    test:{type:"string"},
    antoher:{type:"string"}
},{done:console.log},console.log)
