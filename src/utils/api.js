export const saveDataToBackend = async (cred_id, json_data) => {
    try {
      const response = await fetch("http://localhost:3000/store-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cred_id: cred_id,
          json_data: json_data,
        }),
      });
      console.log("Response after API call: ", response);
  
      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }
  
      console.log("Data stored successfully.");
      return response; // You can return response or specific data if needed
    } catch (err) {
      console.error("Error saving data to backend:", err);
      throw err; // Rethrow the error if you want the caller to handle it
    }
  };
  