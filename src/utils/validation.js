exports.validateUser = ({
    username,
    firstName,
    lastName,
    password,
    repass,
    email,
    address,
    phoneNumber
}) => {
    if (username.length < 3 || username.includes(' ')) {
        throw ('Потребителското име трябва да съдържа поне 3 символа различни от интервал!');
    }
    if (!firstName.match(/^[А-Я][а-я]*$|^[A-Z][a-z]*$/gm)) {
        throw ('Името трябва да започва с главна буква и да се състои само от букви на кирилица или латиница!');
    }
    if (!lastName.match(/^[А-Я][а-я]*$|^[A-Z][a-z]*$/gm)) {
        throw ('Фамилията трябва да започва с главна буква и да се състои само от букви на кирилица или латиница!');
    }
    if (password.length < 6 || password.includes(' ')) {
        throw ('Паролата трябва да съдържа поне 6 символа различни от интервал!');
    }
    if (password != repass) {
        throw ('Паролите не съвпадат!');
    }
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm)) {
        throw ('Невалиден имейл адрес!');
    }
    if (address == '') {
        throw ('Адресът е задължителен!');
    }
    if (phoneNumber == '') {
        throw ('Телефонният номер е задължителен!');
    }
}

exports.validateWatch = ({
    title,
    brand,
    model,
    imageUrl,
    price,
    oldPrice,
    type,
    movement,
    glass,
    waterResistance,
    diameter,
    bodyMaterial,
    strapMaterial,
    warrantyInYears,
    quantity,
    description
}) => {
    const types = ['Мъжки', 'Дамски'];

    if (title == '') {
        throw 'Заглавието е задължително!';
    }
    if (brand == '') {
        throw 'Марката е задължителна!';
    }
    if (model == '') {
        throw 'Моделът е задължителен!';
    }
    if (!imageUrl.match(/https*:\/\/.*/g)) {
        throw 'Невалиден линк към снимка!';
    }
    if (typeof price !== 'number' || price < 0) {
        throw 'Цената е задължителна и трябва да бъде положително число!';
    }
    if (!types.includes(type)) {
        throw 'Типът може да бъде "Мъжки" или "Дамски"!';
    }
    if (movement == '') {
        throw 'Видът механизъм е задължителен!';
    }
    if (glass == '') {
        throw 'Видът стъкло е задължителен!';
    }
    if (waterResistance == '') {
        throw 'Водоустойчивостта е задължителна!';
    }
    if (movement == '') {
        throw 'Видът механизъм е задължителен!';
    }
    if (diameter == '') {
        throw 'Диаметърът е задължителен!';
    }
    if (bodyMaterial == '') {
        throw 'Материалът на корпуса е задължителен!';
    }
    if (strapMaterial == '') {
        throw 'Материалът на каишката/верижката е задължителен!';
    }
    if (!warrantyInYears.match(/^[1-9][0-9]*$/g)) {
        throw 'Гаранцията е задължителна и трябва да бъде положително число!';
    }
    if (typeof quantity !== 'number' || quantity < 0) {
        throw 'Количеството е задължително и трябва да бъде положително число!';
    }
    if (typeof description !== 'object') {
        throw 'Описанието трябва да е масив!';
    }
}