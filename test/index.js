import test from 'ava'
import {transform} from 'babel-core'
import {readFileSync} from 'fs'
import {resolve} from 'path'

const loadFixture = (filename) => {
  return readFileSync(
    resolve(__dirname, `./fixture/${filename}`)
  ).toString()
}

let plugin = '../src/index'

if (process.env.CI === 'true') {
  plugin = '../build/index'
}

test('Transform pug literal', (t) => {
  const simple = loadFixture('simple')
  const res = transform(simple, {
    plugins: [plugin]
  })
  t.is(res.code, `var bp0 = Inferno.createBlueprint({
  tag: "div",
  className: "simple",
  attrs: {
    arg: 0
  }
});
bp0({
  data: yoyo
});`)
})

test('Transform pug literal(complex)', (t) => {
  const complex = loadFixture('complex')
  const res = transform(complex, {
    plugins: [plugin]
  })
  t.is(res.code, `var bp4 = Inferno.createBlueprint({
  tag: "label",
  attrs: {
    htmlFor: "id"
  }
});
var bp3 = Inferno.createBlueprint({
  tag: "input",
  attrs: {
    id: "id",
    required: "required"
  }
});
var bp2 = Inferno.createBlueprint({
  tag: {
    arg: 0
  },
  attrs: {
    arg: 1
  }
});
var bp1 = Inferno.createBlueprint({
  tag: {
    arg: 0
  },
  attrs: {
    arg: 1
  }
});
var bp0 = Inferno.createBlueprint({
  tag: "div",
  className: "complex",
  attrs: {
    arg: 0
  },
  children: {
    arg: 1
  }
});
bp0({
  data: yoyo
}, [bp1(Foo, {
  fuga: this.props.fuga
}), bp2(Bar, {
  bar: this.props.bar
}), bp3(), bp4()]);`)
})

test('Transform pug literal(indent)', (t) => {
  const indent = loadFixture('indent')
  const res = transform(indent, {
    plugins: [plugin]
  })
  t.is(res.code, `var bp4 = Inferno.createBlueprint({
  tag: "label",
  attrs: {
    htmlFor: "id"
  }
});
var bp3 = Inferno.createBlueprint({
  tag: "input",
  attrs: {
    id: "id",
    required: "required"
  }
});
var bp2 = Inferno.createBlueprint({
  tag: {
    arg: 0
  },
  attrs: {
    arg: 1
  },
  children: {
    arg: 2
  }
});
var bp1 = Inferno.createBlueprint({
  tag: {
    arg: 0
  },
  attrs: {
    arg: 1
  }
});
var bp0 = Inferno.createBlueprint({
  tag: "div",
  className: "indent",
  attrs: {
    arg: 0
  },
  children: {
    arg: 1
  }
});
bp0({
  data: yoyo
}, [bp1(Foo, {
  fuga: this.props.fuga
}), bp2(Bar, {
  bar: this.props.bar
}, [bp3(), bp4()])]);`)
})
