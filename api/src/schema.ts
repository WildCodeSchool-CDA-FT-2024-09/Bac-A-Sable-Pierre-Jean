import { buildSchema } from "type-graphql";
import RepoResolver from "./repos/repo.resolver";
import UserResolver from "./user/user.resolvers";
import LangResolver from "./langs/lang.resolver";
import StatusResolver from "./status/status.resolver";

const getSchema = async () => {
  return await buildSchema({
    resolvers: [RepoResolver, UserResolver, LangResolver, StatusResolver],
    authChecker: ({ context }, roles): boolean => {
      // Si utilisateur admin et Authorized("admin")
      if (roles.length > 0)
        return roles.some((role) => context.cookie.role === role);

      // Si utilisateur connect et Authorized()
      if (context.cookie) return true;

      // Default
      return false;
    },
  });
};

export default getSchema;