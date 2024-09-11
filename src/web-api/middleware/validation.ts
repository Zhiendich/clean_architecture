import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Convert the plain request body to an instance of the DTO class
    const dtoObject = plainToInstance(dtoClass, req.body);

    // Validate the DTO object
    const errors: ValidationError[] = await validate(dtoObject);

    // If there are validation errors, return a 400 response with the errors
    if (errors.length > 0) {
      const errorMessages = errors.map((error) =>
        Object.values(error.constraints ?? {}).join(", ")
      );
      return res.status(400).json({
        message: "Validation failed",
        errors: errorMessages,
      });
    }
    next();
  };
}

export default validationMiddleware;
