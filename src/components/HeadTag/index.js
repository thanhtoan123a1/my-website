import React from "react";
import { Helmet } from "react-helmet";

function Head(props) {
  const { siteName, title, description, keyword, ogUrl, ogImageUrl, noindex } =
    props;

  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        {noindex && <meta name="robots" content="noindex" />}
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image" content={ogImageUrl} />
      </Helmet>
  );
}

export default Head;
