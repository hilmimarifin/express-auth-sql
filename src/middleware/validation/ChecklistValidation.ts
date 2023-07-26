import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import Helpers from "../../helpers/Helper";


const CreateChecklistValidation = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name } = req.body;
		const data = {
			name
		};

		const rules: Validator.Rules = {
			"name": "required|string|max:50",
		};

		const validate = new Validator(data, rules);

		if (validate.fails()) {
			return res.status(400).send(Helpers.ResponseData(400, "Bad Request", validate.errors, null));
		}

		next();
	} catch (error: any) {
		return res.status(500).send(Helpers.ResponseData(500, "", error, null));
	}
};

export default { CreateChecklistValidation }