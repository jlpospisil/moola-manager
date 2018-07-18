const base_url = "/account";

export const loadAccounts = () => {
    return {
        types: ["AXIOS", "LOAD_ACCOUNTS"],
        payload: {
            request:{
                url: base_url
            }
        }
    }
};