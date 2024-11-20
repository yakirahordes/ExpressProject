export const postRequest = async (obj, requestType) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": `application/json`,
    },
    body: JSON.stringify(obj),
  };
  try {
    const request = await fetch(
      `http://localhost:8080/users/${requestType}`,
      postOptions
    );

    console.log("request: ", request);

    if (!request.ok) throw Error("Did not get expected data");
    const parsedResponse = await request.json();
    console.log("parsedResponse: ", parsedResponse);
    return parsedResponse;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};