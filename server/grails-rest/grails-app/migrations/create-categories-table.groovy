databaseChangeLog = {

    changeSet(author: "Josh Pospisil", id: "2018150000-create-categories-table") {
        createTable(tableName: "categories") {
            column(autoIncrement: "true", name: "id", type: "int(10) unsigned") {
                constraints(primaryKey: "true")
            }

            column(name: "name", type: "varchar(50)") {
                constraints(nullable: "false")
            }

            column(name: "budget_amt", type: "decimal(7,2)") {

            }
        }
    }
}
