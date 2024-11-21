export const getRequest = async (username, requestType) => {
  try {
    const request = await fetch(
      `http://localhost:8080/${requestType}/${username}`
    );

    if (!request.ok) throw Error("Did not get expected data");

    const parsedResponse = await request.json();
    console.log("parsedResponse: ", parsedResponse);

    if (parsedResponse.length < 1) alert("You have no folders/files");

    return parsedResponse;
  } catch (err) {
    console.log(err);
  }
};
