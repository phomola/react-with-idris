class IdrisError extends Error { }

function __prim_js2idris_array(x){
  let acc = { h:0 };

  for (let i = x.length-1; i>=0; i--) {
      acc = { a1:x[i], a2:acc };
  }
  return acc;
}

function __prim_idris2js_array(x){
  const result = Array();
  while (x.h === undefined) {
    result.push(x.a1); x = x.a2;
  }
  return result;
}

function __lazy(thunk) {
  let res;
  return function () {
    if (thunk === undefined) return res;
    res = thunk();
    thunk = undefined;
    return res;
  };
};

function __prim_stringIteratorNew(_str) {
  return 0
}

function __prim_stringIteratorToString(_, str, it, f) {
  return f(str.slice(it))
}

function __prim_stringIteratorNext(str, it) {
  if (it >= str.length)
    return {h: 0};
  else
    return {a1: str.charAt(it), a2: it + 1};
}

function __tailRec(f,ini) {
  let obj = ini;
  while(true){
    switch(obj.h){
      case 0: return obj.a1;
      default: obj = f(obj);
    }
  }
}

const _idrisworld = Symbol('idrisworld')

const _crashExp = x=>{throw new IdrisError(x)}

const _bigIntOfString = s=> {
  try {
    const idx = s.indexOf('.')
    return idx === -1 ? BigInt(s) : BigInt(s.slice(0, idx))
  } catch (e) { return 0n }
}

const _numberOfString = s=> {
  try {
    const res = Number(s);
    return isNaN(res) ? 0 : res;
  } catch (e) { return 0 }
}

const _intOfString = s=> Math.trunc(_numberOfString(s))

const _truncToChar = x=> String.fromCodePoint(
  (x >= 0 && x <= 55295) || (x >= 57344 && x <= 1114111) ? x : 0
)

// Int8
const _truncInt8 = x => {
  const res = x & 0xff;
  return res >= 0x80 ? res - 0x100 : res;
}

const _truncBigInt8 = x => Number(BigInt.asIntN(8, x))

// Euclidian Division
const _div = (a,b) => {
  const q = Math.trunc(a / b)
  const r = a % b
  return r < 0 ? (b > 0 ? q - 1 : q + 1) : q
}

const _divBigInt = (a,b) => {
  const q = a / b
  const r = a % b
  return r < 0n ? (b > 0n ? q - 1n : q + 1n) : q
}

// Euclidian Modulo
const _mod = (a,b) => {
  const r = a % b
  return r < 0 ? (b > 0 ? r + b : r - b) : r
}

const _modBigInt = (a,b) => {
  const r = a % b
  return r < 0n ? (b > 0n ? r + b : r - b) : r
}

const _add8s = (a,b) => _truncInt8(a + b)
const _sub8s = (a,b) => _truncInt8(a - b)
const _mul8s = (a,b) => _truncInt8(a * b)
const _div8s = (a,b) => _truncInt8(_div(a,b))
const _shl8s = (a,b) => _truncInt8(a << b)
const _shr8s = (a,b) => _truncInt8(a >> b)

// Int16
const _truncInt16 = x => {
  const res = x & 0xffff;
  return res >= 0x8000 ? res - 0x10000 : res;
}

const _truncBigInt16 = x => Number(BigInt.asIntN(16, x))

const _add16s = (a,b) => _truncInt16(a + b)
const _sub16s = (a,b) => _truncInt16(a - b)
const _mul16s = (a,b) => _truncInt16(a * b)
const _div16s = (a,b) => _truncInt16(_div(a,b))
const _shl16s = (a,b) => _truncInt16(a << b)
const _shr16s = (a,b) => _truncInt16(a >> b)

//Int32
const _truncInt32 = x => x & 0xffffffff

const _truncBigInt32 = x => Number(BigInt.asIntN(32, x))

const _add32s = (a,b) => _truncInt32(a + b)
const _sub32s = (a,b) => _truncInt32(a - b)
const _div32s = (a,b) => _truncInt32(_div(a,b))

const _mul32s = (a,b) => {
  const res = a * b;
  if (res <= Number.MIN_SAFE_INTEGER || res >= Number.MAX_SAFE_INTEGER) {
    return _truncInt32((a & 0xffff) * b + (b & 0xffff) * (a & 0xffff0000))
  } else {
    return _truncInt32(res)
  }
}

//Int64
const _truncBigInt64 = x => BigInt.asIntN(64, x)

const _add64s = (a,b) => _truncBigInt64(a + b)
const _sub64s = (a,b) => _truncBigInt64(a - b)
const _mul64s = (a,b) => _truncBigInt64(a * b)
const _shl64s = (a,b) => _truncBigInt64(a << b)
const _div64s = (a,b) => _truncBigInt64(_divBigInt(a,b))
const _shr64s = (a,b) => _truncBigInt64(a >> b)

//Bits8
const _truncUInt8 = x => x & 0xff

const _truncUBigInt8 = x => Number(BigInt.asUintN(8, x))

const _add8u = (a,b) => (a + b) & 0xff
const _sub8u = (a,b) => (a - b) & 0xff
const _mul8u = (a,b) => (a * b) & 0xff
const _div8u = (a,b) => Math.trunc(a / b)
const _shl8u = (a,b) => (a << b) & 0xff
const _shr8u = (a,b) => (a >> b) & 0xff

//Bits16
const _truncUInt16 = x => x & 0xffff

const _truncUBigInt16 = x => Number(BigInt.asUintN(16, x))

const _add16u = (a,b) => (a + b) & 0xffff
const _sub16u = (a,b) => (a - b) & 0xffff
const _mul16u = (a,b) => (a * b) & 0xffff
const _div16u = (a,b) => Math.trunc(a / b)
const _shl16u = (a,b) => (a << b) & 0xffff
const _shr16u = (a,b) => (a >> b) & 0xffff

//Bits32
const _truncUBigInt32 = x => Number(BigInt.asUintN(32, x))

const _truncUInt32 = x => {
  const res = x & -1;
  return res < 0 ? res + 0x100000000 : res;
}

const _add32u = (a,b) => _truncUInt32(a + b)
const _sub32u = (a,b) => _truncUInt32(a - b)
const _mul32u = (a,b) => _truncUInt32(_mul32s(a,b))
const _div32u = (a,b) => Math.trunc(a / b)

const _shl32u = (a,b) => _truncUInt32(a << b)
const _shr32u = (a,b) => _truncUInt32(a <= 0x7fffffff ? a >> b : (b == 0 ? a : (a >> b) ^ ((-0x80000000) >> (b-1))))
const _and32u = (a,b) => _truncUInt32(a & b)
const _or32u = (a,b)  => _truncUInt32(a | b)
const _xor32u = (a,b) => _truncUInt32(a ^ b)

//Bits64
const _truncUBigInt64 = x => BigInt.asUintN(64, x)

const _add64u = (a,b) => BigInt.asUintN(64, a + b)
const _mul64u = (a,b) => BigInt.asUintN(64, a * b)
const _div64u = (a,b) => a / b
const _shl64u = (a,b) => BigInt.asUintN(64, a << b)
const _shr64u = (a,b) => BigInt.asUintN(64, a >> b)
const _sub64u = (a,b) => BigInt.asUintN(64, a - b)

//String
const _strReverse = x => x.split('').reverse().join('')

const _substr = (o,l,x) => x.slice(o, o + l)

const React_reactCreateH1 = ( (s) => React.createElement('h1', null, s));
const React_reactCreateDivString = ( (s) => React.createElement('div', null, s));
const React_reactCreateDivChildren = ( (ch) => React.createElement('div', null, ...ch));
const React_reactCreateButton = ( (s, f) => React.createElement('button', {onClick: () => { let s = f(); s[1](s[0]); }}, s));
const React_prim__setState = ( (ty, s, ns) => { s[0] = ns; return s; });
const React_prim__runApp = ( (f, s) => { window._reactApp = function() { const [st, setter] = React.useState(s[0]); s[1] = setter; return f(); } });
const React_prim__getState = ( (ty, s) => s[0]);
const React_prim__createAppState = ( (ty, s) => [s, null]);
const React_arrayFromList = ( (ty1, ty2, l, f) => arrayFromList(l, f));
/* {$tcOpt:1} */
function x24tcOpt_1($0) {
 switch($0.a3.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:1} */, a1: $0.a2};
  case undefined: /* cons */ return {h: 1 /* {TcContinue1:1} */, a1: $0.a1, a2: $0.a1($0.a2)($0.a3.a1), a3: $0.a3.a2};
 }
}

/* Prelude.Types.foldl */
function Prelude_Types_foldl_Foldable_List($0, $1, $2) {
 return __tailRec(x24tcOpt_1, {h: 1 /* {TcContinue1:1} */, a1: $0, a2: $1, a3: $2});
}

/* {__mainExpression:0} */
const __mainExpression_0 = __lazy(function () {
 return PrimIO_unsafePerformIO(Main_main());
});

/* {csegen:20} */
const csegen_20 = __lazy(function () {
 return $0 => $1 => React_nativeObject_Element_DivElement($0, $1);
});

/* prim__sub_Integer : Integer -> Integer -> Integer */
function prim__sub_Integer($0, $1) {
 return ($0-$1);
}

/* Main.main : IO () */
const Main_main = __lazy(function () {
 const $e = b => a => $f => $10 => $11 => {
  const $12 = $f($11);
  const $15 = $10($11);
  return $12($15);
 };
 const $3 = {a1: b => a => func => $5 => $6 => Prelude_IO_map_Functor_IO(func, $5, $6), a2: a => $c => $d => $c, a3: $e};
 const $1a = b => a => $1b => $1c => $1d => {
  const $1e = $1b($1d);
  return $1c($1e)($1d);
 };
 const $25 = a => $26 => $27 => {
  const $28 = $26($27);
  return $28($27);
 };
 const $2 = {a1: $3, a2: $1a, a3: $25};
 const $1 = {a1: $2, a2: a => $2e => $2e};
 return React_runApp($1, Main_app(0));
});

/* Main.app : State -> App State */
function Main_app($0) {
 const $2 = context => {
  const $1c = React_Context_getState(context);
  const $1b = $1c;
  const $19 = React_interpolate_Interpolation_Int($1b);
  const $18 = {a1: $19, a2: {a1: ' times', a2: {h: 0}}};
  const $16 = {a1: 'Clicked ', a2: $18};
  const $b = Prelude_Types_foldMap_Foldable_List({a1: $f => $10 => ($f+$10), a2: ''}, $15 => $15, $16);
  const $9 = React_DivString_mkDiv($b);
  const $27 = state => {
   const $28 = state;
   const $2a = state;
   const $29 = $2a;
   return _add32s($29, 1);
  };
  const $23 = React_mkButton(context, 'Click me', $27);
  const $22 = {a1: $23, a2: {h: 0}};
  const $8 = {a1: $9, a2: $22};
  const $4 = {a1: React_mkH1('React with Idris'), a2: $8};
  return React_DivChildren_mkDiv($4);
 };
 return {a1: $0, a2: $2};
}

/* React.nativeObject */
function React_nativeObject_Element_H1Element($0, $1) {
 const $2 = $0;
 return React_reactCreateH1($2);
}

/* React.nativeObject */
function React_nativeObject_Element_DivElement($0, $1) {
 switch($0.h) {
  case 0: /* MkDivElementString */ return React_reactCreateDivString($0.a1);
  case 1: /* MkDivElementChildren */ return React_reactCreateDivChildren(React_arrayFromList(undefined, undefined, $0.a1, ch => React_SomeElement_nativeObject(ch, $1)));
 }
}

/* React.nativeObject */
function React_nativeObject_Element_x28ButtonElementx20x24ax29($0, $1) {
 const $5 = $6 => {
  const $7 = React_getState($1);
  const $a = $0.a2($7);
  const $d = React_setState($1, $a);
  return $d;
 };
 return React_reactCreateButton($0.a1, $5);
}

/* React.interpolate */
function React_interpolate_Interpolation_Int($0) {
 return Prelude_Show_show_Show_Int($0);
}

/* React.setState : AppState -> a -> AppState */
function React_setState($0, $1) {
 const $2 = $0;
 return React_prim__setState(undefined, $2, $1);
}

/* React.runApp : HasIO io => App a -> io () */
function React_runApp($0, $1) {
 const $3 = React_prim__createAppState(undefined, $1.a1);
 const $7 = $3;
 const $8 = $7;
 return $0.a2(undefined)($e => React_prim__runApp($11 => React_SomeElement_nativeObject($1.a2($8), $7), $3, $e));
}

/* React.SomeElement.nativeObject : SomeElement -> AppState -> AnyPtr */
function React_SomeElement_nativeObject($0, $1) {
 const $5 = $0.a1;
 const $4 = $6 => $7 => $5($6)($7);
 const $3 = $4($0.a2);
 return $3($1);
}

/* React.mkH1 : String -> SomeElement */
function React_mkH1($0) {
 return {a1: $2 => $3 => React_nativeObject_Element_H1Element($2, $3), a2: $0};
}

/* React.DivString.mkDiv : String -> SomeElement */
function React_DivString_mkDiv($0) {
 return {a1: csegen_20(), a2: {h: 0 /* MkDivElementString */, a1: $0}};
}

/* React.DivChildren.mkDiv : List SomeElement -> SomeElement */
function React_DivChildren_mkDiv($0) {
 return {a1: csegen_20(), a2: {h: 1 /* MkDivElementChildren */, a1: $0}};
}

/* React.mkButton : Context a -> String -> (a -> a) -> SomeElement */
function React_mkButton($0, $1, $2) {
 return {a1: $4 => $5 => React_nativeObject_Element_x28ButtonElementx20x24ax29($4, $5), a2: {a1: $1, a2: $2}};
}

/* React.getState : AppState -> a */
function React_getState($0) {
 const $1 = $0;
 return React_prim__getState(undefined, $1);
}

/* React.Context.getState : Context a -> a */
function React_Context_getState($0) {
 const $1 = $0;
 return React_getState($1);
}

/* Prelude.Types.foldMap */
function Prelude_Types_foldMap_Foldable_List($0, $1, $2) {
 const $4 = acc => elem => {
  const $7 = $0.a1;
  const $6 = $9 => $a => $7($9)($a);
  const $5 = $6(acc);
  return $5($1(elem));
 };
 return Prelude_Types_foldl_Foldable_List($4, $0.a2, $2);
}

/* Prelude.Types.prim__integerToNat : Integer -> Nat */
function Prelude_Types_prim__integerToNat($0) {
 let $1;
 switch(((0n<=$0)?1:0)) {
  case 0: {
   $1 = 0;
   break;
  }
  default: $1 = 1;
 }
 switch($1) {
  case 1: return $0;
  case 0: return 0n;
 }
}

/* Prelude.EqOrd.compare */
function Prelude_EqOrd_compare_Ord_Integer($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_Integer($0, $1)) {
  case 1: return 0;
  case 0: {
   switch(Prelude_EqOrd_x3dx3d_Eq_Integer($0, $1)) {
    case 1: return 1;
    case 0: return 2;
   }
  }
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Ordering($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  case 2: {
   switch($1) {
    case 2: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Integer($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Char($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.< */
function Prelude_EqOrd_x3c_Ord_Integer($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd./= */
function Prelude_EqOrd_x2fx3d_Eq_Ordering($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Ordering($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.EqOrd.compareInteger : Integer -> Integer -> Ordering */
function Prelude_EqOrd_compareInteger($0, $1) {
 return Prelude_EqOrd_compare_Ord_Integer($0, $1);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Int($0) {
 return Prelude_Show_showPrec_Show_Int({h: 0 /* Open */}, $0);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_Int($0, $1) {
 return Prelude_Show_primNumShow($4 => (''+$4), $0, $1);
}

/* Prelude.Show.compare */
function Prelude_Show_compare_Ord_Prec($0, $1) {
 switch($0.h) {
  case 4: /* User */ {
   switch($1.h) {
    case 4: /* User */ return Prelude_EqOrd_compare_Ord_Integer($0.a1, $1.a1);
    default: return Prelude_EqOrd_compare_Ord_Integer(Prelude_Show_precCon($0), Prelude_Show_precCon($1));
   }
  }
  default: return Prelude_EqOrd_compare_Ord_Integer(Prelude_Show_precCon($0), Prelude_Show_precCon($1));
 }
}

/* Prelude.Show.>= */
function Prelude_Show_x3ex3d_Ord_Prec($0, $1) {
 return Prelude_EqOrd_x2fx3d_Eq_Ordering(Prelude_Show_compare_Ord_Prec($0, $1), 0);
}

/* Prelude.Show.showParens : Bool -> String -> String */
function Prelude_Show_showParens($0, $1) {
 switch($0) {
  case 0: return $1;
  case 1: return ('('+($1+')'));
 }
}

/* Prelude.Show.primNumShow : (a -> String) -> Prec -> a -> String */
function Prelude_Show_primNumShow($0, $1, $2) {
 const $3 = $0($2);
 let $7;
 switch(Prelude_Show_x3ex3d_Ord_Prec($1, {h: 5 /* PrefixMinus */})) {
  case 1: {
   $7 = Prelude_Show_firstCharIs($e => Prelude_EqOrd_x3dx3d_Eq_Char($e, '-'), $3);
   break;
  }
  case 0: {
   $7 = 0;
   break;
  }
 }
 return Prelude_Show_showParens($7, $3);
}

/* Prelude.Show.precCon : Prec -> Integer */
function Prelude_Show_precCon($0) {
 switch($0.h) {
  case 0: /* Open */ return 0n;
  case 1: /* Equal */ return 1n;
  case 2: /* Dollar */ return 2n;
  case 3: /* Backtick */ return 3n;
  case 4: /* User */ return 4n;
  case 5: /* PrefixMinus */ return 5n;
  case 6: /* App */ return 6n;
 }
}

/* Prelude.Show.firstCharIs : (Char -> Bool) -> String -> Bool */
function Prelude_Show_firstCharIs($0, $1) {
 switch($1) {
  case '': return 0;
  default: return $0(($1.charAt(0)));
 }
}

/* Prelude.IO.map */
function Prelude_IO_map_Functor_IO($0, $1, $2) {
 const $3 = $1($2);
 return $0($3);
}

/* PrimIO.unsafePerformIO : IO a -> a */
function PrimIO_unsafePerformIO($0) {
 const $1 = $0;
 const $3 = w => {
  const $4 = $1(w);
  return $4;
 };
 return PrimIO_unsafeCreateWorld($3);
}

/* PrimIO.unsafeCreateWorld : (1 _ : ((1 _ : %World) -> a)) -> a */
function PrimIO_unsafeCreateWorld($0) {
 return $0(_idrisworld);
}


try{__mainExpression_0()}catch(e){if(e instanceof IdrisError){console.log('ERROR: ' + e.message)}else{throw e} }
