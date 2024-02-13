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
}
