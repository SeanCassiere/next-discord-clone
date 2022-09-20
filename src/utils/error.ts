import { ErrorFormatter, TRPCError } from "@trpc/server";
import { ZodError, ZodIssue } from "zod";
import { Context } from "../server/router/context";

export class BadReqTRPCError extends TRPCError {
  constructor(message: string, path: string) {
    const errorConfig = {
      code: "BAD_REQUEST" as typeof TRPCError.prototype.code,
      message: message,
    };

    const pathSplit = path.split(".");

    super({
      ...errorConfig,
      cause: new ZodError([{ code: "custom", path: [...pathSplit], message }]),
    });
  }
}

export const formatZodIssues = (issues: ZodIssue[]) =>
  issues.map((issue) => ({
    message: issue.message,
    path: issue.path.join("."),
  }));

type ReturnedError = ReturnType<typeof formatZodIssues>;

export const formatCustomError = (error: string, path: string) => JSON.stringify([{ message: error, path }]);

export const errorFormatter: ErrorFormatter<Context, any> = ({ shape, error, ctx }) => {
  let errors: ReturnedError | null = null;

  if (error.code === "BAD_REQUEST" && error.cause instanceof ZodError) {
    errors = formatZodIssues(error.cause.issues);
  }

  if (error.code === "BAD_REQUEST" && error.cause instanceof TRPCError) {
    errors = (JSON.parse(error.message) as ReturnedError).map((pError) => ({
      ...pError,
      // You can do something in here eg. Translate messages or Sth
    }));
  }

  return {
    ...shape,
    errors,
  };
};
