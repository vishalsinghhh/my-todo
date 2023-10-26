const db = require("../Models");
const List = db.lists;
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createList = async(req, res)=>{
    const {name} = req.body
    const userId= req.user.userId
    if(!name || !userId){
        throw new CustomError.BadRequestError("please provide all values");
    }
    const list = await List.create({ userId, name });

    res.status(StatusCodes.CREATED).json({list})
}

const getAllLists = async(req, res)=>{
    const userId= req.user.userId
    const lists = await List.findAll({
        where: { userId }
    });
    res.status(StatusCodes.OK).json({lists})
}

module.exports = {
    createList,
    getAllLists
}