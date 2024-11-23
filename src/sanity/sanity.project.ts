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
    "gallery": gallery[] {
      "type": _type,
      "filename": asset->originalFilename,
      "url": asset->url + "?h=" + string(round(${window.innerHeight} * 2)),
      "aspectRatio": coalesce(asset->metadata.dimensions.aspectRatio, 16/9),
      defined(alt) => {alt},
    },
  }`;

  getProjectBySlug = async (slug: string) => {
    return this.getDocumentBySlug(slug, this.getProjectProjection);
  };
}
