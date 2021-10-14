import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Dynamo } from "../../libs/dynamo";
// import schema from "./schema";

const hello = async (event) => {
  const user = await Dynamo.getalldata("WahabTable").catch((err) => {
    console.log("error in Dynamo Get", err);
    return null;
  });

  if (!user) {
    return formatJSONResponse({ message: "Failed to get user by ID" });
  }

  return formatJSONResponse({ message: user });
};

export const main = middyfy(hello);
