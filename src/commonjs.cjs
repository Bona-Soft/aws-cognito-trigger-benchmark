console.log("AWS_LAMBDA_INITIALIZATION_TYPE: " + process.env.AWS_LAMBDA_INITIALIZATION_TYPE); // provisioned concurrency or on-demand

const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm"); // CommonJS import
const ssmClient = new SSMClient();
const input = { "Name": "/configItem" };
const command = new GetParameterCommand(input);
const init_promise = ssmClient.send(command);
let parameter = null;

exports.handler = async () => {
    if (!parameter) {
        parameter = await init_promise; // await inside handler
    }
    console.log(parameter);

    const response = {
        "statusCode": 200,
        "body": parameter.Parameter.Value
    };
    return response;
};