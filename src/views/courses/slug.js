import React from "react";

// reactstrap components
import {
  Container,
  Row,
} from "reactstrap";

// core components
import CoverHeader from "components/Headers/CoverHeader";
import { useTranslation } from "react-i18next";
import { PAGES } from "help/constants";
import { client } from "help/client";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

function Slug(props) {
  const [articles, setArticles] = React.useState(null);
  const { t } = useTranslation();
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    client.getEntries()
      .then(data => {
        const article = data.items.find(item => {
          return item.sys.id === props.match.params.slug;
        });
        setArticles(article);
      }).catch(err => {
        console.log("err", err);
      });
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [props.match.params.slug]);

  if (!articles) return <div />;
  return (
    <div className="wrapper">
      <CoverHeader
        title={t("courses")}
        page={PAGES.COURSES}
      />
      <div className="section section-about-us">
        <Container>
          <Row>
            {documentToReactComponents(articles.fields.document, {
              renderNode: {
                "embedded-asset-block": node => <img src={node.data.target.fields.file.url} alt={articles.fields.title} style={{ width: '100%', height: 'auto' }} />
              }
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Slug;
