import dbConnect from "../../../db/connect";
import Place from "../../../db/model/Place";

export default async function handler(request, response) {
  const { id } = request.query;

  if (!id) {
    return;
  }

  // try {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const places = await Place.findById(id);
      return response.status(200).json(places);
    } catch (e) {
      console.log("==== Error MF: ", e);
    }
  }

  const place = db_places.find((place) => place._id.$oid === id);
  const comment = place?.comments;
  const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  const comments = db_comments.filter((comment) =>
    allCommentIds.includes(comment._id.$oid)
  );

  if (!place) {
    return response.status(404).json({ status: "Not found" });
  }

  response.status(200).json({ place: place, comments: comments });
}
