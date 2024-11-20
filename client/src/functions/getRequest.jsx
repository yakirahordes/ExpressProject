export const getRequest = async (username, requestType) => {
  try {
    const request = await fetch(
      `http://localhost:8080/${requestType}/${username}`
    );

    if (!request.ok) throw Error("Did not get expected data");
    if (request.length === 0) throw Error("You have no folders/files");

    return request.json();
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
};
