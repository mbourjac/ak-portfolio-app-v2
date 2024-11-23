import groq from 'groq';
import { SanityRepository } from './sanity.repository';

export class SanityWorkRepository extends SanityRepository {
  protected readonly type = 'work';

  private readonly projectInfoFragment = groq`
  "id": _id,
  title,
  "slug": slug.current,
  date,
  medium
`;

  private readonly coverVideoFragment = groq`
  defined(cover.video) => {
    "videoFilename": cover.video.asset->originalFilename
  }
`;

  private readonly coverAspectRatioFragment = groq`
  "aspectRatio": cover.image.asset->metadata.dimensions.aspectRatio
`;

  private readonly getHomeWorkProjection = () => groq`{
    "projects": projects[]-> {
      ${this.projectInfoFragment},
      "cover": {
        ${this.coverVideoFragment},
        "imageUrl": cover.image.asset->url + "?w=" + string(round(${window.innerWidth} / 100 * cover.width * 2)),
        "position": {
          "top": cover.position.top,
          "left": cover.position.left,
          "zIndex": cover.position.zIndex,
        },      
        "size": {
          "width": cover.width,
          ${this.coverAspectRatioFragment},
        }
      }
    },
  }`;

  private readonly getWorkProjection = () => groq`{
    "projects": projects[]-> {
      ${this.projectInfoFragment},
      "cover": {
        ${this.coverVideoFragment},
        "imageUrl": cover.image.asset->url + "?h=" + string(round((${window.innerHeight} - 150) / 100 * cover.height * 2)),  
        "size": {
          "height": cover.height,
          ${this.coverAspectRatioFragment},
        }
      }
    },
  }`;

  getHomeWork = async () => {
    return this.getSingletonDocument(this.getHomeWorkProjection);
  };

  getWork = async () => {
    return this.getSingletonDocument(this.getWorkProjection);
  };
}
