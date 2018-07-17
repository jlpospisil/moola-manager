const base_url = "/account";

export function loadAccounts() {
    return {
        types: ["AXIOS", "LOAD_ACCOUNTS"],
        payload: {
            request:{
                url: base_url
            }
        }
    }
}