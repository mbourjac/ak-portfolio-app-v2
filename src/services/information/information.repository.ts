export interface InformationRepository {
  getInformation: () => Promise<unknown>;
}
