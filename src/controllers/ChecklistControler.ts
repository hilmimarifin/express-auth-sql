import { Request, Response } from "express";
import Helper from "../helpers/Helper";
import Checklist from "../db/models/Checklist";


const CreateChecklist = async(req:Request, res:Response):Promise<Response> => {
	try {
		const { name } = req.body;

		const checklist = await Checklist.create({
			name,	
		});

		return res.status(201).send(Helper.ResponseData(201, "Created", null, checklist));
	} catch (error:any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
};

const GetAllChecklist = async(req:Request, res:Response):Promise<Response> => {
	try {
		const checklist = await Checklist.findAll();

		return res.status(200).send(Helper.ResponseData(200, "Ok", null, checklist));
	} catch (error:any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
};

const DeleteChecklist = async(req:Request, res:Response):Promise<Response> => {
	try {
		const { id } = req.params;

		const checklist = await Checklist.findOne({
			where: {
				id: id,
			}
		});

		if (!checklist) {
			return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
		}

		await checklist.destroy();
		return res.status(200).send(Helper.ResponseData(200, "Removed", null, null));
	} catch (error:any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
};

export default {
	CreateChecklist,
    GetAllChecklist,
    DeleteChecklist
};
