import groq from 'groq';
import { SanityRepository } from './sanity.repository';

export class SanitySeoRepository extends SanityRepository {
  protected readonly type = 'seo';

  private readonly getSeoProjection = () => groq`{
    title,
    description,
    "image": image.asset->url,
  }`;

  getSeo = async () => {
    return this.getSingletonDocument(this.getSeoProjection);
  };
}
