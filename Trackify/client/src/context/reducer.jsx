export function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return { user: action.payload };
    case "setExpenses":
      return { ...state, expenses: action.payload };
    case "setIsUpdateExpense": {
      return { ...state, updateExpense: action.payload };
    }
    case "setReciept": {
      return { ...state, reciept: action.payload };
    }
    case "setCurrency": {
      return { ...state, currency: action.payload };
    }
    case "setIsUploadImageSelect": {
      return { ...state, isUploadImageSelect: action.payload };
    }
    case "setExpensesFormData": {
      return { ...state, isUploadImageSelect: action.payload };
    }
    case "setIsSignUp": {
      return { ...state, isSignUp: action.payload };
    }
    case "setEnteredIncomes": {
      return { ...state, enteredIncomes: action.payload };
    }
    case "setBalance": {
      return { ...state, balance: action.payload };
    }
    case "setChangeImage": {
      return { ...state, changeImage: action.payload };
    }
    case "setIncomes": {
      return { ...state, incomes: action.payload };
    }
    case "setIsOnSignAndLogin": {
      return { ...state, isOnSignAndLogin: action.payload };
    }
  }
}

export const initialState = {
  user: null,
  expenses: null,
  updateExpense: false,
  recieptInfo: "",
  currency: "",
  isUpdateExpense: false,
  reciept: "images/no-image.jpg",
  isUploadImageSelect: false,
  isSignUp: false,
  enteredIncomes: [],
  balance: 0,
  changeImage: "",
  incomes: null,
  isOnSignAndLogin: false,
};
