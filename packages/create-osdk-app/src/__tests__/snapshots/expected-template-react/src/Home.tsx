import client from "./client";
import getMethods from "./getMethods";
import Layout from "./Layout";
import css from "./Home.module.css";

function Home() {
  const objectApiNames = getMethods(client.ontology.objects);
  const actionApiNames = getMethods(client.ontology.actions);
  const queryApiNames = getMethods(client.ontology.queries);

  return (
    <Layout>
      <h1>@braeburn/sdk</h1>
      <p>
        Welcome to your Ontology SDK! Try using any of the following methods
        now.
      </p>
      <div className={css.methods}>
        <div>
          <h2>Objects ({objectApiNames.length})</h2>
          {objectApiNames.map((objectApiName) => (
            <p key={objectApiName}>client.ontology.objects.{objectApiName}</p>
          ))}
        </div>
        <div>
          <h2>Actions ({actionApiNames.length})</h2>
          {actionApiNames.map((actionApiName) => (
            <p key={actionApiName}>client.ontology.actions.{actionApiName}</p>
          ))}
        </div>
        <div>
          <h2>Queries ({queryApiNames.length})</h2>
          {queryApiNames.map((queryApiName) => (
            <p key={queryApiName}>client.ontology.queries.{queryApiName}</p>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
