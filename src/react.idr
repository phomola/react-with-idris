module React

%foreign "javascript:lambda: (ty, x) => JSON.stringify(x)"
total toJson : a -> String

%foreign "javascript:lambda: (ty1, ty2, l, f) => arrayFromList(l, f)"
total arrayFromList : List a -> (a -> b) -> AnyPtr

%foreign "javascript:lambda: (ty, s) => [s, null]"
total prim__createAppState : a -> AnyPtr

export
data AppState : Type where
    MkAppState : AnyPtr -> AppState

%foreign "javascript:lambda: (ty, s) => s[0]"
total prim__getState : AnyPtr -> a

total getState : AppState -> a
getState (MkAppState ptr) = prim__getState ptr

%foreign "javascript:lambda: (ty, s, ns) => { s[0] = ns; return s; }"
total prim__setState : AnyPtr -> a -> AnyPtr

total setState : AppState -> a -> AppState
setState (MkAppState ptr) state = MkAppState $ prim__setState ptr state

interface Element a where
    total nativeObject : a -> AppState -> AnyPtr

data SomeElement : Type where
    MkSomeElement : Element a => a -> SomeElement

namespace SomeElement
    export
    total nativeObject : SomeElement -> AppState -> AnyPtr
    nativeObject (MkSomeElement el) state = nativeObject el state

data DivElement : Type where
    MkDivElementString : String -> DivElement
    MkDivElementChildren : List SomeElement -> DivElement

%foreign "javascript:lambda: (s) => React.createElement('div', null, s)"
total reactCreateDivString : String -> AnyPtr

%foreign "javascript:lambda: (ch) => React.createElement('div', null, ...ch)"
total reactCreateDivChildren : AnyPtr -> AnyPtr

Element DivElement where
    nativeObject (MkDivElementString text) _ = reactCreateDivString text
    nativeObject (MkDivElementChildren children) state = reactCreateDivChildren $ arrayFromList children (\ch => nativeObject ch state)

namespace DivString
    export
    total mkDiv : String -> SomeElement
    mkDiv text = MkSomeElement $ MkDivElementString text

namespace DivChildren
    export
    total mkDiv : List SomeElement -> SomeElement
    mkDiv children = MkSomeElement $ MkDivElementChildren children

data H1Element : Type where
    MkH1Element : String -> H1Element

%foreign "javascript:lambda: (s) => React.createElement('h1', null, s)"
total reactCreateH1 : String -> AnyPtr

Element H1Element where
    nativeObject (MkH1Element text) _ = reactCreateH1 text

export
total mkH1 : String -> SomeElement
mkH1 text = MkSomeElement $ MkH1Element text

export
data Context : Type -> Type where
    MkContext : AppState -> Context a

data ButtonElement : Type -> Type where
    MkButtonElement : String -> (a -> a) -> ButtonElement a

%foreign "javascript:lambda: (s, f) => React.createElement('button', {onClick: () => { let s = f(); s[1](s[0]); }}, s)"
total reactCreateButton : String -> (() -> AnyPtr) -> AnyPtr

Element (ButtonElement a) where
    nativeObject (MkButtonElement text handler) appstate =
        reactCreateButton text (\_ => do
            let state = getState appstate
            let newState = handler state
            let (MkAppState ptr) = setState appstate newState
            ptr)

export
total mkButton : Context a -> String -> (a -> a) -> SomeElement
mkButton _ text handler = MkSomeElement $ MkButtonElement text handler

namespace Context
    export
    total getState : Context a -> a
    getState (MkContext appstate) = getState appstate

public export
data App : Type -> Type where
    MkApp : a -> (Context a -> SomeElement) -> App a

%foreign "javascript:lambda: (f, s) => { window._reactApp = function() { const [st, setter] = React.useState(s[0]); s[1] = setter; return f(); } }"
total prim__runApp : (() -> AnyPtr) -> AnyPtr -> PrimIO ()

export
total runApp : HasIO io => App a -> io ()
runApp (MkApp state elfun) = do
    let nats = prim__createAppState state
    let appstate = MkAppState nats
    let context = MkContext appstate
    primIO $ prim__runApp (\_ => nativeObject (elfun context) appstate) nats

export
Interpolation Int where
    interpolate n = show n

