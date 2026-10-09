const getInitialCart = () => {
  try {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

const saveCart = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Could not save cart:', error);
  }
};

const handleCart = (state = getInitialCart(), action) => {
  const product = action.payload;
  let newState = state;

  switch (action.type) {
    case 'ADDITEM': {
      const exist = state.find((x) => x.id === product.id);

      if (exist) {
        newState = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        newState = [...state, { ...product, qty: 1 }];
      }
      break;
    }

    case 'DELITEM': {
      const exist = state.find((x) => x.id === product.id);

      if (exist && exist.qty === 1) {
        newState = state.filter((x) => x.id !== exist.id);
      } else {
        newState = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      break;
    }

    default:
      return state;
  }

  saveCart(newState);
  return newState;
};

export default handleCart;