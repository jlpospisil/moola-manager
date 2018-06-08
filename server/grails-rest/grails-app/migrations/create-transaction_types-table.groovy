databaseChangeLog = {

    changeSet(author: "Josh Pospisil", id: "2018150000-create-transaction_types-table") {
        createTable(tableName: "transaction_types") {
            column(autoIncrement: "true", name: "id", type: "int(10) unsigned") {
                constraints(primaryKey: "true")
            }

            column(name: "name", type: "varchar(50)") {
                constraints(nullable: "false")
            }

            column(name: "type", type: "enum('income','expense')", defaultValue: "expense") {
                constraints(nullable: "false")
            }
        }
    }
}
