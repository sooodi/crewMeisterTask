export const actionRequestGet = (endPoint: string) => {
  return {
    method: "GET",
    url: endPoint,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
};
