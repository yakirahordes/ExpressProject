export const postRequest = async (obj, requestType = "") => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": `application/json`,
    },
    body: JSON.stringify(obj),
  };
  // try {
  const request = await fetch(
    `http://localhost:8080/${requestType}`,
    postOptions
  );
  if (!request.ok) alert("Did not get expected data");
  const parsedResponse = await request.json();
  console.log("parsedResponse: ", parsedResponse);

  return parsedResponse;
  // } catch (err) {
  //   console.log(err);
  // }
};
