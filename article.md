**This is a work in progress**

# Writing React apps with Idris

React is a Javascript framework for writing web apps.
Like Flutter, its approach to building GUIs is almost purely functional.
Let's look at how one could use React with a purely functional language.

I picked [Idris](https://www.idris-lang.org) because it's a purely functional language with an easy-to-use Javascript backend.
Syntactically, it's similar to Haskell and Purescript. It has a rich standard library but we won't use it in this small experiment.

The `main` function is very simple. The `app` argument is a function and we also pass a state to the `runApp` function.

```
total main : IO ()
main = do
    runApp $ app $ MkState 0
```

The state of the app is defined by the following record:

```
record State where
    constructor MkState
    count : Int
```

It has only one property, `count`. The `MkState` constructor is used in the `main` function to create the initial state instance.

The `app` function builds the app:

```
total app : State -> App State
app state = do
    MkApp state $ \context => mkDiv [
        mkH1 "React with Idris",
        mkDiv "Clicked \{ (getState context).count } times",
        mkButton context "Click me" (\state => { count := state.count + 1 } state)
    ]
```

The `state` argument is the initial state. The function returns an instance of the generic `App` type, which is used by the runtime to build the DOM.

The `MkApp` constructor takes the initial state and a function that creates the structure of the app.
For example, `mkDiv` represents the `<div>` element in JSX and `mkH1` represents the `<h1>` element.

The `mkButton` function is slightly more complex because it uses an anonymous function,
which is used when the user clicks the button.
In this app it creates a new state with the `count` property increased by one.
The runtime then updates the UI.

Below is the complete code of the app:

```
module Main

import React

record State where
    constructor MkState
    count : Int

total app : State -> App State
app state = do
    MkApp state $ \context => mkDiv [
        mkH1 "React with Idris",
        mkDiv "Clicked \{ (getState context).count } times",
        mkButton context "Click me" (\state => { count := state.count + 1 } state)
    ]

total main : IO ()
main = do
    runApp $ app $ MkState 0
```

The result can be found on [GitHub Pages](https://phomola.github.io/react-with-idris/web/).
