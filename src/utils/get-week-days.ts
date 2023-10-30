export const getWeekDays = () => {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) =>
      weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1)),
    )
}

/**
 * Função para obter os nomes dos dias da semana em português.
 *
// @returns {string[]} Um array com os nomes dos dias da semana, com a primeira letra maiúscula.
 */
// export const getWeekDays = () => {

// Cria um objeto de formatação para obter nomes completos dos dias da semana em português (pt-BR).
// const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });

// Cria um array com índices de 0 a 6 para representar os dias da semana de Domingo a Sábado.
// return Array.from(Array(7).keys())
//   .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day)))
//     .map((weekDay) =>

//       Formata os nomes dos dias para ter a primeira letra maiúscula.
//       weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
//     );
// }
