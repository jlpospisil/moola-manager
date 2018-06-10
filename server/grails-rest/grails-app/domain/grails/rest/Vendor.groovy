package grails.rest

class Vendor {

    Integer id
    String name

    static hasMany = [transactions: Transaction]

    static mapping = {
        table "vendors"
    }

    static constraints = {
        name(size: 1..50)
    }
}
