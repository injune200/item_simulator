import mongoose from 'mongoose';

const Character_Schema = new mongoose.Schema({
    character_id : {
        type : Number,
        unique : true
    },
    name : {
        type : String,
        required : true,
        unique : true
    },
    health : {
        type : Number,
    },
    power : {
        type : Number,
    }
})

export default mongoose.model('Character_infor',Character_Schema)//이 파일을 호출할때 Character_Schema를 Character_infor라는 데이터 베이스 이름으로 저장되는 스키마로 호출이된다.
//default를 사용함으로 호출할때 변수명을 바꿀수가 있다.