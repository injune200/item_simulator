import express from "express";
import Character_infor from "../schemas/character.schemas.js";

const router = express.Router();

router.get("/character", async (req, res, next) => {
  try {
    //캐릭터 전체 조회 개발 때문에 일단 넣음
    const characters = await Character_infor.find()
      //.select({ _id: 0, character_id: 1, name: 1, health: 1, power: 1 })
      .sort("-character_id")
      .exec();

    return res.status(200).json(characters);
  } catch (error) {
    next(error);
  }
});

router.get("/character/:character_id", async (req, res, next) => {
  try {
    //캐릭터 id 단일 조회
    const character_id = req.params;

    const character = await Character_infor.findOne(character_id)
      .select({ _id: 0, name: 1, health: 1, power: 1 })
      .exec();

    if (!character) {
      res.status(404).json({ errorMessage: "존재하지 않는 캐릭터 입니다." });
    }

    return res.status(200).json(character);
  } catch (error) {
    next(error);
  }
});

router.post("/character", async (req, res, next) => {
  try {
    //캐릭터 생성
    const { name } = await req.body;
    const { health } = { health: 500 };
    const { power } = { power: 100 };

    const character_id_last = await Character_infor.findOne()
      .sort("-character_id")
      .exec();

    const character_id = character_id_last
      ? character_id_last.character_id + 1
      : 1;

    const character = new Character_infor({
      character_id,
      name,
      health,
      power,
    });
    await character.save();

    return res.status(201).json({ Message: "캐릭터 생성이 완료 되었습니다." });
  } catch (error) {
    next(error);
  }
});

router.delete("/character/:character_id", async (req, res, next) => {
  try {
    //캐릭터 삭제
    const { character_id } = req.params;

    const character = await Character_infor.find({
      character_id: character_id,
    }).exec();

    if (!character) {
      return req
        .status(404)
        .json({ errorMessage: "존재하지 않는 캐릭터 아이디 입니다." });
    }

    await Character_infor.deleteOne({ _id: character[0]._id });

    return res.status(200).json({ Message: "삭제가 완료 되었습니다." });
  } catch (error) {
    next(error);
  }
});

export default router;
