databaseChangeLog = {

    changeSet(author: "Josh Pospisil", id: "2018150000-create-transactions-table") {
        createTable(tableName: "transactions") {
            column(autoIncrement: "true", name: "id", type: "int(10) unsigned") {
                constraints(primaryKey: "true")
            }

            column(name: "transaction_type_id", type: "int(10) unsigned") {
                constraints(nullable: "false")
            }

            column(name: "account_id", type: "int(10) unsigned") {
                constraints(nullable: "false")
            }

            column(name: "category_id", type: "int(10) unsigned") {

            }

            column(name: "vendor_id", type: "int(10) unsigned") {

            }

            column(name: "amount", type: "decimal(7,2)") {

            }
        }

        addForeignKeyConstraint(baseTableName: "transactions", baseColumnNames: "transaction_type_id", referencedTableName: "transaction_types", referencedColumnNames: "id", constraintName: "transaction_type_fk")
        addForeignKeyConstraint(baseTableName: "transactions", baseColumnNames: "account_id", referencedTableName: "accounts", referencedColumnNames: "id", constraintName: "account_fk")
        addForeignKeyConstraint(baseTableName: "transactions", baseColumnNames: "category_id", referencedTableName: "categories", referencedColumnNames: "id", constraintName: "category_fk")
        addForeignKeyConstraint(baseTableName: "transactions", baseColumnNames: "vendor_id", referencedTableName: "vendors", referencedColumnNames: "id", constraintName: "vendor_fk")
    }
}
