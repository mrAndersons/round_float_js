/**
 * @author Fedoseev V.V.
 * @link https://github.com/mrAndersons
 * @copyright Copyright mrAndersons (c) 2018
 */

/**
 * Примеры:
 *     - RoundFloat(2.45)           = 3     - округление до целого числа
 *     - RoundFloat(3, 2)           = 3.00  - округление до целого числа с дополненными нулями
 *     - RoundFloat(2.45678, 2)     = 2.46  - округление до сотых
 */

/**
 * Округление с плавающей точкой
 *
 * @param {int|float} value   Значение
 * @param {int}       decimal Количество символов после запятой
 *
 * @return {string}
 * @constructor
 */
var RoundFloat = function (value, decimal) {
    this.value = value || 0;
    this.decimal = decimal || 0;
    this.noRender = false;
    this.count = 0;
    this.parser = '.';
    this.minus = value < 0 ? true : false;

    // если количесво знаков имеет отрицательное значение, то по модулю
    if (this.decimal <= 0) this.decimal = Math.abs(this.decimal);

    /**
     * Проверка на пустоту
     * @param val
     * @return {boolean}
     */
    this.isEmpty = function (val) {
        return (
          (val != 0) &&
          (!val || isNaN(val) || typeof val == 'undefined' || val.length == 0)
        );
    };
    /**
     * Парсинг значения
     * @param val
     * @return {Array}
     */
    this.parse = function (val) {
        var self = this;

        val = ('' + val);
        val = val.toString();

        return val.split(self.parser);
    };
    /**
     * Округление
     * @param v
     * @param d
     * @return {number}
     */
    this.round = function (v, d) {
        return Number(Math.round(v + 'e' + d) + 'e-' + d);
    };
    /**
     * Вывод результата
     * @param v
     * @param d
     * @return {string}
     */
    this.render = function (v, d) {
        var self = this;

        // возвращает не модифицированное значение
        if (self.noRender) {
            return v;
        }

        var render = [];
        var dCountSimbol = 0;

        if (self.isEmpty(v)) {
            render[0] = '0';
            if (d > 0) {
                dCountSimbol = d;
                render[1] = '';
            }
        }

        var vParse = self.parse(v);

        if (!vParse) {
            render[0] = '0';
            if (d > 0) {
                dCountSimbol = d;
                render[1] = '';
            }
        } else if (vParse && vParse.length == 1) {
            render[0] = ('' + vParse[0]);
            if (d > 0) {
                dCountSimbol = d;
                render[1] = '';
            }
        } else if (vParse && vParse.length == 2) {
            render[0] = ('' + vParse[0]);
            render[1] = ('' + vParse[1]);

            if (d > vParse[1].length) {
                dCountSimbol = parseInt(d) - parseInt(vParse[1].length);
            } else if (vParse[1].length > d) {
                dCountSimbol = parseInt(vParse[1].length) - parseInt(d);
            }
        }

        // дополнение нулями
        for (var i = 0; i < dCountSimbol; i++) {
            render[1] += ('' + '0');
        }

        return render.join(self.parser);
    };
    /**
     * Процесс округления
     * @param value
     * @param decimal
     * @return {string}
     */
    this.process = function (value, decimal) {
        var self = this;
        // если нет значения, то результат 0
        if (self.isEmpty(value)) {
            return self.render(0, decimal)
        }
        // если не указано количество знаков после запятой, то округляем до целого
        if (self.isEmpty(decimal)) {
            return self.process(value, 0);
        }

        if (self.decimal > self.count) {
            return self.render(value, self.decimal);
        } else {
            //var d = self.count;
            var numberFloat = self.round(value, self.count);
            if (self.count != self.decimal) {
                self.noRender = true;
                return self.process(numberFloat, --self.count);
            } else {
                self.noRender = false;
            }

            return self.render(numberFloat, decimal);
        }

        return self.process(0, decimal);
    };

    var self = this;

    var parseVal = self.parse(self.value);
    if (parseVal && parseVal.length == 2) {
        self.count = parseVal[1].length;
    }

    return self.process(self.value, self.decimal);
};