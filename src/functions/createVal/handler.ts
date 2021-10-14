import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Dynamo } from "../../libs/dynamo";
import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  let ID = event.body;
  console.log(ID, "eee");
  const newUser = await Dynamo.write(ID, "WahabTable").catch((err) => {
    console.log("error in dynamo write", err);
    return null;
  });

  if (!newUser) {
    return formatJSONResponse({ message: "Failed to get user by ID" });
  }

  return formatJSONResponse({ message: newUser });
};

export const main = middyfy(hello);
