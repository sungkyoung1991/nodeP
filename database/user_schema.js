var crypto = require('crypto');


var Schema = {};

Schema.createSchema = function(mongoose){

    console.log('createSchema 호출됨..');

    var UserSchema = mongoose.Schema({
                
        // id:{type:String, required:true, unique:true, 'default':''},            
        email:{type:String, 'default':''},            
        name:{type:String, index:'hashed', 'defalut':''},
        hashed_password:{type:String, required:true, 'default':''},
        salt:{type:String, required:true},
        // age:{type:Number, 'default':-1},
        created_at:{type:Date, index:{unique:false}, 'default':Date.now()},
        updated_at:{type:Date, index:{unique:false}, 'defalut':Date.now()}
    });

    console.log('UserSchema 정의함....');

    UserSchema.path('email').validate(function(email){
        return email.length;
    }, 'email 컬럼의 값이 없습니다..');

    UserSchema.static('findByEmail', function(email,callback){
        return this.find({email:email},callback);
    });

    UserSchema.static('findAll', function(callback){
        return this.find({}, callback);
    });

    UserSchema
        .virtual('password')
        .set(function(password){
            // this._password= password
            this.salt = this.makeSalt();
            this.hashed_password = this.encryptPassword(password);
            console.log('virtual password 저장됨  : ' +  this.hashed_password);
        });
        

        UserSchema.method('encryptPassword', function(plainText, insalt){
            if(insalt){
                return crypto.createHmac('sha1', insalt).update(plainText).digest('hex');
            }else{
                return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
            }
        });

        UserSchema.method('makeSalt',function(){
            return Math.round((new Date().valueOf() * Math.random())) + '';
        });

        UserSchema.method('authenticate', function(plainText, insalt, hashed_password){
            if(insalt){
                console.log('authenticate 호출됨.');
                return this.encryptPassword(plainText,insalt) === hashed_password;
            }else{
                console.log('authenticate 호출됨.');
                return this.encryptPassword(plainText) === hashed_password;

            }
        });

        return UserSchema;

}

module.exports = Schema;