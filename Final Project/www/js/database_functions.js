/**
 * File Name: database_functions.js
 *
 * Revision History:
 *       Talon Ernst/Taylor McVittie, 2020-04-04 : Created
 */
//Orders CRUD
var Orders = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO orders(name, PhoneNumber, province, DeliveryType,Address,City," +
                "PostalCode,DeliveryPayment,PizzaType,PizzaSize,Quantity,Total) values(?,?,?,?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert Order successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

//Reviews CRUD
var Reviews = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO reviews(name, comments, reviewDate,likingPercentage,returning," +
                "referAFriend) values(?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert Review successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback){
        function txFunction(tx){
            var sql="SELECT * FROM reviews;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Select All reviews successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback){
        function txFunction(tx){
            var sql="SELECT * FROM reviews WHERE reviewID=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success:  Select review successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback){
        function txFunction(tx){
            var sql="UPDATE reviews SET name=?, comments=?, reviewDate=?, likingPercentage=?, returning=?, " +
                "referAFriend=? WHERE reviewID=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Review updated");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback){
        function txFunction(tx){
            var sql="DELETE FROM reviews WHERE reviewID=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Review Deleted");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

//Emails CRUD
var Emails = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO emailList(email) values(?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert email successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback){
        function txFunction(tx){
            var sql="SELECT * FROM emailList;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Select All emails successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback){
        function txFunction(tx){
            var sql="SELECT * FROM emailList WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success:  Select email successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback){
        function txFunction(tx){
            var sql="UPDATE emailList SET email=? WHERE id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Update successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback){
        function txFunction(tx){
            var sql="DELETE FROM emailList WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Review Deleted");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }};