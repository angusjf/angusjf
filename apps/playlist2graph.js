(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.dz.bE === region.d1.bE)
	{
		return 'on line ' + region.dz.bE;
	}
	return 'on lines ' + region.dz.bE + ' through ' + region.d1.bE;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.fC,
		impl.gf,
		impl.f3,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		az: func(record.az),
		dA: record.dA,
		di: record.di
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.az;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.dA;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.di) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.fC,
		impl.gf,
		impl.f3,
		function(sendToApp, initialModel) {
			var view = impl.gh;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.fC,
		impl.gf,
		impl.f3,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.ds && impl.ds(sendToApp)
			var view = impl.gh;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.fh);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.f7) && (_VirtualDom_doc.title = title = doc.f7);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.fO;
	var onUrlRequest = impl.fP;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		ds: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.eH === next.eH
							&& curr.ea === next.ea
							&& curr.eC.a === next.eC.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		fC: function(flags)
		{
			return A3(impl.fC, flags, _Browser_getUrl(), key);
		},
		gh: impl.gh,
		gf: impl.gf,
		f3: impl.f3
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { fA: 'hidden', fk: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { fA: 'mozHidden', fk: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { fA: 'msHidden', fk: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { fA: 'webkitHidden', fk: 'webkitvisibilitychange' }
		: { fA: 'hidden', fk: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		eS: _Browser_getScene(),
		e4: {
			aJ: _Browser_window.pageXOffset,
			aK: _Browser_window.pageYOffset,
			e9: _Browser_doc.documentElement.clientWidth,
			d9: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		e9: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		d9: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			eS: {
				e9: node.scrollWidth,
				d9: node.scrollHeight
			},
			e4: {
				aJ: node.scrollLeft,
				aK: node.scrollTop,
				e9: node.clientWidth,
				d9: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			eS: _Browser_getScene(),
			e4: {
				aJ: x,
				aK: y,
				e9: _Browser_doc.documentElement.clientWidth,
				d9: _Browser_doc.documentElement.clientHeight
			},
			fu: {
				aJ: x + rect.left,
				aK: y + rect.top,
				e9: rect.width,
				d9: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}


// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.fw.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.fw.b, xhr)); });
		$elm$core$Maybe$isJust(request.ge) && _Http_track(router, xhr, request.ge.a);

		try {
			xhr.open(request.fK, request.gg, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.gg));
		}

		_Http_configureRequest(xhr, request);

		request.fh.a && xhr.setRequestHeader('Content-Type', request.fh.a);
		xhr.send(request.fh.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.fy; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.f6.a || 0;
	xhr.responseType = request.fw.d;
	xhr.withCredentials = request.fe;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		gg: xhr.responseURL,
		f0: xhr.status,
		f1: xhr.statusText,
		fy: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			f$: event.loaded,
			eW: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			fU: event.loaded,
			eW: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}


var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.r) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.u),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.u);
		} else {
			var treeLen = builder.r * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.v) : builder.v;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.r);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.u) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.u);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{v: nodeList, r: (len / $elm$core$Array$branchFactor) | 0, u: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {d7: fragment, ea: host, cd: path, eC: port_, eH: protocol, eI: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $author$project$Main$ChoosePlaylist = function (a) {
	return {$: 7, a: a};
};
var $author$project$Main$Start = {$: 6};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$url$Url$Parser$Internal$Parser = $elm$core$Basics$identity;
var $elm$url$Url$Parser$Query$map2 = F3(
	function (func, _v0, _v1) {
		var a = _v0;
		var b = _v1;
		return function (dict) {
			return A2(
				func,
				a(dict),
				b(dict));
		};
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {aQ: frag, aU: params, aH: unvisited, ao: value, a$: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.aH;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.ao);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.ao);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 1) {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 1) {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 1) {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.cd),
					$elm$url$Url$Parser$prepareQuery(url.eI),
					url.d7,
					$elm$core$Basics$identity)));
	});
var $elm$url$Url$Parser$Parser = $elm$core$Basics$identity;
var $elm$url$Url$Parser$query = function (_v0) {
	var queryParser = _v0;
	return function (_v1) {
		var visited = _v1.a$;
		var unvisited = _v1.aH;
		var params = _v1.aU;
		var frag = _v1.aQ;
		var value = _v1.ao;
		return _List_fromArray(
			[
				A5(
				$elm$url$Url$Parser$State,
				visited,
				unvisited,
				params,
				frag,
				value(
					queryParser(params)))
			]);
	};
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0;
		var parseAfter = _v1;
		return function (state) {
			return A2(
				$elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var $elm$url$Url$Parser$questionMark = F2(
	function (parser, queryParser) {
		return A2(
			$elm$url$Url$Parser$slash,
			parser,
			$elm$url$Url$Parser$query(queryParser));
	});
var $elm$url$Url$Parser$s = function (str) {
	return function (_v0) {
		var visited = _v0.a$;
		var unvisited = _v0.aH;
		var params = _v0.aU;
		var frag = _v0.aQ;
		var value = _v0.ao;
		if (!unvisited.b) {
			return _List_Nil;
		} else {
			var next = unvisited.a;
			var rest = unvisited.b;
			return _Utils_eq(next, str) ? _List_fromArray(
				[
					A5(
					$elm$url$Url$Parser$State,
					A2($elm$core$List$cons, next, visited),
					rest,
					params,
					frag,
					value)
				]) : _List_Nil;
		}
	};
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $elm$url$Url$Parser$Query$custom = F2(
	function (key, func) {
		return function (dict) {
			return func(
				A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					A2($elm$core$Dict$get, key, dict)));
		};
	});
var $elm$url$Url$Parser$Query$string = function (key) {
	return A2(
		$elm$url$Url$Parser$Query$custom,
		key,
		function (stringList) {
			if (stringList.b && (!stringList.b.b)) {
				var str = stringList.a;
				return $elm$core$Maybe$Just(str);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		});
};
var $author$project$Main$tokens = function (url) {
	var _v0 = A2(
		$elm$url$Url$Parser$parse,
		A2(
			$elm$url$Url$Parser$slash,
			$elm$url$Url$Parser$s('apps'),
			A2(
				$elm$url$Url$Parser$questionMark,
				$elm$url$Url$Parser$s('playlist2graph.html'),
				A3(
					$elm$url$Url$Parser$Query$map2,
					$elm$core$Tuple$pair,
					$elm$url$Url$Parser$Query$string('access_token'),
					$elm$url$Url$Parser$Query$string('refresh_token')))),
		url);
	if (((!_v0.$) && (!_v0.a.a.$)) && (!_v0.a.b.$)) {
		var _v1 = _v0.a;
		var a = _v1.a.a;
		var r = _v1.b.a;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(a, r));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Main$init = F3(
	function (old, url, _v0) {
		var model = function () {
			var _v2 = $author$project$Main$tokens(url);
			if (!_v2.$) {
				var _v3 = _v2.a;
				var access = _v3.a;
				var refresh = _v3.b;
				return {
					m: access,
					ca: old,
					s: A2(
						$elm$core$Maybe$withDefault,
						'',
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.s;
							},
							old)),
					ac: refresh,
					e: $author$project$Main$Start
				};
			} else {
				return {
					m: A2(
						$elm$core$Maybe$withDefault,
						'',
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.m;
							},
							old)),
					ca: old,
					s: A2(
						$elm$core$Maybe$withDefault,
						'',
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.s;
							},
							old)),
					ac: A2(
						$elm$core$Maybe$withDefault,
						'',
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.ac;
							},
							old)),
					e: $author$project$Main$Start
				};
			}
		}();
		return _Utils_Tuple2(
			function () {
				var _v1 = _Utils_Tuple2(model.m, model.ac);
				if ((_v1.a === '') && (_v1.b === '')) {
					return model;
				} else {
					return _Utils_update(
						model,
						{
							e: $author$project$Main$ChoosePlaylist('')
						});
				}
			}(),
			$elm$core$Platform$Cmd$none);
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $author$project$Main$UrlChange = {$: 3};
var $author$project$Main$onUrlChange = function (_v0) {
	return $author$project$Main$UrlChange;
};
var $author$project$Main$UrlRequest = {$: 4};
var $author$project$Main$onUrlRequest = function (_v0) {
	return $author$project$Main$UrlRequest;
};
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Main$Tick = {$: 5};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 0, a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {c1: oldTime, eM: request, eZ: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$browser$Browser$AnimationManager$now = _Browser_now(0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(0);
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var request = _v0.eM;
		var oldTime = _v0.c1;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 1) {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var subs = _v0.eZ;
		var oldTime = _v0.c1;
		var send = function (sub) {
			if (!sub.$) {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (!sub.$) {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrame = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Time(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrame = $elm$browser$Browser$AnimationManager$onAnimationFrame;
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$browser$Browser$Events$onAnimationFrame(
		$elm$core$Basics$always($author$project$Main$Tick));
};
var $author$project$Main$Completed = function (a) {
	return {$: 3, a: a};
};
var $author$project$Main$FetchingArtistData = function (a) {
	return {$: 1, a: a};
};
var $author$project$Main$FetchingPlaylistData = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$FetchingRelatedArtists = function (a) {
	return {$: 2, a: a};
};
var $author$project$Main$GotArtistData = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Main$GotPlaylistData = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$GotRelatedArtistsData = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var $author$project$Main$HttpError = function (a) {
	return {$: 4, a: a};
};
var $author$project$Main$OtherError = function (a) {
	return {$: 5, a: a};
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Main$badMsg = $author$project$Main$OtherError('Bad Msg');
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $author$project$Spotify$Artist = F4(
	function (id, name, imgUrl, genres) {
		return {d8: genres, ax: id, ee: imgUrl, ew: name};
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map4 = _Json_map4;
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$Spotify$artistDecoder = A5(
	$elm$json$Json$Decode$map4,
	$author$project$Spotify$Artist,
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'images',
		A2(
			$elm$json$Json$Decode$map,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					$elm$core$Maybe$map($elm$core$Tuple$second),
					$elm$core$List$head),
				$elm$core$List$sortBy(
					function (_v0) {
						var height = _v0.a;
						return height;
					})),
			$elm$json$Json$Decode$list(
				A3(
					$elm$json$Json$Decode$map2,
					$elm$core$Tuple$pair,
					A2($elm$json$Json$Decode$field, 'height', $elm$json$Json$Decode$int),
					A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string))))),
	A2(
		$elm$json$Json$Decode$field,
		'genres',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 2};
var $elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$Timeout_ = {$: 1};
var $elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 4, a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$NetworkError = {$: 2};
var $elm$http$Http$Timeout = {$: 1};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 0:
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 1:
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 2:
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 3:
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.f0));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$http$Http$header = $elm$http$Http$Header;
var $elm$http$Http$Request = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {eL: reqs, eZ: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (!cmd.$) {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 1) {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.ge;
							if (_v4.$ === 1) {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.eL));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.eZ)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (!cmd.$) {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					fe: r.fe,
					fh: r.fh,
					fw: A2(_Http_mapExpect, func, r.fw),
					fy: r.fy,
					fK: r.fK,
					f6: r.f6,
					ge: r.ge,
					gg: r.gg
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{fe: false, fh: r.fh, fw: r.fw, fy: r.fy, fK: r.fK, f6: r.f6, ge: r.ge, gg: r.gg}));
};
var $author$project$Spotify$getRequest = function (_v0) {
	var accessToken = _v0.m;
	var path = _v0.cd;
	var toMsg = _v0.aX;
	var decoder = _v0.b2;
	return $elm$http$Http$request(
		{
			fh: $elm$http$Http$emptyBody,
			fw: A2($elm$http$Http$expectJson, toMsg, decoder),
			fy: _List_fromArray(
				[
					A2($elm$http$Http$header, 'Accept', 'application/json'),
					A2($elm$http$Http$header, 'Content-Type', 'application/json'),
					A2($elm$http$Http$header, 'Authorization', 'Bearer ' + accessToken)
				]),
			fK: 'GET',
			f6: $elm$core$Maybe$Nothing,
			ge: $elm$core$Maybe$Nothing,
			gg: 'https://api.spotify.com/v1/' + path
		});
};
var $author$project$Spotify$fetchArtistsData = function (_v0) {
	var artistIds = _v0.a3;
	var accessToken = _v0.m;
	var toMsg = _v0.aX;
	return $author$project$Spotify$getRequest(
		{
			m: accessToken,
			b2: A2(
				$elm$json$Json$Decode$field,
				'artists',
				$elm$json$Json$Decode$list($author$project$Spotify$artistDecoder)),
			cd: 'artists?ids=' + A2($elm$core$String$join, ',', artistIds),
			aX: toMsg
		});
};
var $author$project$Spotify$Playlist = function (items) {
	return {ek: items};
};
var $author$project$Spotify$Item = function (artistIds) {
	return {a3: artistIds};
};
var $author$project$Spotify$itemDecoder = A2(
	$elm$json$Json$Decode$field,
	'track',
	A2(
		$elm$json$Json$Decode$map,
		$author$project$Spotify$Item,
		A2(
			$elm$json$Json$Decode$field,
			'artists',
			$elm$json$Json$Decode$list(
				A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string)))));
var $author$project$Spotify$playlistDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$Spotify$Playlist,
	A2(
		$elm$json$Json$Decode$field,
		'items',
		$elm$json$Json$Decode$list($author$project$Spotify$itemDecoder)));
var $author$project$Spotify$playlistsArtists = function (playlist) {
	return A2(
		$elm$core$List$concatMap,
		function ($) {
			return $.a3;
		},
		playlist.ek);
};
var $author$project$Spotify$fetchPlaylistData = function (_v0) {
	var playlistId = _v0.s;
	var accessToken = _v0.m;
	var toMsg = _v0.aX;
	var offset = _v0.c0;
	return $author$project$Spotify$getRequest(
		{
			m: accessToken,
			b2: A2($elm$json$Json$Decode$map, $author$project$Spotify$playlistsArtists, $author$project$Spotify$playlistDecoder),
			cd: 'playlists/' + (playlistId + ('/tracks?offset=' + $elm$core$String$fromInt(offset))),
			aX: toMsg
		});
};
var $author$project$Spotify$fetchRelatedArtists = function (_v0) {
	var accessToken = _v0.m;
	var toMsg = _v0.aX;
	var id = _v0.ax;
	return $author$project$Spotify$getRequest(
		{
			m: accessToken,
			b2: A2(
				$elm$json$Json$Decode$map,
				$elm$core$List$map(
					function ($) {
						return $.ax;
					}),
				A2(
					$elm$json$Json$Decode$field,
					'artists',
					$elm$json$Json$Decode$list($author$project$Spotify$artistDecoder))),
			cd: 'artists/' + (id + '/related-artists'),
			aX: toMsg
		});
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Main$fourtyNine = 49;
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$url$Url$Builder$toQueryPair = function (_v0) {
	var key = _v0.a;
	var value = _v0.b;
	return key + ('=' + value);
};
var $elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			$elm$core$String$join,
			'&',
			A2($elm$core$List$map, $elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var $elm$url$Url$Builder$crossOrigin = F3(
	function (prePath, pathSegments, parameters) {
		return prePath + ('/' + (A2($elm$core$String$join, '/', pathSegments) + $elm$url$Url$Builder$toQuery(parameters)));
	});
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$url$Url$Builder$QueryParameter = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $elm$url$Url$Builder$string = F2(
	function (key, value) {
		return A2(
			$elm$url$Url$Builder$QueryParameter,
			$elm$url$Url$percentEncode(key),
			$elm$url$Url$percentEncode(value));
	});
var $author$project$Main$getToken = function () {
	var state = 'OnBrowserNavigationLoad';
	var scope = 'user-read-private user-read-email';
	var redirectUri = 'https://c2d5zl3brn4hov5v5kecbep7dq0btyil.lambda-url.eu-west-2.on.aws';
	var clientId = 'f715b26ca7b949cf845e35284242fadc';
	return $elm$browser$Browser$Navigation$load(
		A3(
			$elm$url$Url$Builder$crossOrigin,
			'https://accounts.spotify.com',
			_List_fromArray(
				['authorize']),
			_List_fromArray(
				[
					A2($elm$url$Url$Builder$string, 'response_type', 'code'),
					A2($elm$url$Url$Builder$string, 'client_id', clientId),
					A2($elm$url$Url$Builder$string, 'scope', scope),
					A2($elm$url$Url$Builder$string, 'redirect_uri', redirectUri),
					A2($elm$url$Url$Builder$string, 'state', state)
				])));
}();
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$Vis$toHex = function (c) {
	var _v0 = A2(
		$elm$core$Basics$modBy,
		16,
		$elm$core$Char$toCode(c));
	switch (_v0) {
		case 15:
			return 'f';
		case 14:
			return 'e';
		case 13:
			return 'd';
		case 12:
			return 'c';
		case 11:
			return 'b';
		case 10:
			return 'a';
		default:
			var n = _v0;
			return $elm$core$String$fromInt(n);
	}
};
var $author$project$Vis$toHexDigits = function (str) {
	var _v0 = $elm$core$String$uncons(str);
	if (!_v0.$) {
		var _v1 = _v0.a;
		var x = _v1.a;
		var xs = _v1.b;
		var _v2 = $elm$core$String$uncons(xs);
		if (!_v2.$) {
			var _v3 = _v2.a;
			var y = _v3.a;
			return _Utils_ap(
				$author$project$Vis$toHex(x),
				$author$project$Vis$toHex(y));
		} else {
			return '88';
		}
	} else {
		return '88';
	}
};
var $author$project$Vis$genreToHexCode = function (genre) {
	return '#' + function () {
		if (!genre.b) {
			return '888888';
		} else {
			if (!genre.b.b) {
				var red = genre.a;
				return $author$project$Vis$toHexDigits(red) + 'ffff';
			} else {
				if (!genre.b.b.b) {
					var red = genre.a;
					var _v1 = genre.b;
					var green = _v1.a;
					return $author$project$Vis$toHexDigits(red) + ($author$project$Vis$toHexDigits(green) + 'ff');
				} else {
					var red = genre.a;
					var _v2 = genre.b;
					var green = _v2.a;
					var _v3 = _v2.b;
					var blue = _v3.a;
					return _Utils_ap(
						$author$project$Vis$toHexDigits(red),
						_Utils_ap(
							$author$project$Vis$toHexDigits(green),
							$author$project$Vis$toHexDigits(blue)));
				}
			}
		}
	}();
};
var $author$project$Vis$asEntity = F3(
	function (x, y, artist) {
		return {
			br: $author$project$Vis$genreToHexCode(artist.d8),
			d8: artist.d8,
			ax: artist.ax,
			ee: artist.ee,
			ew: artist.ew,
			e5: 0,
			e6: 0,
			aJ: x,
			aK: y
		};
	});
var $gampleman$elm_visualization$Force$Center = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $gampleman$elm_visualization$Force$center = $gampleman$elm_visualization$Force$Center;
var $gampleman$elm_visualization$Force$Collision = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $gampleman$elm_visualization$Force$collision = function (radius) {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$List$map(
			function (item) {
				return _Utils_Tuple2(item, radius);
			}),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Dict$fromList,
			A2($gampleman$elm_visualization$Force$Collision, 1, 1)));
};
var $gampleman$elm_visualization$Force$isCompleted = function (_v0) {
	var alpha = _v0.a2;
	var minAlpha = _v0.cX;
	return _Utils_cmp(alpha, minAlpha) < 1;
};
var $gampleman$elm_visualization$Force$State = $elm$core$Basics$identity;
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $gampleman$elm_visualization$Force$nTimes = F3(
	function (fn, times, input) {
		nTimes:
		while (true) {
			if (times <= 0) {
				return input;
			} else {
				var $temp$fn = fn,
					$temp$times = times - 1,
					$temp$input = fn(input);
				fn = $temp$fn;
				times = $temp$times;
				input = $temp$input;
				continue nTimes;
			}
		}
	});
var $elm$core$Basics$pow = _Basics_pow;
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === -2) {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_v0.$) {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $gampleman$elm_visualization$Force$Collision$arrayUpdate = F3(
	function (index, fn, arr) {
		var _v0 = A2($elm$core$Array$get, index, arr);
		if (!_v0.$) {
			var v = _v0.a;
			return A3(
				$elm$core$Array$set,
				index,
				fn(v),
				arr);
		} else {
			return arr;
		}
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Vector2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Vector2d$at = F2(
	function (_v0, _v1) {
		var rate = _v0;
		var v = _v1;
		return {aJ: rate * v.aJ, aK: rate * v.aK};
	});
var $ianmackenzie$elm_geometry$Circle2d$centerPoint = function (_v0) {
	var properties = _v0;
	return properties.fj;
};
var $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$lessThanOrEqualTo = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) < 1;
	});
var $ianmackenzie$elm_units$Quantity$Quantity = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$max = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return A2($elm$core$Basics$max, x, y);
	});
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $ianmackenzie$elm_units$Quantity$min = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return A2($elm$core$Basics$min, x, y);
	});
var $ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema = function (given) {
	return (A2($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, given.bF, given.bH) && A2($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, given.bG, given.bI)) ? given : {
		bF: A2($ianmackenzie$elm_units$Quantity$max, given.bH, given.bF),
		bG: A2($ianmackenzie$elm_units$Quantity$max, given.bI, given.bG),
		bH: A2($ianmackenzie$elm_units$Quantity$min, given.bH, given.bF),
		bI: A2($ianmackenzie$elm_units$Quantity$min, given.bI, given.bG)
	};
};
var $ianmackenzie$elm_units$Quantity$minus = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return x - y;
	});
var $ianmackenzie$elm_units$Quantity$plus = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return x + y;
	});
var $ianmackenzie$elm_geometry$Circle2d$radius = function (_v0) {
	var properties = _v0;
	return properties.eJ;
};
var $ianmackenzie$elm_geometry$Point2d$xCoordinate = function (_v0) {
	var p = _v0;
	return p.aJ;
};
var $ianmackenzie$elm_geometry$Point2d$yCoordinate = function (_v0) {
	var p = _v0;
	return p.aK;
};
var $ianmackenzie$elm_geometry$Circle2d$boundingBox = function (circle) {
	return $ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
		{
			bF: A2(
				$ianmackenzie$elm_units$Quantity$plus,
				$ianmackenzie$elm_geometry$Circle2d$radius(circle),
				$ianmackenzie$elm_geometry$Point2d$xCoordinate(
					$ianmackenzie$elm_geometry$Circle2d$centerPoint(circle))),
			bG: A2(
				$ianmackenzie$elm_units$Quantity$plus,
				$ianmackenzie$elm_geometry$Circle2d$radius(circle),
				$ianmackenzie$elm_geometry$Point2d$yCoordinate(
					$ianmackenzie$elm_geometry$Circle2d$centerPoint(circle))),
			bH: A2(
				$ianmackenzie$elm_units$Quantity$minus,
				$ianmackenzie$elm_geometry$Circle2d$radius(circle),
				$ianmackenzie$elm_geometry$Point2d$xCoordinate(
					$ianmackenzie$elm_geometry$Circle2d$centerPoint(circle))),
			bI: A2(
				$ianmackenzie$elm_units$Quantity$minus,
				$ianmackenzie$elm_geometry$Circle2d$radius(circle),
				$ianmackenzie$elm_geometry$Point2d$yCoordinate(
					$ianmackenzie$elm_geometry$Circle2d$centerPoint(circle)))
		});
};
var $ianmackenzie$elm_geometry$Vector2d$from = F2(
	function (_v0, _v1) {
		var p1 = _v0;
		var p2 = _v1;
		return {aJ: p2.aJ - p1.aJ, aK: p2.aK - p1.aK};
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $ianmackenzie$elm_units$Quantity$zero = 0;
var $ianmackenzie$elm_geometry$Vector2d$length = function (_v0) {
	var v = _v0;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.aJ),
		$elm$core$Basics$abs(v.aK));
	if (!largestComponent) {
		return $ianmackenzie$elm_units$Quantity$zero;
	} else {
		var scaledY = v.aK / largestComponent;
		var scaledX = v.aJ / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt((scaledX * scaledX) + (scaledY * scaledY));
		return scaledLength * largestComponent;
	}
};
var $ianmackenzie$elm_units$Quantity$lessThan = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) < 0;
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$lessThan = $ianmackenzie$elm_units$Quantity$lessThan;
var $ianmackenzie$elm_units_prefixed$Units$Quantity$minus = $ianmackenzie$elm_units$Quantity$minus;
var $ianmackenzie$elm_geometry$Vector2d$minus = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {aJ: v1.aJ - v2.aJ, aK: v1.aK - v2.aK};
	});
var $ianmackenzie$elm_units$Quantity$multiplyBy = F2(
	function (scale, _v0) {
		var value = _v0;
		return scale * value;
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$multiplyBy = $ianmackenzie$elm_units$Quantity$multiplyBy;
var $ianmackenzie$elm_units$Quantity$per = F2(
	function (_v0, _v1) {
		var independentValue = _v0;
		var dependentValue = _v1;
		return dependentValue / independentValue;
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$per = $ianmackenzie$elm_units$Quantity$per;
var $ianmackenzie$elm_units_prefixed$Units$Quantity$plus = $ianmackenzie$elm_units$Quantity$plus;
var $ianmackenzie$elm_geometry$Vector2d$plus = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {aJ: v1.aJ + v2.aJ, aK: v1.aK + v2.aK};
	});
var $ianmackenzie$elm_units$Quantity$ratio = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return x / y;
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$ratio = $ianmackenzie$elm_units$Quantity$ratio;
var $ianmackenzie$elm_geometry$Vector2d$scaleBy = F2(
	function (k, _v0) {
		var v = _v0;
		return {aJ: k * v.aJ, aK: k * v.aK};
	});
var $ianmackenzie$elm_units$Quantity$greaterThan = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) > 0;
	});
var $ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) > -1;
	});
var $ianmackenzie$elm_geometry$BoundingBox2d$maxX = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.bF;
};
var $ianmackenzie$elm_geometry$BoundingBox2d$maxY = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.bG;
};
var $ianmackenzie$elm_geometry$BoundingBox2d$minX = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.bH;
};
var $ianmackenzie$elm_geometry$BoundingBox2d$minY = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.bI;
};
var $ianmackenzie$elm_units$Quantity$squared = function (_v0) {
	var value = _v0;
	return value * value;
};
var $ianmackenzie$elm_geometry$BoundingBox2d$separatedByAtLeast = F3(
	function (tolerance, firstBox, secondBox) {
		var ySeparation = A2(
			$ianmackenzie$elm_units$Quantity$minus,
			A2(
				$ianmackenzie$elm_units$Quantity$min,
				$ianmackenzie$elm_geometry$BoundingBox2d$maxY(firstBox),
				$ianmackenzie$elm_geometry$BoundingBox2d$maxY(secondBox)),
			A2(
				$ianmackenzie$elm_units$Quantity$max,
				$ianmackenzie$elm_geometry$BoundingBox2d$minY(firstBox),
				$ianmackenzie$elm_geometry$BoundingBox2d$minY(secondBox)));
		var xSeparation = A2(
			$ianmackenzie$elm_units$Quantity$minus,
			A2(
				$ianmackenzie$elm_units$Quantity$min,
				$ianmackenzie$elm_geometry$BoundingBox2d$maxX(firstBox),
				$ianmackenzie$elm_geometry$BoundingBox2d$maxX(secondBox)),
			A2(
				$ianmackenzie$elm_units$Quantity$max,
				$ianmackenzie$elm_geometry$BoundingBox2d$minX(firstBox),
				$ianmackenzie$elm_geometry$BoundingBox2d$minX(secondBox)));
		var clampedTolerance = A2($ianmackenzie$elm_units$Quantity$max, tolerance, $ianmackenzie$elm_units$Quantity$zero);
		return (A2($ianmackenzie$elm_units$Quantity$greaterThan, $ianmackenzie$elm_units$Quantity$zero, xSeparation) && A2($ianmackenzie$elm_units$Quantity$greaterThan, $ianmackenzie$elm_units$Quantity$zero, ySeparation)) ? A2(
			$ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo,
			$ianmackenzie$elm_units$Quantity$squared(clampedTolerance),
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				$ianmackenzie$elm_units$Quantity$squared(ySeparation),
				$ianmackenzie$elm_units$Quantity$squared(xSeparation))) : (A2($ianmackenzie$elm_units$Quantity$greaterThan, $ianmackenzie$elm_units$Quantity$zero, xSeparation) ? A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, clampedTolerance, xSeparation) : (A2($ianmackenzie$elm_units$Quantity$greaterThan, $ianmackenzie$elm_units$Quantity$zero, ySeparation) ? A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, clampedTolerance, ySeparation) : ((_Utils_eq(xSeparation, $ianmackenzie$elm_units$Quantity$zero) || _Utils_eq(ySeparation, $ianmackenzie$elm_units$Quantity$zero)) ? _Utils_eq(clampedTolerance, $ianmackenzie$elm_units$Quantity$zero) : false)));
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$squared = $ianmackenzie$elm_units$Quantity$squared;
var $ianmackenzie$elm_geometry$Geometry$Types$Point2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Point2d$translateBy = F2(
	function (_v0, _v1) {
		var v = _v0;
		var p = _v1;
		return {aJ: p.aJ + v.aJ, aK: p.aK + v.aK};
	});
var $gampleman$elm_visualization$Force$Collision$updateVelocity = F2(
	function (fn, vert) {
		return _Utils_update(
			vert,
			{
				a_: fn(vert.a_)
			});
	});
var $gampleman$elm_visualization$Force$Collision$applyForce = F4(
	function (strength, qtree, velocities, node) {
		applyForce:
		while (true) {
			switch (qtree.$) {
				case 0:
					return velocities;
				case 1:
					var leaf = qtree.a;
					var _v1 = leaf.fl;
					var head = _v1.a;
					var tail = _v1.b;
					return A3(
						$elm$core$List$foldl,
						F2(
							function (vertex, velos) {
								if (_Utils_cmp(vertex.aR, node.aR) > 0) {
									var rj = $ianmackenzie$elm_geometry$Circle2d$radius(vertex.M);
									var ri = $ianmackenzie$elm_geometry$Circle2d$radius(node.M);
									var r = A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, rj, ri);
									var nodeNextCenterPoint = A2(
										$ianmackenzie$elm_geometry$Point2d$translateBy,
										node.a_,
										$ianmackenzie$elm_geometry$Circle2d$centerPoint(node.M));
									var xy = A2(
										$ianmackenzie$elm_geometry$Vector2d$from,
										$ianmackenzie$elm_geometry$Circle2d$centerPoint(vertex.M),
										nodeNextCenterPoint);
									var l = $ianmackenzie$elm_geometry$Vector2d$length(xy);
									if (A2($ianmackenzie$elm_units_prefixed$Units$Quantity$lessThan, r, l)) {
										var rp = A2(
											$ianmackenzie$elm_units_prefixed$Units$Quantity$ratio,
											$ianmackenzie$elm_units_prefixed$Units$Quantity$squared(rj),
											A2(
												$ianmackenzie$elm_units_prefixed$Units$Quantity$plus,
												$ianmackenzie$elm_units_prefixed$Units$Quantity$squared(rj),
												$ianmackenzie$elm_units_prefixed$Units$Quantity$squared(ri)));
										var lp = A2(
											$ianmackenzie$elm_units_prefixed$Units$Quantity$multiplyBy,
											strength,
											A2(
												$ianmackenzie$elm_units_prefixed$Units$Quantity$per,
												l,
												A2($ianmackenzie$elm_units_prefixed$Units$Quantity$minus, l, r)));
										var repelantVector = A2($ianmackenzie$elm_geometry$Vector2d$at, lp, xy);
										return A3(
											$gampleman$elm_visualization$Force$Collision$arrayUpdate,
											vertex.aR,
											$gampleman$elm_visualization$Force$Collision$updateVelocity(
												$ianmackenzie$elm_geometry$Vector2d$minus(
													A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, 1 - rp, repelantVector))),
											A3(
												$gampleman$elm_visualization$Force$Collision$arrayUpdate,
												node.aR,
												$gampleman$elm_visualization$Force$Collision$updateVelocity(
													$ianmackenzie$elm_geometry$Vector2d$plus(
														A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, rp, repelantVector))),
												velos));
									} else {
										return velos;
									}
								} else {
									return velos;
								}
							}),
						velocities,
						A2($elm$core$List$cons, head, tail));
				default:
					var box = qtree.a;
					if (A3(
						$ianmackenzie$elm_geometry$BoundingBox2d$separatedByAtLeast,
						box.fd,
						box.fi,
						$ianmackenzie$elm_geometry$Circle2d$boundingBox(node.M))) {
						return velocities;
					} else {
						var $temp$strength = strength,
							$temp$qtree = box.fZ,
							$temp$velocities = A4(
							$gampleman$elm_visualization$Force$Collision$applyForce,
							strength,
							box.f4,
							A4(
								$gampleman$elm_visualization$Force$Collision$applyForce,
								strength,
								box.fL,
								A4($gampleman$elm_visualization$Force$Collision$applyForce, strength, box.fN, velocities, node),
								node),
							node),
							$temp$node = node;
						strength = $temp$strength;
						qtree = $temp$qtree;
						velocities = $temp$velocities;
						node = $temp$node;
						continue applyForce;
					}
			}
		}
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$max = $ianmackenzie$elm_units$Quantity$max;
var $ianmackenzie$elm_units$Quantity$maximum = function (quantities) {
	if (!quantities.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var first = quantities.a;
		var rest = quantities.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $ianmackenzie$elm_units$Quantity$max, first, rest));
	}
};
var $ianmackenzie$elm_units_prefixed$Units$Quantity$maximum = $ianmackenzie$elm_units$Quantity$maximum;
var $gampleman$elm_visualization$Force$Collision$nonEmptyMaximum = F2(
	function (head, tail) {
		return A2(
			$ianmackenzie$elm_units_prefixed$Units$Quantity$max,
			head,
			A2(
				$elm$core$Maybe$withDefault,
				head,
				$ianmackenzie$elm_units_prefixed$Units$Quantity$maximum(tail)));
	});
var $gampleman$elm_visualization$Force$Collision$toRadius = A2(
	$elm$core$Basics$composeR,
	function ($) {
		return $.M;
	},
	$ianmackenzie$elm_geometry$Circle2d$radius);
var $gampleman$elm_visualization$Force$Collision$config = {
	fn: F2(
		function (radius, radii) {
			return A2($gampleman$elm_visualization$Force$Collision$nonEmptyMaximum, radius, radii);
		}),
	fo: F2(
		function (vertex, vertices) {
			return A2(
				$gampleman$elm_visualization$Force$Collision$nonEmptyMaximum,
				$gampleman$elm_visualization$Force$Collision$toRadius(vertex),
				A2($elm$core$List$map, $gampleman$elm_visualization$Force$Collision$toRadius, vertices));
		}),
	gb: A2(
		$elm$core$Basics$composeR,
		function ($) {
			return $.M;
		},
		$ianmackenzie$elm_geometry$Circle2d$centerPoint)
};
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{v: nodeList, r: nodeListSize, u: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $gampleman$elm_visualization$Force$QuadTree$Empty = {$: 0};
var $gampleman$elm_visualization$Force$QuadTree$empty = $gampleman$elm_visualization$Force$QuadTree$Empty;
var $gampleman$elm_visualization$Force$QuadTree$Leaf = function (a) {
	return {$: 1, a: a};
};
var $gampleman$elm_visualization$Force$QuadTree$Node = function (a) {
	return {$: 2, a: a};
};
var $ianmackenzie$elm_geometry$BoundingBox2d$contains = F2(
	function (point, boundingBox) {
		return A2(
			$ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo,
			$ianmackenzie$elm_geometry$BoundingBox2d$minX(boundingBox),
			$ianmackenzie$elm_geometry$Point2d$xCoordinate(point)) && (A2(
			$ianmackenzie$elm_units$Quantity$lessThanOrEqualTo,
			$ianmackenzie$elm_geometry$BoundingBox2d$maxX(boundingBox),
			$ianmackenzie$elm_geometry$Point2d$xCoordinate(point)) && (A2(
			$ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo,
			$ianmackenzie$elm_geometry$BoundingBox2d$minY(boundingBox),
			$ianmackenzie$elm_geometry$Point2d$yCoordinate(point)) && A2(
			$ianmackenzie$elm_units$Quantity$lessThanOrEqualTo,
			$ianmackenzie$elm_geometry$BoundingBox2d$maxY(boundingBox),
			$ianmackenzie$elm_geometry$Point2d$yCoordinate(point))));
	});
var $ianmackenzie$elm_geometry$BoundingBox2d$dimensions = function (boundingBox) {
	return _Utils_Tuple2(
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox2d$minX(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox2d$maxX(boundingBox)),
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox2d$minY(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox2d$maxY(boundingBox)));
};
var $ianmackenzie$elm_geometry$BoundingBox2d$extrema = function (_v0) {
	var boundingBoxExtrema = _v0;
	return boundingBoxExtrema;
};
var $gampleman$elm_visualization$Force$QuadTree$NE = 0;
var $gampleman$elm_visualization$Force$QuadTree$NW = 1;
var $gampleman$elm_visualization$Force$QuadTree$SE = 2;
var $gampleman$elm_visualization$Force$QuadTree$SW = 3;
var $ianmackenzie$elm_units$Quantity$interpolateFrom = F3(
	function (_v0, _v1, parameter) {
		var start = _v0;
		var end = _v1;
		return (parameter <= 0.5) ? (start + (parameter * (end - start))) : (end + ((1 - parameter) * (start - end)));
	});
var $ianmackenzie$elm_geometry$BoundingBox2d$midX = function (_v0) {
	var boundingBox = _v0;
	return A3($ianmackenzie$elm_units$Quantity$interpolateFrom, boundingBox.bH, boundingBox.bF, 0.5);
};
var $ianmackenzie$elm_geometry$BoundingBox2d$midY = function (_v0) {
	var boundingBox = _v0;
	return A3($ianmackenzie$elm_units$Quantity$interpolateFrom, boundingBox.bI, boundingBox.bG, 0.5);
};
var $ianmackenzie$elm_geometry$Point2d$xy = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return {aJ: x, aK: y};
	});
var $ianmackenzie$elm_geometry$BoundingBox2d$centerPoint = function (boundingBox) {
	return A2(
		$ianmackenzie$elm_geometry$Point2d$xy,
		$ianmackenzie$elm_geometry$BoundingBox2d$midX(boundingBox),
		$ianmackenzie$elm_geometry$BoundingBox2d$midY(boundingBox));
};
var $ianmackenzie$elm_geometry$Point2d$coordinates = function (_v0) {
	var p = _v0;
	return _Utils_Tuple2(p.aJ, p.aK);
};
var $ianmackenzie$elm_units_prefixed$Units$Quantity$greaterThanOrEqualTo = $ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo;
var $gampleman$elm_visualization$Force$QuadTree$quadrant = F2(
	function (boundingBox, point) {
		var _v0 = $ianmackenzie$elm_geometry$Point2d$coordinates(point);
		var x = _v0.a;
		var y = _v0.b;
		var _v1 = $ianmackenzie$elm_geometry$Point2d$coordinates(
			$ianmackenzie$elm_geometry$BoundingBox2d$centerPoint(boundingBox));
		var midX = _v1.a;
		var midY = _v1.b;
		return A2($ianmackenzie$elm_units_prefixed$Units$Quantity$greaterThanOrEqualTo, midY, y) ? (A2($ianmackenzie$elm_units_prefixed$Units$Quantity$greaterThanOrEqualTo, midX, x) ? 0 : 1) : (A2($ianmackenzie$elm_units_prefixed$Units$Quantity$greaterThanOrEqualTo, midX, x) ? 2 : 3);
	});
var $ianmackenzie$elm_geometry$BoundingBox2d$singleton = function (point) {
	return {
		bF: $ianmackenzie$elm_geometry$Point2d$xCoordinate(point),
		bG: $ianmackenzie$elm_geometry$Point2d$yCoordinate(point),
		bH: $ianmackenzie$elm_geometry$Point2d$xCoordinate(point),
		bI: $ianmackenzie$elm_geometry$Point2d$yCoordinate(point)
	};
};
var $gampleman$elm_visualization$Force$QuadTree$singleton = F2(
	function (toPoint, vertex) {
		return $gampleman$elm_visualization$Force$QuadTree$Leaf(
			{
				fd: 0,
				fi: $ianmackenzie$elm_geometry$BoundingBox2d$singleton(
					toPoint(vertex)),
				fl: _Utils_Tuple2(vertex, _List_Nil)
			});
	});
var $ianmackenzie$elm_geometry$BoundingBox2d$union = F2(
	function (firstBox, secondBox) {
		var b2 = $ianmackenzie$elm_geometry$BoundingBox2d$extrema(secondBox);
		var b1 = $ianmackenzie$elm_geometry$BoundingBox2d$extrema(firstBox);
		return {
			bF: A2($ianmackenzie$elm_units$Quantity$max, b1.bF, b2.bF),
			bG: A2($ianmackenzie$elm_units$Quantity$max, b1.bG, b2.bG),
			bH: A2($ianmackenzie$elm_units$Quantity$min, b1.bH, b2.bH),
			bI: A2($ianmackenzie$elm_units$Quantity$min, b1.bI, b2.bI)
		};
	});
var $gampleman$elm_visualization$Force$QuadTree$insertBy = F3(
	function (toPoint, vertex, qtree) {
		switch (qtree.$) {
			case 0:
				return $gampleman$elm_visualization$Force$QuadTree$Leaf(
					{
						fd: 0,
						fi: $ianmackenzie$elm_geometry$BoundingBox2d$singleton(
							toPoint(vertex)),
						fl: _Utils_Tuple2(vertex, _List_Nil)
					});
			case 1:
				var leaf = qtree.a;
				var maxSize = 32;
				var _v1 = leaf.fl;
				var first = _v1.a;
				var rest = _v1.b;
				var newSize = 2 + $elm$core$List$length(rest);
				if (_Utils_cmp(newSize, maxSize) > -1) {
					var initial = $gampleman$elm_visualization$Force$QuadTree$Node(
						{
							fd: 0,
							fi: A2(
								$ianmackenzie$elm_geometry$BoundingBox2d$union,
								leaf.fi,
								$ianmackenzie$elm_geometry$BoundingBox2d$singleton(
									toPoint(vertex))),
							fL: $gampleman$elm_visualization$Force$QuadTree$Empty,
							fN: $gampleman$elm_visualization$Force$QuadTree$Empty,
							fZ: $gampleman$elm_visualization$Force$QuadTree$Empty,
							f4: $gampleman$elm_visualization$Force$QuadTree$Empty
						});
					return A3(
						$elm$core$List$foldl,
						$gampleman$elm_visualization$Force$QuadTree$insertBy(toPoint),
						initial,
						A2($elm$core$List$cons, first, rest));
				} else {
					return $gampleman$elm_visualization$Force$QuadTree$Leaf(
						{
							fd: 0,
							fi: A2(
								$ianmackenzie$elm_geometry$BoundingBox2d$union,
								leaf.fi,
								$ianmackenzie$elm_geometry$BoundingBox2d$singleton(
									toPoint(vertex))),
							fl: _Utils_Tuple2(
								vertex,
								A2($elm$core$List$cons, first, rest))
						});
				}
			default:
				var node = qtree.a;
				var point = toPoint(vertex);
				if (A2($ianmackenzie$elm_geometry$BoundingBox2d$contains, point, node.fi)) {
					var _v2 = A2($gampleman$elm_visualization$Force$QuadTree$quadrant, node.fi, point);
					switch (_v2) {
						case 0:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									fd: node.fd,
									fi: node.fi,
									fL: A3($gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.fL),
									fN: node.fN,
									fZ: node.fZ,
									f4: node.f4
								});
						case 2:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									fd: node.fd,
									fi: node.fi,
									fL: node.fL,
									fN: node.fN,
									fZ: A3($gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.fZ),
									f4: node.f4
								});
						case 1:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									fd: node.fd,
									fi: node.fi,
									fL: node.fL,
									fN: A3($gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.fN),
									fZ: node.fZ,
									f4: node.f4
								});
						default:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									fd: node.fd,
									fi: node.fi,
									fL: node.fL,
									fN: node.fN,
									fZ: node.fZ,
									f4: A3($gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.f4)
								});
					}
				} else {
					var _v3 = $ianmackenzie$elm_geometry$BoundingBox2d$extrema(node.fi);
					var minX = _v3.bH;
					var minY = _v3.bI;
					var maxX = _v3.bF;
					var maxY = _v3.bG;
					var _v4 = $ianmackenzie$elm_geometry$BoundingBox2d$dimensions(node.fi);
					var width = _v4.a;
					var height = _v4.b;
					var _v5 = A2($gampleman$elm_visualization$Force$QuadTree$quadrant, node.fi, point);
					switch (_v5) {
						case 0:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									fd: 0,
									fi: $ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{
											bF: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, width, maxX),
											bG: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, height, maxY),
											bH: minX,
											bI: minY
										}),
									fL: A2($gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex),
									fN: $gampleman$elm_visualization$Force$QuadTree$Empty,
									fZ: $gampleman$elm_visualization$Force$QuadTree$Empty,
									f4: qtree
								});
						case 2:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									fd: 0,
									fi: $ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{
											bF: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, width, maxX),
											bG: maxY,
											bH: minX,
											bI: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$minus, height, minY)
										}),
									fL: $gampleman$elm_visualization$Force$QuadTree$Empty,
									fN: qtree,
									fZ: A2($gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex),
									f4: $gampleman$elm_visualization$Force$QuadTree$Empty
								});
						case 1:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									fd: 0,
									fi: $ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{
											bF: maxX,
											bG: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, height, maxY),
											bH: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$minus, width, minX),
											bI: minY
										}),
									fL: $gampleman$elm_visualization$Force$QuadTree$Empty,
									fN: A2($gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex),
									fZ: qtree,
									f4: $gampleman$elm_visualization$Force$QuadTree$Empty
								});
						default:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									fd: 0,
									fi: $ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{
											bF: maxX,
											bG: maxY,
											bH: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$minus, width, minX),
											bI: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$minus, height, minY)
										}),
									fL: qtree,
									fN: $gampleman$elm_visualization$Force$QuadTree$Empty,
									fZ: $gampleman$elm_visualization$Force$QuadTree$Empty,
									f4: A2($gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex)
								});
					}
				}
		}
	});
var $gampleman$elm_visualization$Force$QuadTree$fromList = function (toPoint) {
	return A2(
		$elm$core$List$foldl,
		$gampleman$elm_visualization$Force$QuadTree$insertBy(toPoint),
		$gampleman$elm_visualization$Force$QuadTree$empty);
};
var $gampleman$elm_visualization$Force$Collision$nTimes = F3(
	function (fn, times, input) {
		nTimes:
		while (true) {
			if (times <= 0) {
				return input;
			} else {
				var $temp$fn = fn,
					$temp$times = times - 1,
					$temp$input = fn(input);
				fn = $temp$fn;
				times = $temp$times;
				input = $temp$input;
				continue nTimes;
			}
		}
	});
var $gampleman$elm_visualization$Force$QuadTree$getAggregate = function (qtree) {
	switch (qtree.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var aggregate = qtree.a.fd;
			return $elm$core$Maybe$Just(aggregate);
		default:
			var aggregate = qtree.a.fd;
			return $elm$core$Maybe$Just(aggregate);
	}
};
var $gampleman$elm_visualization$Force$QuadTree$performAggregate = F2(
	function (config, vanillaQuadTree) {
		var combineAggregates = config.fn;
		var combineVertices = config.fo;
		switch (vanillaQuadTree.$) {
			case 0:
				return $gampleman$elm_visualization$Force$QuadTree$Empty;
			case 1:
				var leaf = vanillaQuadTree.a;
				var _v1 = leaf.fl;
				var first = _v1.a;
				var rest = _v1.b;
				return $gampleman$elm_visualization$Force$QuadTree$Leaf(
					{
						fd: A2(combineVertices, first, rest),
						fi: leaf.fi,
						fl: _Utils_Tuple2(first, rest)
					});
			default:
				var node = vanillaQuadTree.a;
				var newSw = A2($gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.f4);
				var newSe = A2($gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.fZ);
				var newNw = A2($gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.fN);
				var newNe = A2($gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.fL);
				var subresults = A2(
					$elm$core$List$filterMap,
					$gampleman$elm_visualization$Force$QuadTree$getAggregate,
					_List_fromArray(
						[newNw, newSw, newNe, newSe]));
				if (!subresults.b) {
					return $gampleman$elm_visualization$Force$QuadTree$Empty;
				} else {
					var x = subresults.a;
					var xs = subresults.b;
					return $gampleman$elm_visualization$Force$QuadTree$Node(
						{
							fd: A2(combineAggregates, x, xs),
							fi: node.fi,
							fL: newNe,
							fN: newNw,
							fZ: newSe,
							f4: newSw
						});
				}
		}
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Circle2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$abs = function (_v0) {
	var value = _v0;
	return $elm$core$Basics$abs(value);
};
var $ianmackenzie$elm_geometry$Circle2d$withRadius = F2(
	function (givenRadius, givenCenterPoint) {
		return {
			fj: givenCenterPoint,
			eJ: $ianmackenzie$elm_units$Quantity$abs(givenRadius)
		};
	});
var $ianmackenzie$elm_geometry$Circle2d$translateBy = F2(
	function (displacement, _v0) {
		var circle = _v0;
		return A2(
			$ianmackenzie$elm_geometry$Circle2d$withRadius,
			circle.eJ,
			A2($ianmackenzie$elm_geometry$Point2d$translateBy, displacement, circle.fj));
	});
var $gampleman$elm_visualization$Force$Collision$collision = F3(
	function (strength, iters, vertices) {
		var withAggregates = A2(
			$gampleman$elm_visualization$Force$QuadTree$performAggregate,
			$gampleman$elm_visualization$Force$Collision$config,
			A2(
				$gampleman$elm_visualization$Force$QuadTree$fromList,
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.M;
					},
					$ianmackenzie$elm_geometry$Circle2d$centerPoint),
				vertices));
		var apply = F2(
			function (vertex, velocities) {
				return A4(
					$gampleman$elm_visualization$Force$Collision$applyForce,
					strength,
					withAggregates,
					velocities,
					_Utils_update(
						vertex,
						{
							M: A2($ianmackenzie$elm_geometry$Circle2d$translateBy, vertex.a_, vertex.M)
						}));
			});
		return A3(
			$gampleman$elm_visualization$Force$Collision$nTimes,
			function (velocities) {
				return A3($elm$core$List$foldl, apply, velocities, vertices);
			},
			iters,
			$elm$core$Array$fromList(vertices));
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $ianmackenzie$elm_geometry$Point2d$pixels = F2(
	function (x, y) {
		return {aJ: x, aK: y};
	});
var $ianmackenzie$elm_units$Pixels$pixels = function (numPixels) {
	return numPixels;
};
var $ianmackenzie$elm_units_prefixed$Units$Pixels$pixels = $ianmackenzie$elm_units$Pixels$pixels;
var $ianmackenzie$elm_geometry$Vector2d$pixels = F2(
	function (x, y) {
		return {aJ: x, aK: y};
	});
var $ianmackenzie$elm_geometry$Vector2d$toPixels = function (_v0) {
	var vectorComponents = _v0;
	return vectorComponents;
};
var $gampleman$elm_visualization$Force$Collision$wrapper = F4(
	function (strength, iters, radii, points) {
		var vertices = A3(
			$gampleman$elm_visualization$Force$Collision$collision,
			strength,
			iters,
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (index, point) {
						return _Utils_update(
							point,
							{aR: index});
					}),
				A2(
					$elm$core$List$filterMap,
					function (_v0) {
						var key = _v0.a;
						var point = _v0.b;
						var x = point.aJ;
						var y = point.aK;
						var vx = point.e5;
						var vy = point.e6;
						return A2(
							$elm$core$Maybe$map,
							function (radius) {
								return {
									M: A2(
										$ianmackenzie$elm_geometry$Circle2d$withRadius,
										$ianmackenzie$elm_units_prefixed$Units$Pixels$pixels(radius),
										A2($ianmackenzie$elm_geometry$Point2d$pixels, x, y)),
									aR: 0,
									el: key,
									a_: A2($ianmackenzie$elm_geometry$Vector2d$pixels, vx, vy)
								};
							},
							A2($elm$core$Dict$get, key, radii));
					},
					$elm$core$Dict$toList(points))));
		var folder = function (newVertex) {
			return A2(
				$elm$core$Dict$update,
				newVertex.el,
				$elm$core$Maybe$map(
					function (point) {
						var dv = $ianmackenzie$elm_geometry$Vector2d$toPixels(newVertex.a_);
						return _Utils_update(
							point,
							{e5: dv.aJ, e6: dv.aK});
					}));
		};
		return A3($elm$core$Array$foldl, folder, points, vertices);
	});
var $ianmackenzie$elm_geometry$Point2d$distanceFrom = F2(
	function (_v0, _v1) {
		var p1 = _v0;
		var p2 = _v1;
		var deltaY = p2.aK - p1.aK;
		var deltaX = p2.aJ - p1.aJ;
		var largestComponent = A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(deltaX),
			$elm$core$Basics$abs(deltaY));
		if (!largestComponent) {
			return $ianmackenzie$elm_units$Quantity$zero;
		} else {
			var scaledY = deltaY / largestComponent;
			var scaledX = deltaX / largestComponent;
			var scaledLength = $elm$core$Basics$sqrt((scaledX * scaledX) + (scaledY * scaledY));
			return scaledLength * largestComponent;
		}
	});
var $ianmackenzie$elm_units$Pixels$inPixels = function (_v0) {
	var numPixels = _v0;
	return numPixels;
};
var $ianmackenzie$elm_units_prefixed$Units$Pixels$inPixels = $ianmackenzie$elm_units$Pixels$inPixels;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $ianmackenzie$elm_geometry$Vector2d$sumHelp = F3(
	function (sumX, sumY, vectors) {
		sumHelp:
		while (true) {
			if (vectors.b) {
				var x = vectors.a.aJ;
				var y = vectors.a.aK;
				var rest = vectors.b;
				var $temp$sumX = sumX + x,
					$temp$sumY = sumY + y,
					$temp$vectors = rest;
				sumX = $temp$sumX;
				sumY = $temp$sumY;
				vectors = $temp$vectors;
				continue sumHelp;
			} else {
				return {aJ: sumX, aK: sumY};
			}
		}
	});
var $ianmackenzie$elm_geometry$Vector2d$sum = function (vectors) {
	return A3($ianmackenzie$elm_geometry$Vector2d$sumHelp, 0, 0, vectors);
};
var $ianmackenzie$elm_geometry$Vector2d$zero = {aJ: 0, aK: 0};
var $gampleman$elm_visualization$Force$ManyBody$applyForce = F4(
	function (alpha, theta, qtree, vertex) {
		var isFarAway = function (treePart) {
			var distance = A2($ianmackenzie$elm_geometry$Point2d$distanceFrom, vertex.eD, treePart.fd.eD);
			var _v2 = $ianmackenzie$elm_geometry$BoundingBox2d$dimensions(treePart.fi);
			var width = _v2.a;
			return _Utils_cmp(
				A2($ianmackenzie$elm_units_prefixed$Units$Quantity$ratio, width, distance),
				theta) < 0;
		};
		var calculateVelocity = F2(
			function (target, source) {
				var delta = A2($ianmackenzie$elm_geometry$Vector2d$from, target.eD, source.eD);
				var len = $ianmackenzie$elm_units_prefixed$Units$Pixels$inPixels(
					$ianmackenzie$elm_geometry$Vector2d$length(delta));
				var weight = (source.C * alpha) / A2($elm$core$Basics$pow, len, 2);
				return $elm$core$Basics$isNaN(weight) ? $ianmackenzie$elm_geometry$Vector2d$zero : A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, weight, delta);
			});
		var useAggregate = function (treePart) {
			return A2(calculateVelocity, vertex, treePart.fd);
		};
		switch (qtree.$) {
			case 0:
				return $ianmackenzie$elm_geometry$Vector2d$zero;
			case 1:
				var leaf = qtree.a;
				if (isFarAway(leaf)) {
					return useAggregate(leaf);
				} else {
					var applyForceFromPoint = F2(
						function (point, accum) {
							return _Utils_eq(point.el, vertex.el) ? accum : A2(
								$ianmackenzie$elm_geometry$Vector2d$plus,
								A2(calculateVelocity, vertex, point),
								accum);
						});
					var _v1 = leaf.fl;
					var first = _v1.a;
					var rest = _v1.b;
					return A3(
						$elm$core$List$foldl,
						applyForceFromPoint,
						$ianmackenzie$elm_geometry$Vector2d$zero,
						A2($elm$core$List$cons, first, rest));
				}
			default:
				var node = qtree.a;
				if (isFarAway(node)) {
					return useAggregate(node);
				} else {
					var helper = function (tree) {
						return A4($gampleman$elm_visualization$Force$ManyBody$applyForce, alpha, theta, tree, vertex);
					};
					return $ianmackenzie$elm_geometry$Vector2d$sum(
						_List_fromArray(
							[
								helper(node.fN),
								helper(node.fL),
								helper(node.fZ),
								helper(node.f4)
							]));
				}
		}
	});
var $ianmackenzie$elm_units$Quantity$divideBy = F2(
	function (divisor, _v0) {
		var value = _v0;
		return value / divisor;
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$divideBy = $ianmackenzie$elm_units$Quantity$divideBy;
var $gampleman$elm_visualization$Force$ManyBody$constructSuperPoint = F2(
	function (first, rest) {
		var initialStrength = first.C;
		var initialPoint = $ianmackenzie$elm_geometry$Point2d$coordinates(first.eD);
		var folder = F2(
			function (point, _v3) {
				var _v4 = _v3.a;
				var accumX = _v4.a;
				var accumY = _v4.b;
				var strength = _v3.b;
				var size = _v3.c;
				var _v2 = $ianmackenzie$elm_geometry$Point2d$coordinates(point.eD);
				var x = _v2.a;
				var y = _v2.b;
				return _Utils_Tuple3(
					_Utils_Tuple2(
						A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, x, accumX),
						A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, y, accumY)),
					strength + point.C,
					size + 1);
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			folder,
			_Utils_Tuple3(initialPoint, initialStrength, 1),
			rest);
		var _v1 = _v0.a;
		var totalX = _v1.a;
		var totalY = _v1.b;
		var totalStrength = _v0.b;
		var totalSize = _v0.c;
		return {
			eD: A2(
				$ianmackenzie$elm_geometry$Point2d$xy,
				A2($ianmackenzie$elm_units_prefixed$Units$Quantity$divideBy, totalSize, totalX),
				A2($ianmackenzie$elm_units_prefixed$Units$Quantity$divideBy, totalSize, totalY)),
			C: totalStrength
		};
	});
var $gampleman$elm_visualization$Force$ManyBody$config = {
	fn: $gampleman$elm_visualization$Force$ManyBody$constructSuperPoint,
	fo: $gampleman$elm_visualization$Force$ManyBody$constructSuperPoint,
	gb: function ($) {
		return $.eD;
	}
};
var $gampleman$elm_visualization$Force$ManyBody$manyBody = F3(
	function (alpha, theta, vertices) {
		var withAggregates = A2(
			$gampleman$elm_visualization$Force$QuadTree$performAggregate,
			$gampleman$elm_visualization$Force$ManyBody$config,
			A2(
				$gampleman$elm_visualization$Force$QuadTree$fromList,
				function ($) {
					return $.eD;
				},
				vertices));
		var updateVertex = function (vertex) {
			return _Utils_update(
				vertex,
				{
					a_: A2(
						$ianmackenzie$elm_geometry$Vector2d$plus,
						vertex.a_,
						A4($gampleman$elm_visualization$Force$ManyBody$applyForce, alpha, theta, withAggregates, vertex))
				});
		};
		return A2($elm$core$List$map, updateVertex, vertices);
	});
var $gampleman$elm_visualization$Force$ManyBody$wrapper = F4(
	function (alpha, theta, strengths, points) {
		var vertices = A2(
			$elm$core$List$map,
			function (_v0) {
				var key = _v0.a;
				var x = _v0.b.aJ;
				var y = _v0.b.aK;
				var strength = A2(
					$elm$core$Maybe$withDefault,
					0,
					A2($elm$core$Dict$get, key, strengths));
				return {
					el: key,
					eD: A2($ianmackenzie$elm_geometry$Point2d$pixels, x, y),
					C: strength,
					a_: $ianmackenzie$elm_geometry$Vector2d$zero
				};
			},
			$elm$core$Dict$toList(points));
		var updater = function (newVertex) {
			return $elm$core$Maybe$map(
				function (point) {
					var dv = $ianmackenzie$elm_geometry$Vector2d$toPixels(newVertex.a_);
					return _Utils_update(
						point,
						{e5: point.e5 + dv.aJ, e6: point.e6 + dv.aK});
				});
		};
		var newVertices = A3($gampleman$elm_visualization$Force$ManyBody$manyBody, alpha, theta, vertices);
		var folder = F2(
			function (newVertex, pointsDict) {
				return A3(
					$elm$core$Dict$update,
					newVertex.el,
					updater(newVertex),
					pointsDict);
			});
		return A3($elm$core$List$foldl, folder, points, newVertices);
	});
var $gampleman$elm_visualization$Force$applyForce = F3(
	function (alpha, force, entities) {
		switch (force.$) {
			case 0:
				var x = force.a;
				var y = force.b;
				var n = $elm$core$Dict$size(entities);
				var _v1 = A3(
					$elm$core$Dict$foldr,
					F3(
						function (_v2, ent, _v3) {
							var sx0 = _v3.a;
							var sy0 = _v3.b;
							return _Utils_Tuple2(sx0 + ent.aJ, sy0 + ent.aK);
						}),
					_Utils_Tuple2(0, 0),
					entities);
				var sumx = _v1.a;
				var sumy = _v1.b;
				var sx = (sumx / n) - x;
				var sy = (sumy / n) - y;
				return A2(
					$elm$core$Dict$map,
					F2(
						function (_v4, ent) {
							return _Utils_update(
								ent,
								{aJ: ent.aJ - sx, aK: ent.aK - sy});
						}),
					entities);
			case 1:
				var iters = force.a;
				var strength = force.b;
				var radii = force.c;
				return A4($gampleman$elm_visualization$Force$Collision$wrapper, strength, iters, radii, entities);
			case 2:
				var iters = force.a;
				var lnks = force.b;
				return A3(
					$gampleman$elm_visualization$Force$nTimes,
					function (entitiesList) {
						return A3(
							$elm$core$List$foldl,
							F2(
								function (_v5, ents) {
									var source = _v5.bg;
									var target = _v5.ad;
									var distance = _v5.bv;
									var strength = _v5.C;
									var bias = _v5.cl;
									var _v6 = _Utils_Tuple2(
										A2($elm$core$Dict$get, source, ents),
										A2($elm$core$Dict$get, target, ents));
									if ((!_v6.a.$) && (!_v6.b.$)) {
										var sourceNode = _v6.a.a;
										var targetNode = _v6.b.a;
										var y = ((targetNode.aK + targetNode.e6) - sourceNode.aK) - sourceNode.e6;
										var x = ((targetNode.aJ + targetNode.e5) - sourceNode.aJ) - sourceNode.e5;
										var d = $elm$core$Basics$sqrt(
											A2($elm$core$Basics$pow, x, 2) + A2($elm$core$Basics$pow, y, 2));
										var l = (((d - distance) / d) * alpha) * strength;
										return A3(
											$elm$core$Dict$update,
											source,
											$elm$core$Maybe$map(
												function (tn) {
													return _Utils_update(
														tn,
														{e5: tn.e5 + ((x * l) * (1 - bias)), e6: tn.e6 + ((y * l) * (1 - bias))});
												}),
											A3(
												$elm$core$Dict$update,
												target,
												$elm$core$Maybe$map(
													function (sn) {
														return _Utils_update(
															sn,
															{e5: sn.e5 - ((x * l) * bias), e6: sn.e6 - ((y * l) * bias)});
													}),
												ents));
									} else {
										var otherwise = _v6;
										return ents;
									}
								}),
							entitiesList,
							lnks);
					},
					iters,
					entities);
			case 3:
				var theta = force.a;
				var entityStrengths = force.b;
				return A4($gampleman$elm_visualization$Force$ManyBody$wrapper, alpha, theta, entityStrengths, entities);
			case 4:
				var entityConfigs = force.a;
				var mapper = F2(
					function (id, ent) {
						var _v7 = A2($elm$core$Dict$get, id, entityConfigs);
						if (!_v7.$) {
							var strength = _v7.a.C;
							var position = _v7.a.eD;
							return _Utils_update(
								ent,
								{e5: ent.e5 + (((position - ent.aJ) * strength) * alpha)});
						} else {
							return ent;
						}
					});
				return A2($elm$core$Dict$map, mapper, entities);
			case 5:
				var entityConfigs = force.a;
				var mapper = F2(
					function (id, ent) {
						var _v8 = A2($elm$core$Dict$get, id, entityConfigs);
						if (!_v8.$) {
							var strength = _v8.a.C;
							var position = _v8.a.eD;
							return _Utils_update(
								ent,
								{e6: ent.e6 + (((position - ent.aK) * strength) * alpha)});
						} else {
							return ent;
						}
					});
				return A2($elm$core$Dict$map, mapper, entities);
			default:
				var entityConfigs = force.a;
				var mapper = F2(
					function (id, ent) {
						var _v9 = A2($elm$core$Dict$get, id, entityConfigs);
						if (!_v9.$) {
							var strength = _v9.a.C;
							var x = _v9.a.aJ;
							var y = _v9.a.aK;
							var radius = _v9.a.eJ;
							var dy = ent.aK - y;
							var dx = ent.aJ - x;
							var r = $elm$core$Basics$sqrt(
								A2($elm$core$Basics$pow, dx, 2) + A2($elm$core$Basics$pow, dy, 2));
							var k = (((radius - r) * strength) * alpha) / r;
							return _Utils_update(
								ent,
								{e5: ent.e5 + (dx * k), e6: ent.e6 + (dy * k)});
						} else {
							return ent;
						}
					});
				return A2($elm$core$Dict$map, mapper, entities);
		}
	});
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $gampleman$elm_visualization$Force$tick = F2(
	function (_v0, nodes) {
		var state = _v0;
		var updateEntity = function (ent) {
			return _Utils_update(
				ent,
				{e5: ent.e5 * state.b_, e6: ent.e6 * state.b_, aJ: ent.aJ + (ent.e5 * state.b_), aK: ent.aK + (ent.e6 * state.b_)});
		};
		var dictNodes = A3(
			$elm$core$List$foldl,
			function (node) {
				return A2($elm$core$Dict$insert, node.ax, node);
			},
			$elm$core$Dict$empty,
			nodes);
		var alpha = state.a2 + ((state.dS - state.a2) * state.ch);
		var newNodes = A3(
			$elm$core$List$foldl,
			$gampleman$elm_visualization$Force$applyForce(alpha),
			dictNodes,
			state.d6);
		return _Utils_Tuple2(
			_Utils_update(
				state,
				{a2: alpha}),
			A2(
				$elm$core$List$map,
				updateEntity,
				$elm$core$Dict$values(newNodes)));
	});
var $gampleman$elm_visualization$Force$computeSimulation = F2(
	function (state, entities) {
		computeSimulation:
		while (true) {
			if ($gampleman$elm_visualization$Force$isCompleted(state)) {
				return entities;
			} else {
				var _v0 = A2($gampleman$elm_visualization$Force$tick, state, entities);
				var newState = _v0.a;
				var newEntities = _v0.b;
				var $temp$state = newState,
					$temp$entities = newEntities;
				state = $temp$state;
				entities = $temp$entities;
				continue computeSimulation;
			}
		}
	});
var $gampleman$elm_visualization$Force$Links = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $gampleman$elm_visualization$Force$customLinks = F2(
	function (iters, list) {
		var counts = A3(
			$elm$core$List$foldr,
			F2(
				function (_v1, d) {
					var source = _v1.bg;
					var target = _v1.ad;
					return A3(
						$elm$core$Dict$update,
						target,
						A2(
							$elm$core$Basics$composeL,
							A2(
								$elm$core$Basics$composeL,
								$elm$core$Maybe$Just,
								$elm$core$Maybe$withDefault(1)),
							$elm$core$Maybe$map(
								$elm$core$Basics$add(1))),
						A3(
							$elm$core$Dict$update,
							source,
							A2(
								$elm$core$Basics$composeL,
								A2(
									$elm$core$Basics$composeL,
									$elm$core$Maybe$Just,
									$elm$core$Maybe$withDefault(1)),
								$elm$core$Maybe$map(
									$elm$core$Basics$add(1))),
							d));
				}),
			$elm$core$Dict$empty,
			list);
		var count = function (key) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				A2($elm$core$Dict$get, key, counts));
		};
		return A2(
			$gampleman$elm_visualization$Force$Links,
			iters,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var source = _v0.bg;
					var target = _v0.ad;
					var distance = _v0.bv;
					var strength = _v0.C;
					return {
						cl: count(source) / (count(source) + count(target)),
						bv: distance,
						bg: source,
						C: A2(
							$elm$core$Maybe$withDefault,
							1 / A2(
								$elm$core$Basics$min,
								count(source),
								count(target)),
							strength),
						ad: target
					};
				},
				list));
	});
var $gampleman$elm_visualization$Force$links = A2(
	$elm$core$Basics$composeR,
	$elm$core$List$map(
		function (_v0) {
			var source = _v0.a;
			var target = _v0.b;
			return {bv: 30, bg: source, C: $elm$core$Maybe$Nothing, ad: target};
		}),
	$gampleman$elm_visualization$Force$customLinks(1));
var $author$project$Vis$links = function (related) {
	return $gampleman$elm_visualization$Force$links(
		$elm$core$List$concat(
			$elm$core$Dict$values(
				A2(
					$elm$core$Dict$map,
					F2(
						function (k, v) {
							return A2(
								$elm$core$List$map,
								function (artist) {
									return _Utils_Tuple2(k, artist);
								},
								v);
						}),
					related))));
};
var $elm$core$List$map3 = _List_map3;
var $gampleman$elm_visualization$Force$simulation = function (forces) {
	return {
		a2: 1.0,
		ch: 1 - A2($elm$core$Basics$pow, 0.001, 1 / 300),
		dS: 0.0,
		d6: forces,
		cX: 0.001,
		b_: 0.6
	};
};
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $author$project$Vis$xRange = function (n) {
	var sqr = $elm$core$Basics$ceiling(
		$elm$core$Basics$sqrt(n));
	return $elm$core$List$concat(
		A2(
			$elm$core$List$repeat,
			sqr,
			A2(
				$elm$core$List$map,
				$elm$core$Basics$toFloat,
				A2($elm$core$List$range, 0, sqr))));
};
var $author$project$Vis$yRange = function (n) {
	var sqr = $elm$core$Basics$ceiling(
		$elm$core$Basics$sqrt(n));
	return $elm$core$List$concat(
		A3(
			$elm$core$List$map2,
			function (a) {
				return $elm$core$List$map(
					function (x) {
						return x + a;
					});
			},
			A2($elm$core$List$range, 0, sqr),
			A2(
				$elm$core$List$repeat,
				sqr,
				A2(
					$elm$core$List$map,
					$elm$core$Basics$toFloat,
					A2($elm$core$List$repeat, sqr, 0)))));
};
var $author$project$Vis$init = F2(
	function (artists, related) {
		var model = {
			bC: '',
			al: A4(
				$elm$core$List$map3,
				$author$project$Vis$asEntity,
				$author$project$Vis$xRange(
					$elm$core$List$length(artists)),
				$author$project$Vis$yRange(
					$elm$core$List$length(artists)),
				artists),
			dm: $elm$core$Dict$toList(related),
			bP: $gampleman$elm_visualization$Force$simulation(
				_List_fromArray(
					[
						$author$project$Vis$links(related),
						A2($gampleman$elm_visualization$Force$center, 0, 0),
						A2(
						$gampleman$elm_visualization$Force$collision,
						40,
						A2(
							$elm$core$List$map,
							function ($) {
								return $.ax;
							},
							artists))
					]))
		};
		var newNodes = A2($gampleman$elm_visualization$Force$computeSimulation, model.bP, model.al);
		return _Utils_update(
			model,
			{al: newNodes});
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return function (_v0) {
			var visited = _v0.a$;
			var unvisited = _v0.aH;
			var params = _v0.aU;
			var frag = _v0.aQ;
			var value = _v0.ao;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				var _v2 = stringToSomething(next);
				if (!_v2.$) {
					var nextValue = _v2.a;
					return _List_fromArray(
						[
							A5(
							$elm$url$Url$Parser$State,
							A2($elm$core$List$cons, next, visited),
							rest,
							params,
							frag,
							value(nextValue))
						]);
				} else {
					return _List_Nil;
				}
			}
		};
	});
var $elm$url$Url$Parser$string = A2($elm$url$Url$Parser$custom, 'STRING', $elm$core$Maybe$Just);
var $author$project$Main$playlistUrlParser = A2(
	$elm$url$Url$Parser$slash,
	$elm$url$Url$Parser$s('playlist'),
	$elm$url$Url$Parser$string);
var $author$project$Main$parsePlaylistUrl = function (urlString) {
	return A2(
		$elm$core$Maybe$andThen,
		function (url) {
			return A2($elm$url$Url$Parser$parse, $author$project$Main$playlistUrlParser, url);
		},
		$elm$url$Url$fromString(urlString));
};
var $author$project$Main$removeDuplicates = A2(
	$elm$core$List$foldr,
	F2(
		function (artist, acc) {
			return A2($elm$core$List$member, artist, acc) ? acc : A2($elm$core$List$cons, artist, acc);
		}),
	_List_Nil);
var $elm$core$Maybe$destruct = F3(
	function (_default, func, maybe) {
		if (!maybe.$) {
			var a = maybe.a;
			return func(a);
		} else {
			return _default;
		}
	});
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$save = _Platform_outgoingPort(
	'save',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'accessToken',
					$elm$json$Json$Encode$string($.m)),
					_Utils_Tuple2(
					'artists',
					$elm$json$Json$Encode$list(
						function ($) {
							return $elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'genres',
										$elm$json$Json$Encode$list($elm$json$Json$Encode$string)($.d8)),
										_Utils_Tuple2(
										'id',
										$elm$json$Json$Encode$string($.ax)),
										_Utils_Tuple2(
										'imgUrl',
										function ($) {
											return A3($elm$core$Maybe$destruct, $elm$json$Json$Encode$null, $elm$json$Json$Encode$string, $);
										}($.ee)),
										_Utils_Tuple2(
										'name',
										$elm$json$Json$Encode$string($.ew))
									]));
						})($.E)),
					_Utils_Tuple2(
					'playlistId',
					$elm$json$Json$Encode$string($.s)),
					_Utils_Tuple2(
					'refreshToken',
					$elm$json$Json$Encode$string($.ac)),
					_Utils_Tuple2(
					'relations',
					$elm$json$Json$Encode$list(
						function ($) {
							var a = $.a;
							var b = $.b;
							return A2(
								$elm$json$Json$Encode$list,
								$elm$core$Basics$identity,
								_List_fromArray(
									[
										$elm$json$Json$Encode$string(a),
										$elm$json$Json$Encode$list($elm$json$Json$Encode$string)(b)
									]));
						})($.am))
				]));
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$Vis$tick = function (model) {
	var _v0 = A2($gampleman$elm_visualization$Force$tick, model.bP, model.al);
	var newSim = _v0.a;
	var newNodes = _v0.b;
	return _Utils_update(
		model,
		{al: newNodes, bP: newSim});
};
var $author$project$Vis$update = F2(
	function (msg, model) {
		var id = msg;
		return _Utils_update(
			model,
			{bC: id});
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var result = msg.a;
				if (!result.$) {
					var ids = result.a;
					var _v2 = model.e;
					if (!_v2.$) {
						var soFar = _v2.a;
						var all = _Utils_ap(ids, soFar);
						if (!ids.b) {
							if (!all.b) {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											e: $author$project$Main$OtherError('Spotify API returned no songs')
										}),
									$elm$core$Platform$Cmd$none);
							} else {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											e: $author$project$Main$FetchingArtistData(
												{a3: all, E: _List_Nil})
										}),
									$author$project$Spotify$fetchArtistsData(
										{
											m: model.m,
											a3: A2($elm$core$List$take, $author$project$Main$fourtyNine, all),
											aX: $author$project$Main$GotArtistData(
												A2($elm$core$List$drop, $author$project$Main$fourtyNine, all))
										}));
							}
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										e: $author$project$Main$FetchingPlaylistData(all)
									}),
								$author$project$Spotify$fetchPlaylistData(
									{
										m: model.m,
										c0: $elm$core$List$length(all),
										s: model.s,
										aX: $author$project$Main$GotPlaylistData
									}));
						}
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{e: $author$project$Main$badMsg}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					var e = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								e: $author$project$Main$HttpError(e)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 1:
				var nextLot = msg.a;
				var result = msg.b;
				if (!result.$) {
					var newArtists = result.a;
					var _v6 = model.e;
					if (_v6.$ === 1) {
						var artistIds = _v6.a.a3;
						var artists = _v6.a.E;
						var all = _Utils_ap(artists, newArtists);
						if (!nextLot.b) {
							if (!all.b) {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											e: $author$project$Main$OtherError('API never returned any songs')
										}),
									$elm$core$Platform$Cmd$none);
							} else {
								var next = all.a;
								var more = all.b;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											e: $author$project$Main$FetchingRelatedArtists(
												{
													E: $author$project$Main$removeDuplicates(all),
													am: $elm$core$Dict$empty
												})
										}),
									$author$project$Spotify$fetchRelatedArtists(
										{
											m: model.m,
											ax: next.ax,
											aX: A2(
												$author$project$Main$GotRelatedArtistsData,
												next.ax,
												A2(
													$elm$core$List$map,
													function ($) {
														return $.ax;
													},
													more))
										}));
							}
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										e: $author$project$Main$FetchingArtistData(
											{a3: artistIds, E: all})
									}),
								$author$project$Spotify$fetchArtistsData(
									{
										m: model.m,
										a3: A2($elm$core$List$take, $author$project$Main$fourtyNine, nextLot),
										aX: $author$project$Main$GotArtistData(
											A2($elm$core$List$drop, $author$project$Main$fourtyNine, nextLot))
									}));
						}
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{e: $author$project$Main$badMsg}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					var e = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								e: $author$project$Main$HttpError(e)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 2:
				var id = msg.a;
				var remaining = msg.b;
				var result = msg.c;
				if (!result.$) {
					var _new = result.a;
					var _v10 = model.e;
					if (_v10.$ === 2) {
						var artists = _v10.a.E;
						var relations = _v10.a.am;
						var all = A3(
							$elm$core$Dict$insert,
							id,
							A2(
								$elm$core$List$filter,
								function (artist) {
									return A2(
										$elm$core$List$member,
										artist,
										A2(
											$elm$core$List$map,
											function ($) {
												return $.ax;
											},
											artists));
								},
								_new),
							relations);
						if (!remaining.b) {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										e: $author$project$Main$Completed(
											A2($author$project$Vis$init, artists, all))
									}),
								$author$project$Main$save(
									{
										m: model.m,
										E: artists,
										s: model.s,
										ac: model.ac,
										am: $elm$core$Dict$toList(all)
									}));
						} else {
							var next = remaining.a;
							var more = remaining.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										e: $author$project$Main$FetchingRelatedArtists(
											{E: artists, am: all})
									}),
								$author$project$Spotify$fetchRelatedArtists(
									{
										m: model.m,
										ax: next,
										aX: A2($author$project$Main$GotRelatedArtistsData, next, more)
									}));
						}
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{e: $author$project$Main$badMsg}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					var e = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								e: $author$project$Main$HttpError(e)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 5:
				var _v12 = model.e;
				if (_v12.$ === 3) {
					var vis = _v12.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								e: $author$project$Main$Completed(
									$author$project$Vis$tick(vis))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 6:
				var vMsg = msg.a;
				var _v13 = model.e;
				if (_v13.$ === 3) {
					var vis = _v13.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								e: $author$project$Main$Completed(
									A2($author$project$Vis$update, vMsg, vis))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 4:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							e: $author$project$Main$OtherError('url request')
						}),
					$elm$core$Platform$Cmd$none);
			case 3:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							e: $author$project$Main$OtherError('url change')
						}),
					$elm$core$Platform$Cmd$none);
			case 8:
				var _new = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{m: _new}),
					$elm$core$Platform$Cmd$none);
			case 9:
				var _new = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{s: _new}),
					$elm$core$Platform$Cmd$none);
			case 7:
				var _v14 = A2(
					$elm$core$Maybe$andThen,
					function (old) {
						return _Utils_eq(old.s, model.s) ? $elm$core$Maybe$Just(old) : $elm$core$Maybe$Nothing;
					},
					model.ca);
				if (!_v14.$) {
					var saveFile = _v14.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								e: $author$project$Main$Completed(
									A2(
										$author$project$Vis$init,
										saveFile.E,
										$elm$core$Dict$fromList(saveFile.am)))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								e: $author$project$Main$FetchingPlaylistData(_List_Nil)
							}),
						$author$project$Spotify$fetchPlaylistData(
							{m: model.m, c0: 0, s: model.s, aX: $author$project$Main$GotPlaylistData}));
				}
			case 10:
				return _Utils_Tuple2(model, $author$project$Main$getToken);
			case 12:
				var url = msg.a;
				var _v15 = $author$project$Main$parsePlaylistUrl(url);
				if (!_v15.$) {
					var id = _v15.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								s: id,
								e: $author$project$Main$FetchingPlaylistData(_List_Nil)
							}),
						$author$project$Spotify$fetchPlaylistData(
							{m: model.m, c0: 0, s: id, aX: $author$project$Main$GotPlaylistData}));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								e: $author$project$Main$OtherError('bad playlist url - no parse :(')
							}),
						$elm$core$Platform$Cmd$none);
				}
			default:
				var _new = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							e: function () {
								var _v16 = model.e;
								if (_v16.$ === 7) {
									return $author$project$Main$ChoosePlaylist(_new);
								} else {
									return $author$project$Main$badMsg;
								}
							}()
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$VisMsg = function (a) {
	return {$: 6, a: a};
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$svg$Svg$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNodeNS('http://www.w3.org/2000/svg');
var $author$project$Vis$keyedG = $elm$svg$Svg$Keyed$node('g');
var $elm$virtual_dom$VirtualDom$lazy = _VirtualDom_lazy;
var $elm$svg$Svg$Lazy$lazy = $elm$virtual_dom$VirtualDom$lazy;
var $elm$virtual_dom$VirtualDom$lazy2 = _VirtualDom_lazy2;
var $elm$svg$Svg$Lazy$lazy2 = $elm$virtual_dom$VirtualDom$lazy2;
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $author$project$Vis$lookup = F2(
	function (nodes, id) {
		var _v0 = A2(
			$elm$core$List$filter,
			function (n) {
				return _Utils_eq(n.ax, id);
			},
			nodes);
		if (_v0.b && (!_v0.b.b)) {
			var x = _v0.a;
			return $elm$core$Maybe$Just(x);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$core$Basics$round = _Basics_round;
var $author$project$Vis$s = function (x) {
	return $elm$core$String$fromFloat(
		$elm$core$Basics$round(x * 100) / 100);
};
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$Vis$viewHoverNodeOverlay = F2(
	function (id, nodes) {
		var _v0 = A2($author$project$Vis$lookup, nodes, id);
		if (!_v0.$) {
			var node = _v0.a;
			return A2(
				$elm$svg$Svg$text_,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('hoverText'),
						$elm$svg$Svg$Attributes$x(
						$author$project$Vis$s(node.aJ - 25)),
						$elm$svg$Svg$Attributes$y(
						$author$project$Vis$s(node.aK - 20))
					]),
				_List_fromArray(
					[
						$elm$svg$Svg$text(
						_Utils_ap(
							node.ew,
							($elm$core$List$length(node.d8) > 0) ? (' (' + (A2($elm$core$String$join, ', ', node.d8) + ')')) : ''))
					]));
		} else {
			return A2($elm$svg$Svg$g, _List_Nil, _List_Nil);
		}
	});
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $elm$core$String$fromList = _String_fromList;
var $author$project$Vis$fromN = function (c) {
	switch (c) {
		case 0:
			return '0';
		case 1:
			return '1';
		case 2:
			return '2';
		case 3:
			return '3';
		case 4:
			return '4';
		case 5:
			return '5';
		case 6:
			return '6';
		case 7:
			return '7';
		case 8:
			return '8';
		case 9:
			return '9';
		case 10:
			return 'a';
		case 11:
			return 'b';
		case 12:
			return 'c';
		case 13:
			return 'd';
		case 14:
			return 'e';
		default:
			return 'f';
	}
};
var $author$project$Vis$toN = function (c) {
	switch (c) {
		case '0':
			return 0;
		case '1':
			return 1;
		case '2':
			return 2;
		case '3':
			return 3;
		case '4':
			return 4;
		case '5':
			return 5;
		case '6':
			return 6;
		case '7':
			return 7;
		case '8':
			return 8;
		case '9':
			return 9;
		case 'a':
			return 10;
		case 'b':
			return 11;
		case 'c':
			return 12;
		case 'd':
			return 13;
		case 'e':
			return 14;
		default:
			return 15;
	}
};
var $author$project$Vis$mixChar = F2(
	function (a, b) {
		return $author$project$Vis$fromN(
			(($author$project$Vis$toN(a) + $author$project$Vis$toN(b)) / 2) | 0);
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $author$project$Vis$mix = F2(
	function (color1, color2) {
		var _v0 = _Utils_Tuple2(
			$elm$core$String$toList(color1),
			$elm$core$String$toList(color2));
		if (((((((((((((((((_v0.a.b && ('#' === _v0.a.a)) && _v0.a.b.b) && _v0.a.b.b.b) && _v0.a.b.b.b.b) && _v0.a.b.b.b.b.b) && _v0.a.b.b.b.b.b.b) && _v0.a.b.b.b.b.b.b.b) && (!_v0.a.b.b.b.b.b.b.b.b)) && _v0.b.b) && ('#' === _v0.b.a)) && _v0.b.b.b) && _v0.b.b.b.b) && _v0.b.b.b.b.b) && _v0.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b) && (!_v0.b.b.b.b.b.b.b.b.b)) {
			var _v1 = _v0.a;
			var _v2 = _v1.b;
			var r1a = _v2.a;
			var _v3 = _v2.b;
			var r1b = _v3.a;
			var _v4 = _v3.b;
			var g1a = _v4.a;
			var _v5 = _v4.b;
			var g1b = _v5.a;
			var _v6 = _v5.b;
			var b1a = _v6.a;
			var _v7 = _v6.b;
			var b1b = _v7.a;
			var _v8 = _v0.b;
			var _v9 = _v8.b;
			var r2a = _v9.a;
			var _v10 = _v9.b;
			var r2b = _v10.a;
			var _v11 = _v10.b;
			var g2a = _v11.a;
			var _v12 = _v11.b;
			var g2b = _v12.a;
			var _v13 = _v12.b;
			var b2a = _v13.a;
			var _v14 = _v13.b;
			var b2b = _v14.a;
			return $elm$core$String$fromList(
				_List_fromArray(
					[
						'#',
						A2($author$project$Vis$mixChar, r1a, r2a),
						A2($author$project$Vis$mixChar, r1b, r2b),
						A2($author$project$Vis$mixChar, g1a, g2a),
						A2($author$project$Vis$mixChar, g1b, g2b),
						A2($author$project$Vis$mixChar, b1a, b2a),
						A2($author$project$Vis$mixChar, b1b, b2b)
					]));
		} else {
			return '#888888';
		}
	});
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $author$project$Vis$viewLine = F3(
	function (nodes, from, to) {
		var _v0 = _Utils_Tuple2(
			A2($author$project$Vis$lookup, nodes, from),
			A2($author$project$Vis$lookup, nodes, to));
		if ((!_v0.a.$) && (!_v0.b.$)) {
			var a = _v0.a.a;
			var b = _v0.b.a;
			return A2(
				$elm$svg$Svg$g,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$line,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$x1(
								$author$project$Vis$s(a.aJ)),
								$elm$svg$Svg$Attributes$y1(
								$author$project$Vis$s(a.aK)),
								$elm$svg$Svg$Attributes$x2(
								$author$project$Vis$s(b.aJ)),
								$elm$svg$Svg$Attributes$y2(
								$author$project$Vis$s(b.aK)),
								$elm$svg$Svg$Attributes$stroke(
								A2($author$project$Vis$mix, a.br, b.br)),
								$elm$svg$Svg$Attributes$strokeWidth('4px')
							]),
						_List_Nil)
					]));
		} else {
			return A2($elm$svg$Svg$g, _List_Nil, _List_Nil);
		}
	});
var $author$project$Vis$viewLink = F2(
	function (nodes, _v0) {
		var from = _v0.a;
		var tos = _v0.b;
		return A2(
			$elm$svg$Svg$g,
			_List_Nil,
			A2(
				$elm$core$List$map,
				A2($author$project$Vis$viewLine, nodes, from),
				tos));
	});
var $author$project$Vis$MouseOver = $elm$core$Basics$identity;
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$image = $elm$svg$Svg$trustedNode('image');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$svg$Svg$Events$onMouseOut = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseout',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$svg$Svg$Events$onMouseOver = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseover',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$Attributes$xlinkHref = function (value) {
	return A3(
		_VirtualDom_attributeNS,
		'http://www.w3.org/1999/xlink',
		'xlink:href',
		_VirtualDom_noJavaScriptUri(value));
};
var $author$project$Vis$viewNode = F2(
	function (hovered, node) {
		var radius = '28.3px';
		var img = function () {
			var _v0 = node.ee;
			if (!_v0.$) {
				var href = _v0.a;
				return A2(
					$elm$svg$Svg$image,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$author$project$Vis$s(node.aJ)),
							$elm$svg$Svg$Attributes$y(
							$author$project$Vis$s(node.aK)),
							$elm$svg$Svg$Attributes$xlinkHref(href),
							$elm$svg$Svg$Attributes$class('nodeImage')
						]),
					_List_Nil);
			} else {
				return A2($elm$svg$Svg$g, _List_Nil, _List_Nil);
			}
		}();
		var hoverZone = A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$r(radius),
					$elm$svg$Svg$Events$onMouseOver(node.ax),
					$elm$svg$Svg$Events$onMouseOut(''),
					$elm$svg$Svg$Attributes$cx(
					$author$project$Vis$s(node.aJ)),
					$elm$svg$Svg$Attributes$cy(
					$author$project$Vis$s(node.aK)),
					$elm$svg$Svg$Attributes$fill('transparent')
				]),
			_List_Nil);
		var circ = A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$r(radius),
					$elm$svg$Svg$Attributes$cx(
					$author$project$Vis$s(node.aJ)),
					$elm$svg$Svg$Attributes$cy(
					$author$project$Vis$s(node.aK)),
					$elm$svg$Svg$Attributes$fill(node.br)
				]),
			_List_Nil);
		return A2(
			$elm$svg$Svg$g,
			_List_Nil,
			hovered ? _List_fromArray(
				[circ, img, hoverZone]) : _List_fromArray(
				[circ, img, hoverZone]));
	});
var $author$project$Vis$viewNodeHelper = F2(
	function (id, node) {
		return A2(
			$author$project$Vis$viewNode,
			_Utils_eq(id, node.ax),
			node);
	});
var $author$project$Vis$view = function (model) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$viewBox('-1000 -1000 2000 2000')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$Lazy$lazy,
				A2(
					$elm$core$Basics$composeL,
					$elm$svg$Svg$g(_List_Nil),
					$elm$core$List$map(
						$author$project$Vis$viewLink(model.al))),
				model.dm),
				A2(
				$author$project$Vis$keyedG,
				_List_Nil,
				A2(
					$elm$core$List$map,
					function (node) {
						return _Utils_Tuple2(
							node.ax,
							A3($elm$svg$Svg$Lazy$lazy2, $author$project$Vis$viewNodeHelper, model.bC, node));
					},
					model.al)),
				A2($author$project$Vis$viewHoverNodeOverlay, model.bC, model.al)
			]));
};
var $author$project$Main$ChangePlaylistUrl = function (a) {
	return {$: 11, a: a};
};
var $author$project$Main$SelectPlaylist = function (a) {
	return {$: 12, a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Main$viewChoosePlaylist = function (url) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('playlist2graph')
					])),
				A2(
				$elm$html$Html$input,
				_List_fromArray(
					[
						$elm$html$Html$Events$onInput($author$project$Main$ChangePlaylistUrl),
						$elm$html$Html$Attributes$placeholder('spotify playlist url'),
						$elm$html$Html$Attributes$value(url)
					]),
				_List_Nil),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick(
						$author$project$Main$SelectPlaylist(url))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('select playlist!')
					]))
			]));
};
var $author$project$Main$RedirectToSpotify = {$: 10};
var $author$project$Main$viewStart = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('playlist2graph')
					])),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick($author$project$Main$RedirectToSpotify)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('sign in with spotify!')
					]))
			]));
};
var $author$project$Main$view = function (model) {
	return {
		fh: _List_fromArray(
			[
				function () {
				var _v0 = model.e;
				switch (_v0.$) {
					case 0:
						var ids = _v0.a;
						return $elm$html$Html$text(
							'loaded in ' + ($elm$core$String$fromInt(
								$elm$core$List$length(ids)) + ' artists'));
					case 1:
						var artistIds = _v0.a.a3;
						var artists = _v0.a.E;
						return $elm$html$Html$text(
							'loading artist details, ' + ($elm$core$String$fromInt(
								$elm$core$List$length(artists)) + ('/' + ($elm$core$String$fromInt(
								$elm$core$List$length(artistIds)) + ' completed'))));
					case 2:
						var artists = _v0.a.E;
						var relations = _v0.a.am;
						return $elm$html$Html$text(
							'loading artist relationships, ' + ($elm$core$String$fromInt(
								$elm$core$Dict$size(relations)) + ('/' + ($elm$core$String$fromInt(
								$elm$core$List$length(artists)) + ' completed'))));
					case 3:
						var vis = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VisMsg,
							$author$project$Vis$view(vis));
					case 4:
						return $elm$html$Html$text('API error');
					case 5:
						var e = _v0.a;
						return $elm$html$Html$text(e);
					case 6:
						return $author$project$Main$viewStart(model);
					default:
						var url = _v0.a;
						return $author$project$Main$viewChoosePlaylist(url);
				}
			}()
			]),
		f7: 'playlist 2 graph'
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{fC: $author$project$Main$init, fO: $author$project$Main$onUrlChange, fP: $author$project$Main$onUrlRequest, f3: $author$project$Main$subscriptions, gf: $author$project$Main$update, gh: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2(
				$elm$json$Json$Decode$map,
				$elm$core$Maybe$Just,
				A2(
					$elm$json$Json$Decode$andThen,
					function (relations) {
						return A2(
							$elm$json$Json$Decode$andThen,
							function (refreshToken) {
								return A2(
									$elm$json$Json$Decode$andThen,
									function (playlistId) {
										return A2(
											$elm$json$Json$Decode$andThen,
											function (artists) {
												return A2(
													$elm$json$Json$Decode$andThen,
													function (accessToken) {
														return $elm$json$Json$Decode$succeed(
															{m: accessToken, E: artists, s: playlistId, ac: refreshToken, am: relations});
													},
													A2($elm$json$Json$Decode$field, 'accessToken', $elm$json$Json$Decode$string));
											},
											A2(
												$elm$json$Json$Decode$field,
												'artists',
												$elm$json$Json$Decode$list(
													A2(
														$elm$json$Json$Decode$andThen,
														function (name) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (imgUrl) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (id) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (genres) {
																					return $elm$json$Json$Decode$succeed(
																						{d8: genres, ax: id, ee: imgUrl, ew: name});
																				},
																				A2(
																					$elm$json$Json$Decode$field,
																					'genres',
																					$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
																		},
																		A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string));
																},
																A2(
																	$elm$json$Json$Decode$field,
																	'imgUrl',
																	$elm$json$Json$Decode$oneOf(
																		_List_fromArray(
																			[
																				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
																			]))));
														},
														A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string)))));
									},
									A2($elm$json$Json$Decode$field, 'playlistId', $elm$json$Json$Decode$string));
							},
							A2($elm$json$Json$Decode$field, 'refreshToken', $elm$json$Json$Decode$string));
					},
					A2(
						$elm$json$Json$Decode$field,
						'relations',
						$elm$json$Json$Decode$list(
							A2(
								$elm$json$Json$Decode$andThen,
								function (_v0) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (_v1) {
											return $elm$json$Json$Decode$succeed(
												_Utils_Tuple2(_v0, _v1));
										},
										A2(
											$elm$json$Json$Decode$index,
											1,
											$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
								},
								A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$string))))))
			])))(0)}});}(this));