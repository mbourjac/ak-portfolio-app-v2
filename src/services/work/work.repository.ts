export interface WorkRepository {
  getHomeWork: () => Promise<unknown>;
  getWork: () => Promise<unknown>;
}
