/**
 * @author Fedoseev V.V.
 * @link https://github.com/mrAndersons
 * @copyright Copyright mrAndersons (c) 2018
 */

 /**
  * Примеры:
  *     - RoundFloat(2.45)          - округление до целого числа
  *     - RoundFloat(2.45678, 2)    - округление до сотых
  *     - RoundFloat(2.45678, 2, 3) - округление до сотых, начиная с 3го симвала после запятой(специфичность округления в JS)
  */

/**
 * Округление с плавающей точкой
 *
 * @param {int|float} value   Значение
 * @param {int}       decimal Количество символов после запятой
 * @param {int}       start   Стартовое количество знаков округления (по умолчанию 10)
 *
 * @return {number}
 * @constructor
 */
var RoundFloat = function(value, decimal, start) {
    // если нет значения, то результат 0
    if (!value || isNaN(value) || typeof value == 'undefined') {
        return 0;
    }

    // если не указано количество знаков после запятой, то округляем до целого
    if (!decimal || isNaN(decimal) || typeof decimal == 'undefined') {
        return RoundFloat(val, 0, 0);
    }

    // если количесво знаков имеет отрицательное значение, то по модулю
    if (decimal <= 0) {
        decimal = Math.abs(decimal);
    }

    // если не указано с какой позиции начинать округление, то по дефолту - 10 знаков
    if ((!start && start != 0) || isNaN(start) || typeof start == 'undefined' || start <= 0) {
        start = 10;
    }

    // если количество символов превышает стартовое, то приравниваем значение
    if (start && decimal > start) {
        start = decimal;
    }

    var d = decimal;
    if (start && start > 0) {
        d = start;
    }

    var numberFloat = Number( Math.round( value + 'e' + d ) + 'e-' + d );

    // если количество символов не равно количеству символов текущей обработки, то следующая иттерация
    if (d != decimal) {
        --d;
        return RoundFloat(numberFloat, decimal, d);
    }

    return numberFloat;
};