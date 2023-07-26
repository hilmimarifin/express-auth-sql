import { Request, Response } from "express";
import Helper from "../helpers/Helper";
import Checklist from "../db/models/Checklist";
import ChecklistItem from "../db/models/ChecklistItem";

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

const GetChecklistItemsbyChecklistId = async(req:Request, res:Response):Promise<Response> => {
	try {
        const { checklistId } = req.params;

		const checklist = await ChecklistItem.findAll({where: { checklistId: checklistId}});

		return res.status(200).send(Helper.ResponseData(200, "Ok", null, checklist));
	} catch (error:any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
};

const CreateChecklistItem = async(req:Request, res:Response):Promise<Response> => {
	try {
        const { checklistId } = req.params
		const { itemName } = req.body;

		const checklist = await ChecklistItem.create({
			itemName,
            checklistId: Number(checklistId)
		});

		return res.status(201).send(Helper.ResponseData(201, "Created", null, checklist));
	} catch (error:any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
};

const GetDetailChecklistItemsbyChecklistId = async(req:Request, res:Response):Promise<Response> => {
	try {
        const { checklistId, checklistItemId } = req.params;

		const checklist = await ChecklistItem.findAll({where: { checklistId: checklistId, id: checklistItemId}});

		return res.status(200).send(Helper.ResponseData(200, "Ok", null, checklist));
	} catch (error:any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
};

const DeleteChecklistItem = async(req:Request, res:Response):Promise<Response> => {
	try {
		const { checklistItemId, checklistId } = req.params;


		const checklist = await ChecklistItem.findOne({
			where: {
				id: checklistItemId,
                checklistId: checklistId,
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

const UpdateChecklistItem = async(req:Request, res:Response):Promise<Response> => {
	try {
		const { checklistItemId, checklistId } = req.params;
        const { itemName } = req.body;


		const checklist = await ChecklistItem.findOne({
			where: {
				id: checklistItemId,
                checklistId: checklistId,
			}
		});

		if (!checklist) {
			return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
		}

		checklist.itemName = itemName;

		await checklist.save();
		return res.status(200).send(Helper.ResponseData(200, "Edited", null, checklist));
	} catch (error:any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
};




export default {
	CreateChecklist,
    GetAllChecklist,
    DeleteChecklist,
    GetChecklistItemsbyChecklistId,
    CreateChecklistItem,
    GetDetailChecklistItemsbyChecklistId,
    DeleteChecklistItem,
    UpdateChecklistItem,
};
