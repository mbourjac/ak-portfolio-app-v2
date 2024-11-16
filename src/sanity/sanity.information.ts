import groq from 'groq';
import { SanityRepository } from './sanity.repository';

export class SanityInformationRepository extends SanityRepository {
  type = 'information';

  getInformationProjection = () => groq`{
    bio,
    email,
    instagram,
    copyright
  }`;

  getInformation = async () => {
    return this.getSingletonDocument(this.getInformationProjection);
  };
}
