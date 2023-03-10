'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.addConstraint('Employees', {
			type: 'FOREIGN KEY',
			fields: ['departmentId'],
			name: 'bind-foreign-key',
			references: {
				table: 'Departments',
				field: 'id'
			}
		})
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.removeConstraint('Employees', 'bind-foreign-key')
	}
}
