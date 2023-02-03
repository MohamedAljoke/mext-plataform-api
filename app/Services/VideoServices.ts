import Type from "App/Models/Type";
import Video from "App/Models/Video";

export default class VidesServices {
  constructor() {}
  public async saveVideoService({
    video,
    typesId,
  }: {
    video: Partial<Video>;
    typesId: number[] | undefined;
  }) {
    const addedVideo = await Video.create(video);
    if (typesId !== undefined) {
      const type = await Type.query().whereIn("id", typesId);
      await addedVideo.related("types").attach(type.map((role) => role.id));
      await addedVideo.load("types");
    }
    return addedVideo;
  }
  public async deleteVideoService(id: number) {
    const data = await Video.query().where({ id }).delete();
    return data;
  }
  public async updateVideoService({
    id,
    videoName,
    videoUrl,
  }: {
    id: number;
    videoName?: string;
    videoUrl?: string;
  }) {
    const video = await Video.findOrFail(id);
    if (videoName) {
      video.videoName = videoName; //
    }
    if (videoUrl) {
      video.videoUrl = videoUrl; //
    }
    await video.save();
    return video;
  }
}
