import RepoCard from "../components/RepoCard";
import "./homePage.css";
import { useGetAllRepoQuery } from "../generated/graphql-types";

export default function HomePage() {
  const { loading, error, data, refetch } = useGetAllRepoQuery();

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Error</p>;
  if (data) {
    return (
      <>
        <h1>Aire de Repos de PJ!</h1>
        <div className="filter-buttons">
          <button onClick={() => refetch({ filter: null })}>
            Tout les langages
          </button>
          {data.allLangs.map((lang: { id: number; label: string }) => (
            <button key={lang.id} onClick={() => refetch({ filter: lang.id })}>
              {lang.label}
            </button>
          ))}
        </div>
        <section className="repoList">
          {data.allRepos.map((repo) => (
            <RepoCard
              key={repo.id}
              name={repo.name}
              url={repo.url}
              langs={repo.langs}
              status={repo.status}
              id={repo.id}
              isFavorite={repo.isFavorite}
            />
          ))}
        </section>
      </>
    );
  }
}
