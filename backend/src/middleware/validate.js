export default function validate(schema, source = "body") {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[source] || {});
      req[source] = parsed;
      next();
    } catch (err) {
      const issues = err?.issues?.map(i => ({
        path: i.path?.join("."),
        message: i.message,
      })) || [];
      
    
      if (issues.length === 0) {
        return next();
      }

      return res.status(400).json({ error: "Validation error", issues });
    }
  };
}
