export const merchantTransform = (id, merchants) => {
  if (!id) {
    return null;
  }

  const merchant = merchants.find(merchant => merchant.id === id);
  return {
    id,
    name: merchant ? merchant.name : null
  };
};

export const categoryTransform = (id, categories) => {
  if (!id) {
    return null;
  }

  const category = categories.find(category => category.id === id);
  return {
    id,
    name: category ? category.name : null
  };
};

export const transactionTransform = (transaction, state) => {
  const { merchant, category, ...details } = transaction;
  const { merchants, categories } = state;
  const merchant_id = merchant !== null && typeof merchant === 'object' ? merchant.id : merchant;
  const category_id = category !== null && typeof category === 'object' ? category.id : category;
  return {
    ...details,
    merchant: merchantTransform(merchant_id, merchants || []),
    category: categoryTransform(category_id, categories || [])
  };
};

export const transactionsTransform = (transactions, state) => transactions.map(transaction => transactionTransform(transaction, state));
