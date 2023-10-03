# Решить задачу (найти сумму всех вершин дерева)


## Описание

Вложенность может быть разной

`
var tree = {
	valueNode: 3,
	next: [{
				valueNode: 1,
				next: null
			},

      {
				valueNode: 3,
				next: null
			},

			{
				valueNode: 2,
				next: null
			},

			{
				valueNode: 2,
				next: [
					{
						valueNode: 1,
						next: null
					},

					{
						valueNode: 5,
						next: null
					}
				]
			}]
};
`
