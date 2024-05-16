import express from "express";
import connect from "./schemas/index.js";
import characterRouter from "./routes/character.router.js";
import itemRouter from "./routes/item.router.js";
import characterItemRouter from "./routes/character.item.router.js";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.js";

const app = express(); // exoress 변수
const port = 3000; // 포트번호 변수

connect();

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", [characterRouter, itemRouter, characterItemRouter]); //경로 설정

app.use((req, res, next) => {
  // 기본경로 말고 다른곳 진입했을경우 실행
  res.status(404).send("존재하지 않는 경로 입니다.");
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  // 서버 실행
  console.log(port, "포트로 서버가 열렸습니다.");
});
