import { Helmet } from 'react-helmet-async';
import type { Seo as SeoType } from '../services/seo/seo.types';

type SeoProps = SeoType;

export const Seo = ({ title, description, image }: SeoProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title}></meta>
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image}></meta>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.origin}></meta>
    </Helmet>
  );
};
