import { Query, Resolver } from "type-graphql";
import { Lang } from "../langs/lang.entities";

@Resolver(Lang)
export default class LangResolver {
  // Methode Get pour tout les langages
  @Query(() => [Lang])
  async allLangs() {
    const lang = await Lang.find();
    // console.log("coucou de lang", lang);
    return lang;
  }
}