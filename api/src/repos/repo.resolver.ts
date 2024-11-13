import { Arg, Authorized, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Repo } from "./repos.entities";
import { Status } from "../status/status.entities";
// import { Lang } from "../langs/lang.entities";

@InputType()
class RepoInput implements Partial<Repo> {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field()
  name: string;

  @Field()
  isPrivate: number;
}

@Resolver(Repo)
export default class RepoResolver {
  @Query(() => [Repo])
  async allRepos(@Arg("filter", { nullable: true }) filter: number) {
    if (filter) {
      const repoFilteredByLang = await Repo.find({
        where: { langs: { id: filter } },
        relations: {
          status: true,
          langs: true,
        },
      });
      return repoFilteredByLang;
    }
    const repos = await Repo.find({
      relations: {
        status: true,
        langs: true,
      },
    });
    return repos;
  }
  @Query(() => Repo, { nullable: true })
  async repoById(@Arg("id") id: string): Promise<Repo | null> {
    try {
      const repo = await Repo.findOne({
        where: { id },
        relations: {
          status: true,
          langs: true,
        },
      });
      if (!repo) {
        console.log(`Repo avec l'id ${id} non trouvé.`);
        return null;
      }
      return repo;
    } catch (error) {
      console.error("Erreur lors de la récupération du repo :", error);
      throw error;
    }
  }

  @Authorized("admin")
  @Mutation(() => Repo) //ici typage de la donnée entrante
  // @Arg : typage de la donnée sortante
  async createNewRepo(@Arg("data") newRepo: RepoInput) {
    // const newRepo: RepoInput = req.body.data
    // fonction de validation
    console.log(newRepo);
    const repo = new Repo();
    repo.id = newRepo.id;
    repo.name = newRepo.name;
    repo.url = newRepo.url;

    const status = await Status.findOneOrFail({
      where: { id: +newRepo.isPrivate },
    });
    repo.status = status;

    // const langs = await Lang.findOneOrFail({
    //   where: { id: In(langsIds) },
    // });
    // repo.langs = langs;

    await repo.save();
    // console.log("repo", repo);
    const myRepo = await Repo.findOneOrFail({
      where: { id: newRepo.id },
      relations: {
        langs: true,
        status: true,
      },
    });
    // console.log("myRepo", myRepo);
    return myRepo;
  }
  @Mutation(() => Repo)
  async UpdateRepoFavorite(
    @Arg("id") id: string,
    @Arg("isFavorite") isFavorite: boolean
  ): Promise<Repo | null> {
    const repo = await Repo.findOne({ where: { id } });
    if (!repo) throw new Error("Repo not found");

    repo.isFavorite = isFavorite;
    await repo.save();

    return repo;
  }
}
