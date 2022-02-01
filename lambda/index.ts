export async function add(event: any) {
  console.log(`event: ${JSON.stringify(event, null, 2)}`);

  let firstNum = event?.queryStringParameters?.firstNum ?? 0;
  let secondNum = event?.queryStringParameters?.secondNum ?? 0;

  let result = Number(firstNum) + Number(secondNum);
  console.log(
    `The Sum of "${firstNum}" and "${secondNum}" is equal to ${result}`
  );

  return sendResponse(200, result.toString());
}

export async function subtract(event: any) {
  console.log(`event: ${JSON.stringify(event, null, 2)}`);

  let firstNum = event?.queryStringParameters?.firstNum ?? 0;
  let secondNum = event?.queryStringParameters?.secondNum ?? 0;

  let result = Number(firstNum) - Number(secondNum);
  console.log(
    `The Subtraction of "${firstNum}" and "${secondNum}" is equal to ${result}`
  );

  return sendResponse(200, result.toString());
}

export async function multiply(event: any) {
  console.log(`event: ${JSON.stringify(event, null, 2)}`);

  let firstNum = event?.queryStringParameters?.firstNum ?? 0;
  let secondNum = event?.queryStringParameters?.secondNum ?? 0;

  let result = Number(firstNum) * Number(secondNum);
  console.log(
    `The Multiplication of "${firstNum}" and "${secondNum}" is equal to ${result}`
  );

  return sendResponse(200, result.toString());
}

const sendResponse = (statusCode: number, body: string) => {
  return {
    statusCode,
    body: JSON.stringify({
      message: body,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "text/html",
    },
  };
};
