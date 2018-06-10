package grails.rest

import grails.rest.*
import grails.converters.*

class AccountController extends RestfulController {
    static responseFormats = ['json', 'xml']

    AccountController() {
        super(Account)
    }

    def index () {
        render Account.list()
    }

    def show () {
        render Account.get(params.id)
    }

    def listTransactions () {
        render []
    }
}
