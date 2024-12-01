import groq from 'groq';
import { SanityRepository } from './sanity.repository';

export class SanityInformationRepository extends SanityRepository {
  protected readonly type = 'information';

  private readonly getInformationProjection = () => groq`{
    bio,
    email,
    instagram,
    copyright
  }`;

  getInformation = async () => {
    return this.getSingletonDocument(this.getInformationProjection);
  };
}
