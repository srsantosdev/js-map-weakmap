const assert = require('assert');

const myMap = new Map()

// PODEM TER QUALQUER COISA COMO CHAVE
myMap
  .set(1, 'one')
  .set(true, () => 'two')
  .set('Samuel', { text: 'three' })

// TAMBEM PODEM SER DECLARADOS NO CONSTRUTOR
const myMapWithConstructor = new Map([
  [1, 'one'],
  [true, () => 'two'],
  ['Samuel', { text: 'three' }]
])

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get(true)(), 'two')
assert.deepStrictEqual(myMap.get('Samuel'), { text: 'three' })

// Em Objects a chave so pode ser uma string ou Symbol (number é coergido a string)

const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Samuel Ramos' })

// console.log('get', myMap.get(onlyReferenceWorks))

assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Samuel Ramos' })
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)

// UTILITARIOS

// ---- Verificar tamanho do objeto
// --> Object => Seria necessario usar Object.keys({ id: 1 }).length (Retorna 1)
assert.deepStrictEqual(myMap.size, 4)

// ---- Verificar se um atributo existe no objeto
// item.key !== undefined
// if() = coercao implicita para boolean e retorna false
// Jeito certo em Object ({ name: 'Samuel' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// ---- Deletar um atributo de um objeto
// delete item.atributeName (Nao performatico)
assert.ok(myMap.delete(onlyReferenceWorks))

// Nao da pra iterar em Object de forma direta
// Tem que transformar com o Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, "one"], [true, () => { }], ["Samuel", { "text": "three" }]]))

// for (const [key, value] of myMap) {
//   console.log({ key, value })
// }

// Object é inseguro (dependendo do nome da chave, pode substituir algum comportamento padrao)
// ({ }).toString === '[object Object]' 
// ({ toString: () => 'Hey' }).toString() === 'Hey'

// Qualquer chave pode colidir com as propriedades herdadas do object (constructor, toString, valueOf...)

// ----------------------------------------------------------------

const actor = { 
  name: 'Zezinho', 
  toString: 'Ola Zezinho',
}

// NAO TEM RESTRICAO DE NOME DE CHAVE
myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString(), TypeError)

// Object nao da para limpar sem reassinar
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])