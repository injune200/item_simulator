import mongoose from "mongoose";

const item_stat = new mongoose.Schema({
  //item stat 서브 스키마
  health: {
    type: Number,
    default: 0,
  },
  power: {
    type: Number,
    default: 0,
  },
});

const Item_Schema = new mongoose.Schema({
  //item 스키마
  item_code: {
    type: Number,
    unique: true,
  },
  item_name: {
    type: String,
    required: true,
    unique: true,
  },
  item_stat: {
    type: item_stat,
    required: true,
  },
});

export default mongoose.model("Item_infor", Item_Schema);
