import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class FatLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // =============================================================================
    // add lambda function
    // =============================================================================
    const addLambda = new lambda.Function(this, "addLambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.add",
      code: lambda.Code.fromAsset("lambda"),
    });

    // =============================================================================
    // subtract lambda function
    // =============================================================================
    const subtractLambda = new lambda.Function(this, "subtractLambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.subtract",
      code: lambda.Code.fromAsset("lambda"),
    });

    // =============================================================================
    // multiply lambda function
    // =============================================================================
    const multiplyLambda = new lambda.Function(this, "multiplyLambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.multiply",
      code: lambda.Code.fromAsset("lambda"),
    });

    // =============================================================================
    // api gateway lambdaRestApi
    // =============================================================================
    const api = new apigateway.LambdaRestApi(this, "api", {
      handler: addLambda,
      proxy: false, // If true, route all requests to the Lambda Function. If set to false, you will need to explicitly define the API model using addResource and addMethod (or addProxy).
    });

    // =============================================================================
    // Represents the root resource of this API endpoint ('/'). Resources and Methods are added to this resource
    // =============================================================================
    api.root
      .resourceForPath("add") // Gets or create all resources leading up to the specified path.
      .addMethod("GET", new apigateway.LambdaIntegration(addLambda)); // Defines a new method for this resource

    api.root
      .resourceForPath("subtract") // Gets or create all resources leading up to the specified path.
      .addMethod("GET", new apigateway.LambdaIntegration(subtractLambda)); // Defines a new method for this resource

    api.root
      .resourceForPath("multiply") // Gets or create all resources leading up to the specified path.
      .addMethod("GET", new apigateway.LambdaIntegration(multiplyLambda)); // Defines a new method for this resource
  }
}
