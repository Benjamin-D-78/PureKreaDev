export const RGXR = {
    NOM: /^[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/,
    PRENOM: /^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/,
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PASSWORD: /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!\*\(\)]))[\w\d,;.?!\*\(\)]{8,40}$/,
    PHONE: /^\d{10}$/,
    ADRESS: /^[a-zA-Z0-9\s\-'^¨èéàù]{8,70}$/,
    POSTAL: /^\d{5}$/,
    TOWN: /^[a-zA-Z\s\-'^¨èéàù]{2,50}$/,
    CONTENT: /^[a-zA-Z0-9\s,?!()."'éèêàùîôäëïöü -]+$/,

    ITEM_NAME: /^[a-zA-ZàèéêùÀÈÉÙ'-\s]{2,30}$/,
    ITEM_WIDTH: /^[\d.]{1,6}$/,
    ITEM_COLOR: /^[a-zA-ZàèéùÀÈÉÙ'()-\s]{2,30}$/,
    ITEM_CONTENT: /^[a-zA-ZàèéùÀÈÉÙ'()-\s,]{2,60}$/,
    ITEM_DETAIL: /^[a-zA-ZàèéùÀÈÉÙ'()-\s,]{2,60}$/,
    ITEM_CATEGORY: /^\d{4}$/,
    ITEM_STOCK: /^\d{1,6}$/,
    ITEM_PRICE: /^[\d.]{1,7}$/,
    ITEM_IMAGE: /^https:\/\/.*$/
}

export const ONINPUT = {
    U_PRENOM: /[^a-zA-ZàèéùÀÈÉÙ'-\s]/g,
    U_NOM: /[^a-zA-ZàèéùÀÈÉÙ'-\s]/g,
    U_EMAIL: /[^a-z0-9.@%+_-]/g,
    U_PASSWORD: /[^a-zA-Z0-9,;.?!\*\(\)]/g,
    U_CONTENT: /[^a-zA-Z0-9,?!().\"'éèêàùîôäëïöü -]/g,
    U_PHONE: /\D/g,
    U_ADRESS: /[^a-zA-Z0-9\s\-'^¨èéàù]/g,
    U_POSTAL: /\D/g,
    U_TOWN: /[^a-zA-Z\s\-'^¨èéàù]/g,

    I_NAME: /[^a-zA-ZàèéùÀÈÉÙ'-\s]/g,
    I_WIDTH: /[^0-9.]/g,
    I_COLOR: /[^a-zA-ZàèéùÀÈÉÙ'()-\s]/g,
    I_CONTENT: /[^a-zA-ZàèéùÀÈÉÙ'()-\s,]/g,
    I_DETAILS: /[^a-zA-ZàèéùÀÈÉÙ'()-\s,]/g,
    I_CATEGORY: /\D/g,
    I_STOCK: /\D/g,
    I_PRICE: /[^0-9.]/g

}

export const PATTERN = {
    PRENOM: "^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$",
    NOM: "^[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$",
    EMAIL: "^[a-zA-Z0-9._%+-]{1,50}@[a-zA-Z0-9.-]{2,30}\\.[a-zA-Z]{2,4}$",
    PASSWORD: "^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!\*\(\)]))[\w\d,;.?!\*\(\)]{8,40}$",
    PHONE: "^\d{10}$",
    ADRESS: "[a-zA-Z0-9\s\-'^¨èéàù]{8,70}",
    POSTAL: "^\d{5}$",
    TOWN: "^[a-zA-Z\s\-'^¨èéàù]{2,50}$",
    CONTENT: "^[a-zA-Z0-9,?!().\"'éèêàùîôäëïöü -]+$",

    ITEM_NAME: "^[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$",
    ITEM_WIDTH: "^[\\d.]{1,6}$",
    ITEM_COLOR: "^[a-zA-ZàèéùÀÈÉÙ'()-\s]{2,30}$",
    ITEM_CONTENT: "^[a-zA-ZàèéùÀÈÉÙ'()-\s,]{2,60}$",
    ITEM_DETAIL: "^[a-zA-ZàèéùÀÈÉÙ'()-\s,]{2,60}$",
    ITEM_CATEGORY: "^\d{4}$",
    ITEM_STOCK: "^\d{1,6}$",
    ITEM_PRICE: "^[\d,]{1,7}$",
    ITEM_IMAGE: "^https:\/\/.*$"
}