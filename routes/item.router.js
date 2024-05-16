import express from 'express'
import Item_infor from '../schemas/item.schemas.js'

const router = express.Router();

router.get("/item", async(req,res,next) =>{ //아이템 전체 조회 개발 때문에 일단 넣음
    const items = await Item_infor.find().sort("-item_code").exec();//.select({item_stat : 0})

    return res.status(200).json(items);
})

router.post("/item", async(req,res,next) =>{ // 아이템 생성
    const {item_name, item_stat} = await req.body;

    const item_code_last = await Item_infor.findOne().sort("-item_code").exec();

    const item_code = item_code_last ? item_code_last.item_code+1 : 1;

    const item = new Item_infor({item_code,item_name, item_stat})
    await item.save();
    
    return res.status(201).json({item : item});
})

router.patch("/item/:item_code", async(req,res,next) =>{
    const {item_code} = Number(req.params);
    const {item_name, item_stat} = req.body;

    const current_item = await Item_infor.findOne(item_code).exec();

    current_item.item_name = item_name;
    current_item.item_stat = item_stat;

    await current_item.save();

    return res.status(200).json({Message : current_item})
})

router.get("/item/:item_code", async(req,res,next) =>{
    const {item_code} = Number(req.params);

    const item = await Item_infor.findOne(item_code).exec();

    return res.status(200).json({item});
})

export default router;
