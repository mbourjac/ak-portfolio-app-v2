import groq from 'groq';
import { SanityRepository } from './sanity.repository';

export class SanityWorkRepository extends SanityRepository {
  type = 'work';

  getHomeWorkProjection = () => groq`{
    "projects": projects[]-> {
      "id": _id,
      title,
      "slug": slug.current,
      date,
      medium,
      "cover": {
        "imageUrl": cover.image.asset->url + "?w=" + string(round(${window.innerWidth} / 100 * cover.width * 2)),
        defined(video) => {
          "videoUrl": video.asset->url
        },
        "position": {
          "top": cover.position.top,
          "left": cover.position.left,
          "zIndex": cover.position.zIndex,
        },      
        "size": {
          "width": cover.width,
          "aspectRatio": cover.image.asset->metadata.dimensions.aspectRatio,
        }
      }
    },
  }`;

  getHomeWork = async () => {
    return this.getSingletonDocument(this.getHomeWorkProjection);
  };
}
