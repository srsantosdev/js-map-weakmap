// Weekmap

/**
 * Pode ser coletado apos perder as referencias e é usado em casos bem especificos
 * 
 * Tem a maioria dos beneficios do Map 
 * NAO É ITERAVEL
 * 
 * So chaves de referencia e ja conhecidas
 * 
 * É mais leve e prevê leak de memoria, pq depois que as instancias saem da memoria tudo é limpo
 */

const weakMap = new WeakMap()
const hero = {
  name: 'Batman',
}

weakMap.set(hero)
weakMap.set(hero)
weakMap.delete(hero)
weakMap.has(hero)
