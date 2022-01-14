import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 10);

  await connection.query(
    `
      INSERT INTO USERS(id, name, email, password, driver_license, is_admin, created_at)
      values('${id}', 'admin', 'admin@gmail.com', '${password}', 'AB', true, 'now()')
    `
  );

  await connection.close();
}

create().then(() => console.log("User admin created"));
