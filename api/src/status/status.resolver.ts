import { Query, Resolver } from "type-graphql";
import { Status } from "../status/status.entities";

@Resolver(Status)
export default class StatusResolver {
  // Methode Get pour tout les status
  @Query(() => [Status])
  async allStatus() {
    const status = await Status.find();
    // console.log(status);
    return status;
  }
}
