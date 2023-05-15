import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      relevant: {
        queryStringParameters: event.queryStringParameters,
        multiValueQueryStringParameters: event.multiValueQueryStringParameters,
        rawUrl: event.rawUrl,
        rawQuery: event.rawQuery,
      },
      event,
      context,
    }),
  };
};

export { handler };
