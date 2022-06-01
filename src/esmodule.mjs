
console.log("AWS_LAMBDA_INITIALIZATION_TYPE: " + process.env.AWS_LAMBDA_INITIALIZATION_TYPE); // provisioned concurrency or on-demand

import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm"; // ES module import
const ssmClient = new SSMClient();
const input = { "Name": "/configItem" }
const command = new GetParameterCommand(input);
const parameter = await ssmClient.send(command); // top-level await

export async function handler() {
    
    // In commonjs, require is defined. In ES it is not.
    if (typeof require == "function") {
        console.log("I am a CommonJS module");
    } else {
        console.log("I am a ES module");
    };

    const response = {
        statusCode: 200,
        "body": parameter.Parameter.Value
    };
    return response;
};
