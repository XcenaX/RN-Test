import { SQLite } from "expo-sqlite";

const db = SQLite.openDatabase("Users");

export default class SQL {
  static InitDatabase() {
    db.transaction(tx => {
      tx.executeSql(
        `create table if not exists Users (id integer, password nvarchar(30), email nvarchar(30), isLogged bool);`
      );
    });
  }

  static AddUser = user => {
    db.transaction(
      tx => {
        tx.executeSql(`insert into Users (password,email,isLogged) values (?,?,false)`, [
          user.password,
          user.email
        ]);
      },
      null,
      null
    );
  };

  static GetUsers = () => {
    return new Promise((resolve, reject) => {
      db.transaction(async tx => {
        await tx.executeSql(
          `select * from Users order by id DESC`,
          null,
          (_, { rows: { _array } }) => {
            resolve(_array);
          }
        );
      });
    });
  };
}
