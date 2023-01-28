function arrayFromList(l, f) {
    var a = [];
    while (!!l.a1) {
        let v = f(l.a1);
        a.push(typeof(v) == "bigint" ? Number(v) : v);
        l = l.a2;
    }
    return a;
}

function _loaded() {
    const root = ReactDOM.createRoot(document.getElementById("contents"));
    root.render(React.createElement(_reactApp));
}

