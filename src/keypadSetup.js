export const keypad = {
  setup () {
    const add = x => y => Number(x) + Number(y)
    const sub = x => y => Number(x) - Number(y)
    const div = x => y => Number(x) / Number(y)
    const mul = x => y => Number(x) * Number(y)

    return [
      [{ type: 'number', value: '7' }, { type: 'number', value: '8' }, { type: 'number', value: '9' }, { type: 'operator', value: '/', action: div }],
      [{ type: 'number', value: '4' }, { type: 'number', value: '5' }, { type: 'number', value: '6' }, { type: 'operator', value: '*', action: mul }],
      [{ type: 'number', value: '1' }, { type: 'number', value: '2' }, { type: 'number', value: '3' }, { type: 'operator', value: '-', action: sub }],
      [{ type: 'number', value: '0' }, { type: 'number', value: '.' }, { type: 'operator', value: 'C' }, { type: 'operator', value: '+', action: add }],
      [{ type: 'operator', value: '=' }]
    ]
  }
}
