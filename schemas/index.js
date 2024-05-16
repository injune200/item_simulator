import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = () =>{
    mongoose.connect(
        'mongodb+srv://'+process.env.id+':'+process.env.password+'@express-mongo.9idjnhc.mongodb.net/?retryWrites=true&w=majority&appName=express-mongo',
        {
            dbName : 'game'
        }
    )
    .then(() => console.log('MongoDB에 연결을 성공하였습니다.'))
    .catch((err) => console.log(`MongoDB에 연결을 실패하였습니다. ${err}`));
};

mongoose.connection.on('error', (err) =>{
    console.error('MongoDB 연결 에러', err)
});//error 이벤트가 발생할 때마다 콜백함수가 호출됨을 의미한다.

export default connect;