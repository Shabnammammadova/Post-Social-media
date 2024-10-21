import { checkSchema, validationResult, matchedData } from "express-validator";

function validateSchema(schema) {
  return async (req, res, next) => {
    await checkSchema(schema).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errorMessage: "Validation failed",
        errors: errors.array(),
      });
    }
    req.matchedData = matchedData(req);
    next();
  };
}

export default validateSchema;
