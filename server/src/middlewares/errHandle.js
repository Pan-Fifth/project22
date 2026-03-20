import { ZodError } from "zod";

const errHandle = (err, req, res, next) => {
  if (err instanceof ZodError) {
    console.log("Zoderr WAAAAA", err.flatten().fieldErrors);
    res.status(400).json({
      status: "Validate error",
      message: err.flatten().fieldErrors || "Internal Server Error",
    });
  }

  console.log("Error Handler ===>", err);
  const status = err.status || 500;

  res.status(status).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

export default errHandle;
