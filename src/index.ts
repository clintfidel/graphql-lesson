import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";

const main = async () => {
  const orm = await MikroORM.init({
		dbName: 'test-data',
		debug: !__prod__,
		type: 'postgresql'
	});
};

main();
console.log("hello worrd");
