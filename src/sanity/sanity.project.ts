import groq from 'groq';
import { SanityRepository } from './sanity.repository';

export class SanityProjectRepository extends SanityRepository {
  protected readonly type = 'project';

  getProjectProjection = () => groq`{
    "id": _id,
    "slug": slug.current,
    title,
    date,
    medium,
    description,
    "images": images[] {
      "imageUrl": asset->url + "?h=" + string(round(${window.innerHeight} * 2)),
      "aspectRatio": asset->metadata.dimensions.aspectRatio,
      defined(alt) => {alt},
    },
  }`;

  getProjectBySlug = async (slug: string) => {
    return this.getDocumentBySlug(slug, this.getProjectProjection);
  };
}
