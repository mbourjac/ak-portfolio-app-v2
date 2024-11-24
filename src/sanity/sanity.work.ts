import groq from 'groq';
import { SanityRepository } from './sanity.repository';

export class SanityWorkRepository extends SanityRepository {
  protected readonly type = 'work';

  private readonly projectInfoFragment = groq`
  "id": _id,
  title,
  "svgTitle": svgTitle.asset->url,
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
        "desktopUrl": cover.image.asset->url + "?w=" + string(round(${window.innerWidth} / 100 * cover.desktopWidth * 2)),
        "mobileUrl": cover.image.asset->url + "?w=" + string(round(${window.innerWidth} / 100 * cover.mobileWidth * 2)),
        "desktopPosition": {
          "top": cover.desktopPosition.top,
          "left": cover.desktopPosition.left,
          "zIndex": cover.desktopPosition.zIndex,
        },  
        "mobilePosition": {
          "top": cover.mobilePosition.top,
          "left": cover.mobilePosition.left,
          "zIndex": cover.mobilePosition.zIndex,
        },      
        "size": {
          "desktopWidth": cover.desktopWidth,
          "mobileWidth": cover.mobileWidth,
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
        "desktopUrl": cover.image.asset->url + "?h=" + string(round((${window.innerHeight} - 150) / 100 * cover.height * 2)),  
        "mobileUrl": cover.image.asset->url + "?w=" + string(round(${window.innerWidth} * 2)),
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
