export const baseUrl = "https://localhost:44317/";

export const postJsonAsync = async (resource: string, payload: any) => {
  try {
    await fetch(`${baseUrl}${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.log({ error });
  }
};

export const getJsonAsync = async (resource: string, payload: any) => {
  try {
    return await fetch(`${baseUrl}${resource}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAsync = (resource: string) =>
  fetch(`${baseUrl}${resource}`, { method: "DELETE" });
