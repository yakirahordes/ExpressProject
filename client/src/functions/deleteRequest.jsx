export const deleteRequest = async (username, requestType) => {
  try {
    const request = await fetch(
      `http://localhost:8080/${username}/${requestType}`
    );

    if (!request.ok) throw Error("Was not able to delete");

    const parsedResponse = await request.json();
    return parsedResponse;
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
};
