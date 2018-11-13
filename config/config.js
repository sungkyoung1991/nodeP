module.exports={
    server_port:3000,
    db_url:'mongodb://gcoopit.iptime.org/local',
    db_schemas : [
        {file:'./user_schema', collection:'users5', schemaName:'UserSchema', modelName:'UserModel'},
         {file:'./post_schema', collection:'post', schemaName:'PostSchema', modelName:'PostModel'}
        
    ],

    route_info:[
        {file:'./user', path:'/process/login', method:'login', type:'post'},
        {file:'./user', path:'/process/adduser', method:'adduser', type:'post'},
        {file:'./user', path:'/process/listuser', method:'listuser', type:'post'},
        {file:'./test', path:'/process/test1', method:'test1', type:'get'},
        {file:'./post', path:'/process/addpost', method:'addpost', type:'post'},
        {file:'./post', path:'/process/showpost/:id', method:'showpost', type:'get'},
        {file:'./post', path:'/process/listpost', method:'listpost', type:'post'},
        {file:'./post', path:'/process/listpost', method:'listpost', type:'get'}
    ]
}