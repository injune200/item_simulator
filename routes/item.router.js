import express from 'express'
import Item_infor from '../schemas/item.schemas.js'

const router = express.Router();

router.get("/item", async(req,res,next) =>{ //아이템 아이디와 이름 전체 조회 
    const items = await Item_infor.find({},{_id : 0, item_name : 1, item_code : 1}).sort("item_code").exec();

    return res.status(200).json(items);
})

router.get("/item/:item_code", async(req,res,next) => { // 특정 아이템 상세 조회
    const {item_code} = Number(req.params);

    const item = await Item_infor.findOne(item_code).select({_id : 0, item_code : 1, item_name : 1, 'item_stat.health' : 1, 'item_stat.power' : 1}).sort("item_code").exec();

    return res.status(200).json(item);
})

router.post("/item", async(req,res,next) =>{ // 아이템 생성
    const {item_name, item_stat} = await req.body;

    const item_code_last = await Item_infor.findOne().sort("-item_code").exec();

    const item_code = item_code_last ? item_code_last.item_code+1 : 1;

    const item = new Item_infor({item_code,item_name, item_stat})
    await item.save();
    
    return res.status(201).json();
})

router.patch("/item/:item_code", async(req,res,next) =>{ // 아이템 수정
    const {item_code} = Number(req.params);
    const {item_name, item_stat} = req.body;

    const current_item = await Item_infor.findOne(item_code).exec();

    current_item.item_name = item_name;
    current_item.item_stat = item_stat;

    await current_item.save();

    return res.status(200).json()
})

export default router;
