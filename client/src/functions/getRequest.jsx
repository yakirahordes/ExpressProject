export const getRequest = async (username) => {
  try {
    const request = await fetch(`http://localhost:8080/users/${username}`);
    if (!request.ok) throw Error("Did not get expected data");
    if (request.length === 0) throw Error("You have no folders");
    return request.json();
  } catch (err) {
    console.log(err);
    return err.message;
  }
};
