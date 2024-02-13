import dbConnect from "../../../db/connect";
import Place from "../../../db/model/Place";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    try {
      const places = await Place.find();
      console.log("======= places MF: ", places); // this console.log is running on the server, we can’t see it in the browser but in the terminal
      response.status(200).json(places); // this passes it as a response to the browser
    } catch (error) {
      console.log("======= ERROR MF: ", error);
    }
  }

  if (request.method === "POST") {
    try {
      const newPlaceData = request.body;
      // await Place.create(newPlaceData);
      const place = new Place(newPlaceData); // takes the form data and connects it to the model "Place" usign the placeData received from the "Form"
      await place.save();
      response.status(201).json({ status: "Place created" });
      console.log("RESPONSE:", response);
    } catch (e) {
      console.log("No place Found --->: ", e);
    }
  }
  // } catch (e) {
  //  console.log("==== Error MF: ", e);
  //
}
