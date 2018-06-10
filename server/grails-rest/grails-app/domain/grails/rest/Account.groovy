package grails.rest

class Account {

    Integer id
    String name
    BigDecimal budget_amt

    static hasMany = [transactions: Transaction]

    static mapping = {
        table "accounts"
    }

    static constraints = {
        name(size: 1..50)
        budget_amt(nullable: true, scale: 2)
    }
}
