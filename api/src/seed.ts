import { AppDataSource } from "./data-source";

import { Lang } from "./langs/lang.entities";
import langs from "../data/langs.json";

import { Status } from "./status/status.entities";
import status from "../data/status.json";

import { Repo } from "./repos/repos.entities";
import repos from "../data/repos.json";

import langs_by_repo from "../data/lang_by_repo.json";

(async () => {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();
    await queryRunner.query("DELETE FROM repo_langs_lang");
    await queryRunner.query("DELETE FROM lang");
    await queryRunner.query("DELETE FROM repo");
    await queryRunner.query("DELETE FROM status");

    await queryRunner.query(
      'DELETE FROM sqlite_sequence WHERE name="status" OR name="lang"'
    );

    const savedlangs = await Promise.all(
      langs.map(async (lan) => {
        const lang = new Lang();
        lang.label = lan.label;

        return await lang.save();
      })
    );
    console.log(savedlangs);

    const savedstatus = await Promise.all(
      status.map(async (sta) => {
        const status = new Status();
        status.label = sta.label;

        return await status.save();
      })
    );
    console.log(savedstatus);

    const savedrepos = await Promise.all(
      repos.map(async (rep) => {
        const repo = new Repo();
        repo.id = rep.id;
        repo.name = rep.name;
        repo.url = rep.url;

        const status = savedstatus.find(
          (st) => st.id === rep.isPrivate
        ) as Status;
        repo.status = status;

        const mylangs = savedlangs.filter((svlg) => {
          console.log("repoId", rep.id);
          const associatedlang = langs_by_repo.filter(
            lgbyrepo => lgbyrepo.repo_id === rep.id
          );
          console.log("A", associatedlang);
          const langLabel = langs.filter(lg =>
            associatedlang.some(assolg => assolg.lang_id === lg.id)
          );
          return langLabel.some(lglabel => lglabel.label === svlg.label);
        });
        repo.langs = mylangs;

        return await repo.save();
      })
    );
    console.log(savedrepos);

    await queryRunner.commitTransaction();
  } catch (error) {
    console.log(error);
    await queryRunner.rollbackTransaction();
  }
})();
