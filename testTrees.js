const treeToTest = {
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

const treeToTest2 = {
	valueNode: 1,
	next: [{
				valueNode: 2,
				next: null
			},
			{
				valueNode: 3,
				next: [
					{
						valueNode: 5,
						next: [
              {
                valueNode: 6,
                next: [
                  {
                    valueNode: 8,
                    next: [
                      {
                        valueNode: 1,
                        next: null
                      },
                    ]
                  },
                ]
              },
            ]
					},
				]
			}]
};

module.exports.treeToTest = treeToTest;
module.exports.treeToTest2 = treeToTest2;
