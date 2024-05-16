import express from "express";
import Character_infor from "../schemas/character.schemas.js";
import Item_infor from "../schemas/item.schemas.js";

const router = express.Router();
// 현재 아이템 장착 목록
router.get("/character/:character_id/equip_item", async (req, res, next) => {
  try {
    const character_id = req.params;
    const character_item = await Character_infor.findOne(character_id)
      .select({
        _id: 0,
        "equip_item.item_code": 1,
        "equip_item.item_name": 1,
      })
      .exec();

    if (character_item.equip_item.length == 0) {
      return res
        .status(404)
        .json({ Message: "현재 장착중인 아이템이 없습니다." });
    } else {
      return res.status(200).json(character_item);
    }
  } catch (error) {
    next(error);
  }
});
//아이템 장착
router.patch(
  "/character/:character_id/equip_item/:item_code",
  async (req, res, next) => {
    try {
      const { character_id, item_code } = req.params;

      const character = await Character_infor.findOne({
        character_id: character_id,
      }).exec();
      const item = await Item_infor.findOne({ item_code: item_code }).exec();

      if (
        character.equip_item.some((element) => element.item_code == item_code)
      ) {
        //아이템 중복 검사
        res.status(200).json({ Message: "이미 장착중인 아이템 입니다." });
      } else {
        character.equip_item.push(item);

        character.health += item.item_stat.health;
        character.power += item.item_stat.power;

        await character.save();

        return res.status(200).json({ Message: "아이템 장착 완료" });
      }
    } catch (error) {
      next(error);
    }
  },
);
//아이템 탈착
router.patch(
  "/character/:character_id/unequip_item/:item_code",
  async (req, res, next) => {
    try {
      const { character_id, item_code } = req.params;

      const character = await Character_infor.findOne({
        character_id: character_id,
      }).exec();
      const item = await Item_infor.findOne({ item_code: item_code }).exec();

      if (
        character.equip_item.some((element) => element.item_code == item_code)
      ) {
        //아이템 중복 검사
        const item_index = character.equip_item.findIndex(
          (index) => index.item_code == item_code,
        );

        character.equip_item.splice(item_index, 1);

        character.health -= item.item_stat.health;
        character.power -= item.item_stat.power;

        await character.save();

        return res.status(200).json({ Message: "아이템 해제 완료" });
      } else {
        res.status(200).json({ Message: "해당 아이템은 착용중이지 않습니다." });
      }
    } catch (error) {
      next(error);
    }
  },
);

export default router;
