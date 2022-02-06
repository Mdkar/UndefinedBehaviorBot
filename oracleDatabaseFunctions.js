const oracledb = require('oracledb');
require('dotenv').config()

async function update(userIdStr, newVote, price, location='sel') {

  console.log(userIdStr);
  const userId = parseInt(userIdStr, 10);

  let connection;

  try {

    connection = await oracledb.getConnection({ user: "admin", password: process.env.ORACLEDB_PASSWORD, connectionString: "userdata_high" });

    // Create a table

    // await connection.execute(`begin
    //                             execute immediate 'drop table nodetab';
    //                             exception when others then if sqlcode <> -942 then raise; end if;
    //                           end;`);

    // await connection.execute(`create table users (id int, rating float, orders int, lastOrder varchar2(32))`);

    // Insert some rows


    // const sql = `INSERT INTO users VALUES (:1, :2, :3, :4)`;

    // const binds =
    //   [ [0, 5.0, 10, ",abp 5" ],
    //     [1, 4.2, 7, ",eg 7" ] ];

    // await connection.executeMany(sql, binds);

    // connection.commit();     // uncomment to make data persistent

    // Now query the rows back

    // const result = await connection.execute(`SELECT * FROM users`);

    // console.dir(result.rows, { depth: null });

    // search for particular user
    // let userId = 1
    // let location = "bbb" 
    // let price = 6
    // let newVote = 3
    const user = await connection.execute(`SELECT * FROM users WHERE id=${userId}`)
    // console.dir(user)
    if(user.rows.length == 0) {
        let numOrders = 1
        if(newVote <= 0) {
            newVote = 5
            numOrders--
        }
        const exec = `INSERT INTO users (id, rating, orders, lastOrder)
        VALUES (${userId}, ${newVote}, ${numOrders}, ',${location} ${price}')`
        console.log(exec);
        await connection.execute(exec);
    } else {
        console.log(`Rows: ${user.rows}`);
        let rating = user.rows[0][1]
        let numOrders = user.rows[0][2]
        let sum = rating * numOrders;
        if(newVote > 0) {
            sum += newVote
            numOrders++
            rating = sum/numOrders
        }
        let lastOrders = user.rows[0][3]
        if(lastOrders.length > 32-8) {
            lastOrdersArr = lastOrders.split(',')
            lastOrders = ','+lastOrdersArr.slice(2,lastOrdersArr.length)+','+location+' '+price
        } else {
            lastOrders += ','+location+' '+price
        }
        await connection.execute(`UPDATE users 
                                    SET rating=${rating}, orders=${numOrders}, lastOrder='${lastOrders}' 
                                    WHERE id=${userId}`)
    }
    connection.commit();

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function getInfo(userIdStr) {
  const userId = parseInt(userIdStr, 10);
  let connection;

  try {

    connection = await oracledb.getConnection({ user: "admin", password: process.env.ORACLEDB_PASSWORD, connectionString: "userdata_high" });
    const user = await connection.execute(`SELECT * FROM users WHERE id=${userId}`)
    if(user.rows.length == 0) {
      return []
    } else {
      return user.rows[0]
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }

}

module.exports = {update, getInfo}