import groq from 'groq';
import { z } from 'zod';

export abstract class SanityRepository {
  private readonly PROJECT_ID = 'y0s4i58k';
  private readonly DATASET = 'production';
  private readonly dataSchema = z.object({
    result: z.unknown(),
  });
  private readonly errorResponseSchema = z.object({
    error: z.unknown(),
  });

  protected abstract readonly type: string;

  getAllDocuments = async (projection: () => string) => {
    const query = groq`*[_type == "${
      this.type
    }"] | order(_createdAt desc) ${projection()}`;
    return this.fetchData(query);
  };

  getSingletonDocument = async (projection: () => string) => {
    const query = groq`*[_type == "${this.type}"]${projection()}[0]`;
    return this.fetchData(query);
  };

  getNewestDocument = async (projection: () => string) => {
    const query = groq`*[_type == "${
      this.type
    }"] | order(_createdAt desc) ${projection()}[0]`;
    return this.fetchData(query);
  };

  getDocumentBySlug = async (slug: string, projection: () => string) => {
    const query = groq`*[_type == "${
      this.type
    }" && slug.current == "${slug}"]${projection()}[0]`;
    return this.fetchData(query);
  };

  private fetchData = async (query: string) => {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://${this.PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${this.DATASET}?query=${encodedQuery}`;
    const response = await fetch(url);

    if (!response.ok) {
      const { error } = this.errorResponseSchema.parse(await response.json());
      console.error(error);

      throw new Error(
        `Error ${String(response.status)} while fetching Sanity data.`,
      );
    }

    const data = this.dataSchema.parse(await response.json());

    return data.result;
  };
}
