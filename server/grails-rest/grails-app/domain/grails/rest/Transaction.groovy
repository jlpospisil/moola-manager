package grails.rest

class Transaction {

    Integer id
    BigDecimal amount

    static mapping = {
        table "transactions"
    }

    static constraints = {
        amount(scale: 2)
    }
}
