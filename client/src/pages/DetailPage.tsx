import { useParams } from "react-router-dom";
import { useApolloClient, useQuery } from "@apollo/client";
import "./DetailPage.css";
import { Lang } from "../types/LangTypes";
import { REPO_BY_ID } from "../schema/query";
import { UPDATE_REPO_FAVORITE } from "../schema/mutations";

export default function DetailPage() {
  const { id } = useParams();
  const client = useApolloClient();

  const { loading, error, data } = useQuery(REPO_BY_ID, {
    variables: { repoByIdId: id },
  });

  const handleLike = async () => {
    if (!data) return;
    try {
      const { data: updatedRepo } = await client.mutate({
        mutation: UPDATE_REPO_FAVORITE,
        variables: {
          id: data.repoById.id,
          isFavorite: !data.repoById.isFavorite,
        },
        update: (cache, { data: { updateRepo } }) => {
          cache.writeQuery({
            query: REPO_BY_ID,
            variables: { repoByIdId: data.repoById.id },
            data: {
              repoById: {
                ...data.repoById,
                isFavorite: updateRepo.isFavorite,
              },
            },
          });
        },
      });
      console.log(
        "Updated favorite status:",
        updatedRepo.updateRepo.isFavorite
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data && (
        <section className="detailCard">
          <h1 className="detailTitle">{data.repoById.name}</h1>
          <ul>
            {data.repoById.langs.map((lang: Lang) => (
              <li key={lang.id}>{lang.label}</li>
            ))}{" "}
          </ul>
          <button type="button" onClick={handleLike}>
            {data.repoById.isFavorite ? "DisLike 🩶" : "Like ❤️‍🔥"}
          </button>
        </section>
      )}
    </>
  );
}
