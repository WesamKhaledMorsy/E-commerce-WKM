export const Constants={
  APIURL : 'https://ecommerce.routemisr.com'
}

export const Apis={
  LoginRegister:{
    signUp:'/api/v1/auth/signup',
    signIn:'/api/v1/auth/signin',
  },User:{
    forgetPass:'/api/v1/auth/forgotPasswords',
    resetCode:'/api/v1/auth/verifyResetCode',
    resetPassword:'/api/v1/auth/resetPassword'
  },
  Products:{
    getAllProduct:'/api/v1/products',
    getProductById:'/api/v1/products/'
  },Category:{
    getAllCategories:'/api/v1/categories/'
  },Cart:{
    Cart:'/api/v1/cart/',
  },Payment:{
    pay:'/api/v1/orders/checkout-session/',
    redirctUrl:'?url=http://localhost:4200'
  },Orders:{
    getUserOrders:'/api/v1/orders/',
    getUserOrdersByUserId:'/api/v1/orders/user/'
  },Brands:{
    brands:'/api/v1/brands/'
  },WishList:{
    wish:'/api/v1/wishlist/'
  }

}
