/**
 * File Name: database.js
 *
 * Revision History:
 *       Talon Ernst/Taylor McVittie, 2020-04-04 : Created
 */
var db;

//Error Handling function
function errorHandler(tx, error) {
    console.error("SQL Error: " + tx + " ( " + error.code + ") -- " + error.message);
}

//Creates the Database
var DB = {
    CreateDatabase: function () {
        var DatabaseName = "T & T Database";
        var version = "1.0";
        var displayName = "DB for T & T Pizzeria";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database creation successful");
        }

        db = openDatabase(DatabaseName, version, displayName, dbSize, dbCreateSuccess);
    },
    //Creates the tables
    createTables: function () {
        function txFunction(tx) {
            var options = [];
            var sql = "CREATE TABLE IF NOT EXISTS orders(" +
                "orderID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL," +
                "PhoneNumber VARCHAR(13) NOT NULL, " +
                "province VARCHAR(2) NOT NULL," +
                "DeliveryType VARCHAR(15) NOT NULL," +
                "Address VARCHAR(25)," +
                "City VARCHAR(25)," +
                "PostalCode VARCHAR(7)," +
                "DeliveryPayment VARCHAR(15)," +
                "PizzaType VARCHAR(20) NOT NULL," +
                "PizzaSize VARCHAR(20) NOT NULL," +
                "Quantity INTEGER NOT NULL," +
                "Total INTEGER); ";

            tx.executeSql(sql, options, successCallback, errorHandler);


            var sql = "CREATE TABLE IF NOT EXISTS reviews(" +
                "reviewID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL," +
                "comments TEXT," +
                "reviewDate VARCHAR(16)," +
                "likingPercentage INTEGER," +
                "returning VARCHAR(5)," +
                "referAFriend VARCHAR(5));";

            tx.executeSql(sql, options, successCallback, errorHandler);

            var sql = "CREATE TABLE IF NOT EXISTS emailList(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "email VARCHAR(30) NOT NULL);";

            tx.executeSql(sql, options, successCallback, errorHandler);

            function successCallback() {
                console.info("Success: Table creation successful");
            }
        }

        function successTransaction() {
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};