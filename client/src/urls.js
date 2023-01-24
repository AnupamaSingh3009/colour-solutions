    export class URLs {

    static BASE_URL = 'http://localhost:4000';

    //MENU
    static GET_MENU_URL = `${URLs.BASE_URL}/menu`;
    //AUTHENTICATION
    static LOGIN_URL = `${URLs.BASE_URL}/auth/login`;
    static WHOAMI_URL = `${URLs.BASE_URL}/auth/whoami`;

    //PAGES

    //CATEGORY
    static GET_CATEGORY_URL = `${URLs.BASE_URL}/category`;
    static CREATE_CATEGORY_URL = `${URLs.BASE_URL}/category`;
    static UPDATE_CATEGORY_URL = `${URLs.BASE_URL}/category`;
    static DELETE_CATEGORY_URL = `${URLs.BASE_URL}/category`;
    static GET_CATEGORY_PRODUCTS_URL = (name) => `${URLs.BASE_URL}/category/name/${name}`;
    static GET_SUB_CATEGORIES_BY_NAME_URL = (name) => `${URLs.BASE_URL}/category/subcategories/${name}`;
    //PRODUCT
    static GET_PRODUCT_URL = `${URLs.BASE_URL}/products`;
    static CREATE_PRODUCT_URL = `${URLs.BASE_URL}/products`;
    static UPDATE_PRODUCT_URL = `${URLs.BASE_URL}/products`;
    static DELETE_PRODUCT_URL = (id) => `${URLs.BASE_URL}/products/${id}`;
    static UPLOAD_PRODUCT_IMAGE_URL = (id) => `${URLs.BASE_URL}/products/${id}/upload`;
    static DELETE_PRODUCT_IMAGE_URL = (id) => `${URLs.BASE_URL}/products/${id}/photos`;


    //PAGES
    static GET_PAGES_URL = `${URLs.BASE_URL}/pages`;
    static CREATE_PAGES_URL = `${URLs.BASE_URL}/pages`;
    static UPDATE_PAGES_URL = `${URLs.BASE_URL}/pages`;
    static DELETE_PAGES_URL = `${URLs.BASE_URL}/pages`;
    static GET_PAGE_BY_LINK_URL = (name) => `${URLs.BASE_URL}/pages/link/${name}`;

    //FOREX EXCHANGE
    //static GET_FOREX_EXCHANGE_URL ='https://v6.exchangerate-api.com/v6/baffec4dfe2bfabc9495df35/latest/INR'
}