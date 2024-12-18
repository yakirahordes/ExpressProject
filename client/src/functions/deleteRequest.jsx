export const deleteRequest = async (username, requestType) => {
  const deleteOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": `application/json`,
    },
  };
  try {
    const request = await fetch(
      `http://localhost:8080/${username}/${requestType}`,
      deleteOptions
    );

    console.log("requesttt", request.ok);
    return request.ok;
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
};
